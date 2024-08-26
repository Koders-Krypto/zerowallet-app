"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useWalletInfo } from "@web3modal/wagmi/react";
import { useRouter } from "next/navigation";

interface LoginContextProps {
  walletInfo: any;
}
// Create the context
const LoginContext = createContext<LoginContextProps>({
  walletInfo: undefined,
});

// Create the provider component
export const LoginProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const { walletInfo } = useWalletInfo();

  useEffect(() => {
    console.log(walletInfo, "walletInfo");
    if (walletInfo) {
      router.push("/app");
    } else {
      router.push("/");
    }
  }, [router, walletInfo]);

  return (
    <LoginContext.Provider value={{ walletInfo }}>
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook to use the login context
export const useLoginContext = () => {
  return useContext(LoginContext);
};
