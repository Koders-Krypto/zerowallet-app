'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Address } from 'viem';
import SignClient from '@walletconnect/sign-client'
import { useAccount } from 'wagmi';

interface SignClientContextProps {
    setPairing: (url: string) => void;
    connectedDapp: any;
}

export const SignClientContext = createContext<SignClientContextProps>({
    setPairing: () => { },
    connectedDapp: null,
});

export const SignClientProvider = ({ children }: { children: React.ReactNode }) => {
    const [showTransactionModal, setShowTransactionModal] = useState<boolean>(false);
    const [from, setFrom] = useState<Address>("0x0");
    const [to, setTo] = useState<Address>("0x0");
    const [data, setData] = useState<Address>("0x0");
    const [gas, setGas] = useState<Address>("0x0");
    const [signClient, setSignClient] = useState<SignClient | null>(null);
    const [sessionProposal, setSessionProposal] = useState<any>(null);
    const [value, setValue] = useState<Address>("0x0");
    const [chainId, setChainId] = useState<number>(0);
    const [connectedDapp, setConnectedDapp] = useState<any>(null);
    const { address } = useAccount();


    useEffect(() => {
        const initSignClient = async () => {
            const client = await SignClient.init({
                projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
                relayUrl: 'wss://relay.walletconnect.com',
                metadata: {
                    name: 'ZeroWallet',
                    description: 'ZeroWallet is a LayerZero-powered crypto wallet that lets you manage gas fees on one chain while accessing dApps across all chains.',
                    url: '#',
                    icons: ['https://avatars.githubusercontent.com/u/37784886'],
                }
            });
            setSignClient(client);
        }
        initSignClient();
    }, [address]);


    const setPairing = (url: string) => {
        if (signClient) {
            signClient.core.pairing.pair({ uri: url });
        }
    }


    useEffect(() => {
        if (!signClient || !address) return;

        signClient.on('session_proposal', async (event) => {
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
                }
            }
            console.log("Session Proposal", event);
            setSessionProposal(event);
            setConnectedDapp(event.params.proposer.metadata);

            const { topic, acknowledged } = await signClient.approve({
                id: event.id,
                namespaces: {
                    eip155: {
                        accounts: ['eip155:1:' + address],
                        methods: ['personal_sign', 'eth_sendTransaction'],
                        events: ['accountsChanged']
                    }
                }
            })
            console.log("Session Approved", topic);

            // Optionally await acknowledgement from dapp
            const session = await acknowledged()
            console.log("Session", session);
        })

        signClient.on('session_event', event => {
            // Handle session events, such as "chainChanged", "accountsChanged", etc.

            interface Event {
                id: number
                topic: string
                params: {
                    event: {
                        name: string
                        data: any
                    }
                    chainId: string
                }
            }
            console.log("Session Event", event);
        })

        signClient.on('session_request', event => {
            // Handle session method requests, such as "eth_sign", "eth_sendTransaction", etc.

            interface Event {
                id: number
                topic: string
                params: {
                    request: {
                        method: string
                        params: any
                    }
                    chainId: string
                }
            }
            setData(event.params.request.params[0].data);
            setFrom(event.params.request.params[0].from);
            setTo(event.params.request.params[0].to);
            setGas(event.params.request.params[0].gas);
            setValue(event.params.request.params[0].value);
            setChainId(parseInt(event.params.chainId));
            setShowTransactionModal(true);

            console.log("Session Request", event);
        })

        signClient.on('session_ping', event => {
            // React to session ping event

            interface Event {
                id: number
                topic: string
            }
            console.log("Session Ping", event);
        })

        signClient.on('session_delete', event => {
            // React to session delete event

            interface Event {
                id: number
                topic: string
            }
            console.log("Session Delete", event);
        })
    }, [signClient, address])


    return (
        <SignClientContext.Provider value={{ setPairing, connectedDapp }}>
            {children}
        </SignClientContext.Provider>
    );
};

export const useSignClient = () => useContext(SignClientContext);
