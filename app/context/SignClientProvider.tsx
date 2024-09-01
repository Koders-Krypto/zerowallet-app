"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Address } from "viem";
import SignClient from "@walletconnect/sign-client";
import { useAccount } from "./LoginProvider"
import useDappStore, { Dapp } from "../store/walletConnect";
import GenericBridge from "./GenericBridge";
import {
  writeContract,
  waitForTransaction,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { config } from "../wallet-connect/config/index";
import { createClient } from "@layerzerolabs/scan-client";


export interface ContractTransaction {
  from: Address;
  to: Address;
  data: Address;
  gas: Address;
  value: Address;
  chainId: number;
}

enum MessageStatus {
  INFLIGHT = "INFLIGHT",
  DELIVERED = "DELIVERED",
  FAILED = "FAILED",
  PAYLOAD_STORED = "PAYLOAD_STORED",
  BLOCKED = "BLOCKED",
  CONFIRMING = "CONFIRMING",
}

export type Message = {
  srcUaAddress: string;
  dstUaAddress: string;
  srcChainId: number;
  dstChainId: number;
  dstTxHash?: string;
  dstTxError?: string;
  srcTxHash: string;
  srcBlockHash: string;
  srcBlockNumber: string;
  srcUaNonce: number;
  status: MessageStatus;
};

type TransactionState =
  | "IDLE"
  | "SENDING_TRANSACTION"
  | "TRANSACTION_WAIT"
  | "ZERO_WAIT"
  | "SUCCESS"
  | "ERROR";

interface SignClientContextProps {
  setPairing: (url: string) => void;
  disconnect: (topic: string) => void;
  contractTransaction: ContractTransaction | undefined;
  from: Address;
  to: Address;
  data: Address;
  gas: Address;
  value: Address;
  chainId: number;
  transactionDapp: Dapp | null;
  showTransactionModal: boolean;
  isSignature: boolean;
  approveTransaction: boolean;
  setApproveTransaction: (approve: boolean) => void;
  setShowTransactionModal: (show: boolean) => void;
  transactionState: TransactionState;
}

export const SignClientContext = createContext<SignClientContextProps>({
  setPairing: () => { },
  disconnect: () => { },
  contractTransaction: undefined,
  from: "0x0",
  to: "0x0",
  data: "0x0",
  gas: "0x0",
  value: "0x0",
  chainId: 0,
  transactionDapp: null,
  showTransactionModal: false,
  isSignature: false,
  approveTransaction: false,
  setApproveTransaction: () => { },
  setShowTransactionModal: (show: boolean) => void {},
  transactionState: "IDLE",
});

export const SignClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [message, setMessage] = useState<Message | undefined>(undefined);
  const [showTransactionModal, setShowTransactionModal] =
    useState<boolean>(false);
  const [from, setFrom] = useState<Address>("0x0");
  const [to, setTo] = useState<Address>("0x0");
  const [data, setData] = useState<Address>("0x0");
  const [gas, setGas] = useState<Address>("0x0");
  const [signClient, setSignClient] = useState<SignClient | null>(null);
  const [sessionProposal, setSessionProposal] = useState<any[]>([]);
  const [contractTransaction, setContractTransaction] = useState<
    ContractTransaction | undefined
  >(undefined);
  const [value, setValue] = useState<Address>("0x0");
  const [chainId, setChainId] = useState<number>(0);
  const [transactionDapp, setTransactionDapp] = useState<Dapp | null>(null);
  const [isSignature, setIsSignature] = useState<boolean>(false);
  const { address } = useAccount();
  const [approveTransaction, setApproveTransaction] = useState<boolean>(false);
  const [transactionState, setTransactionState] =
    useState<TransactionState>("IDLE");

  // Use Zustand store
  const { addDapp, removeDapp, getDapp } = useDappStore();

  useEffect(() => {
    const initSignClient = async () => {
      const client = await SignClient.init({
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        relayUrl: "wss://relay.walletconnect.com",
        metadata: {
          name: "ZeroWallet",
          description:
            "ZeroWallet is a LayerZero-powered crypto wallet that lets you manage gas fees on one chain while accessing dApps across all chains.",
          url: "#",
          icons: ["https://zerowallet-app.vercel.app/logo/logo-black.svg"],
        },
      });
      setSignClient(client);
    };
    initSignClient();
  }, [address]);

  const setPairing = (url: string) => {
    if (signClient) {
      signClient.core.pairing.pair({ uri: url });
    }
  };

  const disconnect = (topic: string) => {
    if (signClient) {
      signClient.core.pairing.disconnect({ topic });
      removeDapp(topic); // Use Zustand to remove dApp
    }
  };

  useEffect(() => {
    if (!signClient || !address) return;

    signClient.on("session_proposal", async (event) => {
      console.log("Session Proposal", event);
      interface Event {
        id: number
        params: {
          id: number
          expiry: number
          relays: Array<{
            protocol: string
            data?: string
          }>
          proposer: {
            publicKey: string
            metadata: {
              name: string
              description: string
              url: string
              icons: string[]
            }
          }
          requiredNamespaces: Record<
            string,
            {
              chains: string[]
              methods: string[]
              events: string[]
            }
          >
          pairingTopic?: string
        },
        topic: string
      }


      const { topic, acknowledged } = await signClient.approve({
        id: event.id,
        namespaces: {
          eip155: {
            accounts: ["eip155:17000:" + address],
            methods: ["personal_sign", "eth_signTransaction", "eth_sign", "eth_sendTransaction"],
            events: ["accountsChanged"],
          },
        },
      });
      console.log("Session Approved", topic);
      setSessionProposal([
        ...sessionProposal,
        { topic, metadata: event.params.proposer.metadata },
      ]);

      // Optionally await acknowledgement from dapp
      const session = await acknowledged();
      console.log("Session", session);
      const dapp = {
        ...event.params.proposer.metadata,
        topic: session.topic,
      };
      addDapp(dapp); // Use Zustand to add dApp
    });

    signClient.on("session_event", (event) => {
      // Handle session events, such as "chainChanged", "accountsChanged", etc.

      interface Event {
        id: number;
        topic: string;
        params: {
          event: {
            name: string;
            data: any;
          };
          chainId: string;
        };
      }
      console.log("Session Event", event);
    });

    signClient.on("session_request", (event) => {
      // Handle session method requests, such as "eth_sign", "eth_sendTransaction", etc.
      interface Event {
        id: number;
        topic: string;
        params: {
          request: {
            method: string;
            params: any;
          };
          chainId: string;
        };
      }
      const _transactionDapp: Dapp = getDapp(event.topic);
      console.log("Transaction Dapp", _transactionDapp);
      setTransactionDapp(_transactionDapp || null);

      if (event.params.request.method === "personal_sign") {
        setIsSignature(true);
        setShowTransactionModal(true);
      } else {
        setContractTransaction({
          from: event.params.request.params[0].from,
          to: event.params.request.params[0].to,
          data: event.params.request.params[0].data,
          gas: event.params.request.params[0].gas,
          value: event.params.request.params[0].value,
          chainId: parseInt(event.params.chainId),
        });
        setData(event.params.request.params[0].data);
        setFrom(event.params.request.params[0].from);
        setTo(event.params.request.params[0].to);
        setGas(event.params.request.params[0].gas);
        setValue(event.params.request.params[0].value);
        setChainId(parseInt(event.params.chainId));
        setShowTransactionModal(true);
        console.log("Session Request", event);
      }

    });

    signClient.on("session_ping", (event) => {
      // React to session ping event

      interface Event {
        id: number;
        topic: string;
      }
      console.log("Session Ping", event);
      signClient.extend({
        topic: event.topic,
      });
    });

    signClient.on("session_delete", (event) => {
      // React to session delete event

      interface Event {
        id: number;
        topic: string;
      }

      console.log("Session Delete", event);
    });
  }, [signClient, address, addDapp, sessionProposal, getDapp]);


  // useEffect(() => {
  //   if (approveTransaction) {
  //     setShowTransactionModal(false);
  //     setApproveTransaction(false);
  //     approveTransactionChain()
  //   }
  // }, [approveTransaction]);

  useEffect(() => {
    console.log("approveTransaction", approveTransaction);
    if (approveTransaction) {
      // setShowTransactionModal(false);
      // setApproveTransaction(false);
      approveTransactionChain();
      setTransactionState("SENDING_TRANSACTION");
    }
  }, [approveTransaction]);

  const getTxpoolStatus = async (txHash: string) => {
    try {
      const client = createClient("testnet");
      const { messages } = await client.getMessagesBySrcTxHash(txHash);
      const _message: Message = messages[0] as Message;
      setMessage(_message);
      if (
        !_message ||
        (_message.status !== "DELIVERED" &&
          _message.status !== "FAILED" &&
          _message.status !== "BLOCKED")
      ) {
        setTimeout(() => {
          getTxpoolStatus(txHash);
        }, 60 * 1000);
      } else if (_message.status === "FAILED") {
        // await handleFailedMessage(txHash);
      }
      6;
    } catch (e) {
      setTimeout(() => {
        getTxpoolStatus(txHash);
      }, 60 * 1000);
    }
  };

  const approveTransactionChain = async () => {
    if (!contractTransaction) return;

    console.log("approveTransactionChain 232");

    try {
      //   const sepoliaEndpointID = "40161";
      const holeskyEndpointID = "40217";
      const toAddress = contractTransaction.to;
      const nativeFee = "3630993850786210";
      const options = "0x000301001101000000000000000000000000000493e0";

      //@ts-ignore
      const result = await writeContract(config, {
        abi: GenericBridge,
        address: "0x09545c0Cd0ddfd3B5EfBA5F093B3cA20b6ba4bB9",
        functionName: "sendAmount",
        args: [
          holeskyEndpointID,
          nativeFee,
          toAddress,
          contractTransaction.data,
          options,
        ],
        value: BigInt(nativeFee),
      });

      setTransactionState("TRANSACTION_WAIT");
      await waitForTransaction(result);
      setTransactionState("ZERO_WAIT");

      await getTxpoolStatus(result);
      setTransactionState("SUCCESS");
    } catch (error) {
      setTransactionState("ERROR");
      console.log(error);
    }
  };

  const waitForTransaction = async (hash: Address) => {
    try {
      const transactionReceipt = await waitForTransactionReceipt(config, {
        confirmations: 2,
        hash,
      });
      if (transactionReceipt.status === "success") {
        return {
          success: true,
          data: transactionReceipt,
        };
      }
      throw transactionReceipt.status;
    } catch (e: any) {
      throw e;
    }
  };
  return (
    <SignClientContext.Provider
      value={{
        setPairing,
        disconnect,
        contractTransaction,
        transactionState,
        from,
        to,
        data,
        gas,
        value,
        chainId,
        transactionDapp,
        showTransactionModal,
        isSignature,
        approveTransaction,
        setApproveTransaction,
        setShowTransactionModal,
      }}
    >
      {children}
    </SignClientContext.Provider>
  );
};

export const useSignClient = () => useContext(SignClientContext);
