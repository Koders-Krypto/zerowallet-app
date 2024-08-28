"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Address } from "viem";
import SignClient from "@walletconnect/sign-client";
import { useAccount } from "wagmi";
import useDappStore, { Dapp } from "../store/walletConnect";

interface SignClientContextProps {
  setPairing: (url: string) => void;
  disconnect: (topic: string) => void;
  from: Address;
  to: Address;
  data: Address;
  gas: Address;
  value: Address;
  chainId: number;
  transactionDapp: Dapp | null;
  showTransactionModal: boolean;
  setShowTransactionModal: (show: boolean) => void;
}

export const SignClientContext = createContext<SignClientContextProps>({
  setPairing: () => {},
  disconnect: () => {},
  from: "0x0",
  to: "0x0",
  data: "0x0",
  gas: "0x0",
  value: "0x0",
  chainId: 0,
  transactionDapp: null,
  showTransactionModal: false,
  setShowTransactionModal: (show: boolean) => void {},
});

export const SignClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showTransactionModal, setShowTransactionModal] =
    useState<boolean>(false);
  const [from, setFrom] = useState<Address>("0x0");
  const [to, setTo] = useState<Address>("0x0");
  const [data, setData] = useState<Address>("0x0");
  const [gas, setGas] = useState<Address>("0x0");
  const [signClient, setSignClient] = useState<SignClient | null>(null);
  const [sessionProposal, setSessionProposal] = useState<any[]>([]);
  const [value, setValue] = useState<Address>("0x0");
  const [chainId, setChainId] = useState<number>(0);
  const [transactionDapp, setTransactionDapp] = useState<Dapp | null>(null);
  const { address } = useAccount();

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
      const dapp = {
        ...event.params.proposer.metadata,
        topic: event.params.pairingTopic,
      };
      addDapp(dapp); // Use Zustand to add dApp

      const { topic, acknowledged } = await signClient.approve({
        id: event.id,
        namespaces: {
          eip155: {
            accounts: ["eip155:1:" + address],
            methods: ["personal_sign", "eth_sendTransaction"],
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
      setData(event.params.request.params[0].data);
      const _transactionDapp: Dapp = getDapp(event.topic);
      setTransactionDapp(_transactionDapp || null);
      setFrom(event.params.request.params[0].from);
      setTo(event.params.request.params[0].to);
      setGas(event.params.request.params[0].gas);
      setValue(event.params.request.params[0].value);
      setChainId(parseInt(event.params.chainId));
      setShowTransactionModal(true);

      console.log("Session Request", event);
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

  return (
    <SignClientContext.Provider
      value={{
        setPairing,
        disconnect,
        from,
        to,
        data,
        gas,
        value,
        chainId,
        transactionDapp,
        showTransactionModal,
        setShowTransactionModal,
      }}
    >
      {children}
    </SignClientContext.Provider>
  );
};

export const useSignClient = () => useContext(SignClientContext);
