"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useWalletInfo as useDefaultWalletInfo } from "@web3modal/wagmi/react";
import {
  useAccount as useDefaultAccount,
  useDisconnect as useDefaultDisconnect,
  useEnsName,
  useEnsAvatar,
} from "wagmi";
import { usePathname, useRouter } from "next/navigation";
import { loadPasskey, removePasskey } from "../utils/storage";
import { connectValidator } from "../logic/passkey";
import { getSmartAccountClient } from "../logic/permissionless";
import { normalize } from "viem/ens";
interface LoginContextProps {
  walletInfo: any;
  accountInfo: any;
  setWalletInfo: (info: any) => void;
  setAccountInfo: (info: any) => void;
  ensname: any;
  ensavatar: any;
}
// Create the context
export const LoginContext = createContext<LoginContextProps>({
  walletInfo: undefined,
  accountInfo: undefined,
  setWalletInfo: () => {},
  setAccountInfo: () => {},
  ensname: undefined,
  ensavatar: undefined,
});

// Create the provider component
export const LoginProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const router = useRouter();

  const wallet = useDefaultWalletInfo();
  const account = useDefaultAccount();
  const [walletInfo, setWalletInfo] = useState<any>(wallet.walletInfo);
  const [accountInfo, setAccountInfo] = useState<any>(account);
  const [ensname, setEnsname] = useState<any>(undefined);
  const [ensavatar, setEnsavatar] = useState<any>(undefined);

  const { data: _ensname } = useEnsName({ address: accountInfo?.address });
  const { data: _ensavatar } = useEnsAvatar({ name: normalize(_ensname!) });

  useEffect(() => {
    setEnsname(_ensname);
    setEnsavatar(_ensavatar);
  }, [_ensavatar, _ensname]);

  useEffect(() => {
    (async () => {
      const passkey = loadPasskey();
      if (passkey) {
        const validator = await connectValidator("84532", passkey);
        const accountClient = await getSmartAccountClient({
          chainId: "84532",
          validators: [
            {
              address: validator.address,
              context: await validator.getEnableData(),
            },
          ],
        });
        if (!accountInfo?.address) {
          setAccountInfo(accountClient.account);
          setWalletInfo({ name: "passkey", icon: "/icons/safe.svg" });
        }
      } else {
        setWalletInfo(wallet.walletInfo);
        if (account?.address && account?.address !== accountInfo?.address) {
          setAccountInfo(account);
        }
      }
    })();
  }, [wallet, account, accountInfo?.address]);

  useEffect(() => {
    if (!walletInfo) {
      router.push("/");
    }
    if (walletInfo && pathname === "/") {
      router.push("/app");
    }
  }, [pathname, router, walletInfo, accountInfo]);

  return (
    <LoginContext.Provider
      value={{
        walletInfo,
        accountInfo,
        setWalletInfo,
        setAccountInfo,
        ensname,
        ensavatar,
      }}
    >
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

export const useDisconnect = () => {
  const { disconnect: defaultDisconnect } = useDefaultDisconnect();
  const { setWalletInfo } = useContext(LoginContext);

  const disconnect = () => {
    defaultDisconnect();
    removePasskey();
    setWalletInfo(undefined);
  };

  return { disconnect };
};
