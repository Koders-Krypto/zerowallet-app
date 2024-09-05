"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getTokensByNetwork,
  getTotalBalanceDefi,
  getTotalBalanceToken,
  NetworkType,
  ZapperDEFIDataTypes,
  ZapperNFTDataTypes,
  ZapperTokenDataTypes,
} from "../utils/Zapper";
import { LoginContext } from "./LoginProvider";

interface ZapperContextProps {
  tokenData: ZapperTokenDataTypes[];
  NFTData: ZapperNFTDataTypes[];
  DefiData: ZapperDEFIDataTypes[];
  isZapperLoading: boolean;
  DefiTotal: Number;
  totalBalance: Number;
  selectedNetworks: NetworkType[];
  setSelectedNetworks: React.Dispatch<React.SetStateAction<NetworkType[]>>;
  tokensByNetwork: ZapperTokenDataTypes[];
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  tokenDataError: boolean;
  DeFiDataError: boolean;
  NftDataError: boolean;
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
  setSelectedNetworks: () => {},
  tokensByNetwork: [],
  refresh: false,
  setRefresh: () => {},
  tokenDataError: false,
  DeFiDataError: false,
  NftDataError: false,
});

// Create the provider component
export const ZapperProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [refresh, setRefresh] = useState(false);
  const { accountInfo } = useContext(LoginContext);

  const [tokenData, setTokenData] = useState<ZapperTokenDataTypes[] | any[]>(
    []
  );
  const [NFTData, setNFTData] = useState<ZapperNFTDataTypes[] | any[]>([]);
  const [DefiData, setDefiData] = useState<ZapperDEFIDataTypes[] | any[]>([]);
  const [isZapperLoading, setIsZapperLoading] = useState(true);
  const [DefiTotal, setDefiTotal] = useState(0);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [selectedNetworks, setSelectedNetworks] = useState<NetworkType[]>([]);
  const [tokensByNetwork, setTokensByNetwork] = useState<
    ZapperTokenDataTypes[]
  >([]);
  const [tokenDataError, setTokenDataError] = useState(false);
  const [DeFiDataError, setDeFiDataError] = useState(false);
  const [NftDataError, setNftDataError] = useState(false);
  const fetchTokenData = async (address: string) => {
    setTokenData([]);
    const response = await fetch(`api/v1/data/tokens?address=${address}`);
    if (response.ok) {
      const data = await response.json();
      setTokenData(data[address.toString().toLowerCase()] || undefined);
    } else {
      console.log("error");
      setTotalBalance(0);
      setTokenDataError(true);
    }
  };
  const fetchDefiData = async (address: string) => {
    setDefiData([]);
    const response = await fetch(`api/v1/data/positions?address=${address}`);
    if (response.ok) {
      const data = await response.json();
      setDefiData(data || undefined);
    } else {
      console.log("error");
      setDefiData([]);
      setDeFiDataError(true);
    }
  };

  const fetchNFTData = async (address: string) => {
    setNFTData([]);
    const response = await fetch(`api/v1/data/nfts?address=${address}`);
    if (response.ok) {
      const data = await response.json();
      setNFTData(data.items || undefined);
    } else {
      console.log("error");
      setNFTData([]);
      setNftDataError(true);
    }
  };

  useEffect(() => {
    if (accountInfo.address) {
      fetchTokenData(accountInfo.address.toString());
      fetchNFTData(accountInfo.address.toString());
      fetchDefiData(accountInfo.address.toString());
    }
  }, [accountInfo.address, refresh]);

  useEffect(() => {
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
        refresh,
        setRefresh,
        tokenDataError,
        DeFiDataError,
        NftDataError,
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
