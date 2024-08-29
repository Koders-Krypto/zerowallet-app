"use client";
import Image from "next/image";

import {  useWeb3Modal } from "@web3modal/wagmi/react";
import { LogOut } from "lucide-react";
import Truncate from "./utils/truncate";
import Typewriter from "typewriter-effect";
import { connectPassKey, connectValidator } from "./logic/passkey";
import { WebAuthnMode } from "@zerodev/passkey-validator";
import { storePasskey } from "./utils/storage";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useLoginProvider, useWalletInfo, useAccount, useDisconnect } from "./context/LoginProvider";
import { getSmartAccountClient } from "./logic/permissionless";


const WalletConnectButton = (props: any) => {
  const {walletInfo, setWalletInfo, setAccountInfo} = useLoginProvider()

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogTrigger asChild>
        <button className="flex flex-row gap-2 items-center justify-center border border-accent px-6 py-2.5 w-full "
          onClick={() => props.setOpen(true)}
        >
          <Image
            src={"/icons/passkey.svg"}
            alt="Wallet Icon"
            width={30}
            height={30}
          />
          <p className="font-bold">Login with Passkey</p>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-black dark:bg-white flex flex-col justify-center items-center gap-6 max-w-md mx-auto border border-accent ">
        <DialogHeader>
          <div className="flex flex-row justify-start items-center gap-3">
            <Image
              src={"/icons/safe.svg"}
              width={"40"}
              height={"40"}
              alt="Wallet Connect"
            />
            <div className="flex flex-col justify-start items-start text-left">
              <DialogTitle>
                <h3 className="text-base text-white">
                  Use a smart Account
                </h3>
              </DialogTitle>
              <DialogDescription className="text-xs text-accent dark:text-accent w-full md:max-w-xs">
                Login or Create a new passkey to get started with Smart Accounts
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="flex flex-col justify-start items-center  gap-2 w-full">
          <button className="flex flex-row gap-2 items-center justify-center border border-accent px-6 py-2.5 w-full bg-white "
                        onClick={ async () => {
                          // Handle the passkey auth here
                          try {  
                            const passkey =  await connectPassKey('ZeroWallet', WebAuthnMode.Login);
                            storePasskey(passkey)
                            setWalletInfo({ name: 'passkey', icon: "/icons/safe.svg" });

                            } 
                            catch(e) {
                              console.log(e)
                            }
                          }}
          >
          <Image
            src={"/icons/passkey.svg"}
            alt="Wallet Icon"
            width={30}
            height={30}
          />
            <p className="font-bold ">Login Now </p>

          </button>
                <h3 className="text-base text-white">
                  OR
                </h3>
          <button className="border-accent py-2 text-lg text-white w-full"
            onClick={ async () => {
              try {  
                const passkey =  await connectPassKey(`Zero Wallet ${new Date().toLocaleDateString('en-GB')}`, WebAuthnMode.Register)
                storePasskey(passkey)
                setWalletInfo({ name: 'passkey', icon: "/icons/safe.svg" });

              }
              catch(e) {
                console.log(e)
              }
              }}
          >
            Create New 
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function Home() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { setWalletInfo } = useLoginProvider()
  const { walletInfo } = useWalletInfo()

  const { open, close } = useWeb3Modal();
  const { disconnect } = useDisconnect();

  const [passkeyOpen, setPasskeyOpen] = useState(false);

  console.log()

  return (
    <div className="flex flex-col gap-12 md:gap-16 justify-center items-center min-h-[90vh] md:min-h-[95vh] text-center pt-12 md:pt-0 px-6">
      <div className="flex flex-col gap-20 items-center max-w-2xl">
        <Image
          className="w-56 md:w-72"
          src={"/logo/logo.svg"}
          alt="Zero Logo"
          width={280}
          height={280}
        />
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-2xl md:text-4xl font-bold">
            <Typewriter
              options={{
                cursor: "",
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("Welcome to ZeroWallet")
                  .pauseFor(1500)
                  .start();
              }}
            />
          </h1>
          <p className="text-base md:text-lg text-white">
            🚀 ZeroWallet powered by LayerZero: Simplified gas experience ⛽,
            seamless dApp access across all chains 🌐, no bridging needed.
          </p>
        </div>
      </div>

      <div className=" flex flex-col gap-4 items-center justify-center w-full max-w-sm text-lg">
        {!walletInfo && (
          <h2 className="text-accent text-sm">
            Connect your wallet to Get Started
          </h2>
        )}
        <div className="flex flex-col gap-2 items-center justify-center w-full border border-accent p-4">
          {walletInfo ? (
            <div className="grid grid-cols-5 gap-2 items-center justify-between px-6 bg-white text-black w-full py-2.5">
              <div></div>
              <div className="flex flex-row gap-2 items-center justify-center col-span-3 w-full">
                <Image
                  src={walletInfo.icon || "/icons/wallet.svg"}
                  alt="Wallet Icon"
                  width={25}
                  height={25}
                />
                <p className="">{Truncate(address, 12, "...")}</p>
              </div>
              <div className="flex justify-end items-center">
                <LogOut onClick={() => {
                  disconnect() 
                  setWalletInfo(undefined)
                  
                  }} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-center justify-center w-full">
              <button
                className="w-full bg-white text-black px-6 py-2.5"
                onClick={() => open()}
              >
                Connect Wallet
              </button>
              <div>(OR)</div>
              <WalletConnectButton open={passkeyOpen} setOpen={setPasskeyOpen} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
