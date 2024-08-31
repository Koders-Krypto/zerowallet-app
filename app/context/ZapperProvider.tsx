"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { GET_DEFI_DATA, GET_NFT_DATA, GET_TOKEN_DATA } from "../utils/urls";
import { getTokensByNetwork, getTotalBalanceDefi, getTotalBalanceToken, NetworkType, ZapperDEFIDataTypes, ZapperNFTDataTypes, ZapperTokenDataTypes } from "../utils/Zapper";
import { LoginContext } from "./LoginProvider";

interface ZapperContextProps {
    tokenData: ZapperTokenDataTypes[],
    NFTData: ZapperNFTDataTypes[],
    DefiData: ZapperDEFIDataTypes[],
    isZapperLoading: boolean,
    DefiTotal: Number,
    totalBalance: Number,
    selectedNetworks: NetworkType[],
    setSelectedNetworks: React.Dispatch<React.SetStateAction<NetworkType[]>>,
    tokensByNetwork: ZapperTokenDataTypes[],
}
// Create the context
export const ZapperContext = createContext<ZapperContextProps>({
    tokenData: [],
    NFTData: [],
    DefiData: [],
    isZapperLoading: true,
    DefiTotal: 0,
    totalBalance: 0,
    selectedNetworks: [],
    setSelectedNetworks: () => { },
    tokensByNetwork: []
});

// Create the provider component
export const ZapperProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    const { accountInfo } = useContext(LoginContext)

    const [tokenData, setTokenData] = useState<ZapperTokenDataTypes[] | any[]>([]);
    const [NFTData, setNFTData] = useState<ZapperNFTDataTypes[] | any[]>([]);
    const [DefiData, setDefiData] = useState<ZapperDEFIDataTypes[] | any[]>([]);
    const [isZapperLoading, setIsZapperLoading] = useState(true);
    const [DefiTotal, setDefiTotal] = useState(0);
    const [totalBalance, setTotalBalance] = useState<number>(0);
    const [selectedNetworks, setSelectedNetworks] = useState<NetworkType[]>([]);
    const [tokensByNetwork, setTokensByNetwork] = useState<
        ZapperTokenDataTypes[]
    >([]);

    const Auth = `Basic ${Buffer.from(
        `${process.env.NEXT_PUBLIC_ZAPPER_API_KEY}:`,
        "binary"
    ).toString("base64")}`;

    const fetchTokenData = async (address: string) => {
        const response = await fetch(`${GET_TOKEN_DATA}${address}`, {
            headers: {
                accept: "*/*",
                Authorization: Auth,
            },
        });
        if (response.ok) {
            const data = await response.json();
            setTokenData(data[address.toString().toLowerCase()] || undefined);
        } else {
            console.log("error");
            setTotalBalance(0);
        }
    };
    const fetchDefiData = async (address: string) => {
        const response = await fetch(`${GET_DEFI_DATA}${address}`, {
            headers: {
                accept: "*/*",
                Authorization: Auth,
            },
        });
        if (response.ok) {
            const data = await response.json();
            setDefiData(data || undefined);
            console.log(data, "Zapper Defi Data");
        } else {
            console.log("error");
            setDefiData([]);
        }
    };

    const fetchNFTData = async (address: string) => {
        const response = await fetch(`${GET_NFT_DATA}${address}&limit=28`, {
            headers: {
                accept: "*/*",
                Authorization: Auth,
            },
        });
        if (response.ok) {
            const data = await response.json();
            setNFTData(data.items || undefined);
            console.log(data, "Zapper NFT Data");
        } else {
            console.log("error");
            setNFTData([]);
        }
    };

    useEffect(() => {
        console.log(accountInfo, "Account Info");
        if (accountInfo.address) {
            fetchTokenData(accountInfo.address.toString());
            fetchNFTData(accountInfo.address.toString());
            fetchDefiData(accountInfo.address.toString());
        }
    }, [accountInfo.address]);

    useEffect(() => {
        console.log(tokenData, "Token Data");
        if (tokenData.length > 0) {
            const tokensByNetwork = getTokensByNetwork(
                tokenData,
                selectedNetworks.map((network) => network.name)
            );
            // save it in state and use
            setTokensByNetwork(tokensByNetwork);
        }
    }, [tokenData, selectedNetworks]);


    useEffect(() => {
        if (DefiData.length > 0 && tokenData.length > 0) {
            setIsZapperLoading(false);
            const _defiData = getTotalBalanceDefi(DefiData);
            setDefiTotal(_defiData);
            const _tokenData = getTotalBalanceToken(tokenData);
            setTotalBalance(_defiData + _tokenData);
        }
    }, [DefiData, tokenData]);

    return (
        <ZapperContext.Provider
            value={{
                tokenData: tokenData,
                NFTData: NFTData,
                DefiData: DefiData,
                isZapperLoading,
                DefiTotal,
                totalBalance,
                selectedNetworks,
                setSelectedNetworks,
                tokensByNetwork,
            }}
        >
            {children}
        </ZapperContext.Provider>
    );
};

// Custom hook to use the login context
export const useZapperProvider = () => {
    return useContext(ZapperContext);
};
