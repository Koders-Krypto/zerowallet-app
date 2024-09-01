"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Address } from "viem";
import SignClient from "@walletconnect/sign-client";
import { useAccount } from "./LoginProvider";
import useDappStore, { Dapp } from "../store/walletConnect";
import GenericBridge from "./GenericBridge";
import {
  writeContract,
  waitForTransaction,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { config } from "../wallet-connect/config/index";
import { createClient } from "@layerzerolabs/scan-client";

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
  transactionDapp: Dapp | null;
  showTransactionModal: boolean;
  isSignature: boolean;
  approveTransaction: boolean;
  setApproveTransaction: (approve: boolean) => void;
  setShowTransactionModal: (show: boolean) => void;
  transactionState: TransactionState;
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

enum MessageStatus {
  INFLIGHT = "INFLIGHT",
  DELIVERED = "DELIVERED",
  FAILED = "FAILED",
  PAYLOAD_STORED = "PAYLOAD_STORED",
  BLOCKED = "BLOCKED",
  CONFIRMING = "CONFIRMING",
}

export const SignClientContext = createContext<SignClientContextProps>({
  setPairing: () => {},
  disconnect: () => {},
  contractTransaction: undefined,
  transactionDapp: null,
  showTransactionModal: false,
  isSignature: false,
  approveTransaction: false,
  setApproveTransaction: () => {},
  setShowTransactionModal: (show: boolean) => void {},
  transactionState: "IDLE",
});

// setData(event.params.request.params[0].data);
// setFrom(event.params.request.params[0].from);
// setTo(event.params.request.params[0].to);
// setGas(event.params.request.params[0].gas);
// setValue(event.params.request.params[0].value);
// setChainId(parseInt(event.params.chainId));

export interface ContractTransaction {
  from: Address;
  to: Address;
  data: Address;
  gas: Address;
  value: Address;
  chainId: number;
}

export const SignClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showTransactionModal, setShowTransactionModal] =
    useState<boolean>(false);
  const [signClient, setSignClient] = useState<SignClient | null>(null);
  const [sessionProposal, setSessionProposal] = useState<any[]>([]);
  const [contractTransaction, setContractTransaction] = useState<
    ContractTransaction | undefined
  >(undefined);
  const [transactionDapp, setTransactionDapp] = useState<Dapp | null>(null);
  const [isSignature, setIsSignature] = useState<boolean>(false);
  const { address } = useAccount();
  const [approveTransaction, setApproveTransaction] = useState<boolean>(false);
  const [message, setMessage] = useState<Message | undefined>(undefined);
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
        id: number;
        params: {
          id: number;
          expiry: number;
          relays: Array<{
            protocol: string;
            data?: string;
          }>;
          proposer: {
            publicKey: string;
            metadata: {
              name: string;
              description: string;
              url: string;
              icons: string[];
            };
          };
          requiredNamespaces: Record<
            string,
            {
              chains: string[];
              methods: string[];
              events: string[];
            }
          >;
          pairingTopic?: string;
        };
        topic: string;
      }

      const { topic, acknowledged } = await signClient.approve({
        id: event.id,
        namespaces: {
          eip155: {
            accounts: ["eip155:17000:" + address],
            methods: [
              "personal_sign",
              "eth_signTransaction",
              "eth_sign",
              "eth_sendTransaction",
            ],
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
        true;
      } else {
        setContractTransaction({
          from: event.params.request.params[0].from,
          to: event.params.request.params[0].to,
          data: event.params.request.params[0].data,
          gas: event.params.request.params[0].gas,
          value: event.params.request.params[0].value,
          chainId: parseInt(event.params.chainId),
        });
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

  useEffect(() => {
    console.log("approveTransaction", approveTransaction);
    if (approveTransaction) {
      // setShowTransactionModal(false);
      // setApproveTransaction(false);
      approveTransactionChain();
      setTransactionState("SENDING_TRANSACTION");
    }
  }, [approveTransaction]);

  //   const approveTransactionChain = async () => {
  //     console.log("approveTransactionChain");

  //     try {
  //       //   const sepoliaEndpointID = "40161";
  //       const holeskyEndpointID = "17000";
  //       const toAddress = "0x00030100110100000000000000000000000001c9c380";
  //       const options = "0x00030100110100000000000000000000000001c9c380";
  //       const result = await writeContract(config, {
  //         abi: GenericBridge,
  //         address: "0x09545c0Cd0ddfd3B5EfBA5F093B3cA20b6ba4bB9",
  //         functionName: "sendAmount",
  //         args: [holeskyEndpointID, "100000000000000", toAddress, data, options],
  //       });

  //       await waitForTransaction(result);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

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
        transactionDapp,
        showTransactionModal,
        isSignature,
        approveTransaction,
        setApproveTransaction,
        setShowTransactionModal,
        transactionState,
      }}
    >
      {children}
    </SignClientContext.Provider>
  );
};

export const useSignClient = () => useContext(SignClientContext);
