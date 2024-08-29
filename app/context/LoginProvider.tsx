"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useWalletInfo as useDefaultWalletInfo } from "@web3modal/wagmi/react";
import { useAccount as useDefaultAccount} from "wagmi";
import { usePathname, useRouter } from "next/navigation";

interface LoginContextProps {
  walletInfo: any;
  accountInfo: any;
  setWalletInfo: (info: any) => void;
  setAccountInfo: (info: any) => void;
}
// Create the context
const LoginContext = createContext<LoginContextProps>({
  walletInfo: undefined,
  accountInfo: undefined,
  setWalletInfo: () => {},
  setAccountInfo: () => {},
});


// Create the provider component
export const LoginProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const router = useRouter();

  const wallet  = useDefaultWalletInfo();
  const account = useDefaultAccount();
  const [walletInfo, setWalletInfo] = useState<any>(wallet.walletInfo);
  const [accountInfo, setAccountInfo] = useState<any>(account);



  useEffect(() => {

     if(walletInfo?.name != 'passkey') {
     setWalletInfo(wallet.walletInfo)
     if (account?.address && account?.address != accountInfo?.address) {
      setAccountInfo(account);
    }
  }
  }, [ wallet, account ]);


  useEffect(() => {
    if (!walletInfo) {
      router.push("/");
    }
    if (walletInfo && pathname === "/") {
      router.push("/app");
    }

  }, [pathname, router, walletInfo]);

  return (
    <LoginContext.Provider value={{ walletInfo, accountInfo, setWalletInfo, setAccountInfo }}>
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook to use the login context
export const useLoginProvider = () => {
  return useContext(LoginContext);
};

export const useWalletInfo = () => {
  return useContext(LoginContext);
};

export const useAccount = () => {
  return useContext(LoginContext).accountInfo;
};


