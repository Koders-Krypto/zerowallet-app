"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useWalletInfo } from "@web3modal/wagmi/react";
import { usePathname, useRouter } from "next/navigation";

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
  const pathname = usePathname();
  const router = useRouter();
  const { walletInfo } = useWalletInfo();

  useEffect(() => {
    if (!walletInfo) {
      router.push("/");
    }
    console.log(walletInfo, "walletInfo");
    if (walletInfo && pathname === "/") {
      router.push("/app");
    }
    if (!walletInfo && pathname !== "/app") {
      router.push("/");
    }
  }, [pathname, router, walletInfo]);

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
