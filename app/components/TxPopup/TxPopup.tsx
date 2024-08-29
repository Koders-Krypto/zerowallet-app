/* eslint-disable @next/next/no-img-element */
"use client";
import { SignClientContext } from "@/app/context/SignClientProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useContext } from "react";
import { useConnect } from "wagmi";

export default function TxPopup() {
  const {
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
  } = useContext(SignClientContext);
  return (
    <Dialog open={showTransactionModal} onOpenChange={setShowTransactionModal}>
      <DialogContent className="bg-black dark:bg-white flex flex-col justify-start items-start gap-6 w-full mx-auto border border-accent text-white">
        <DialogHeader>
          <div className="flex flex-row justify-start items-center gap-3">
            <div className="flex flex-col justify-start items-start text-left">
              <DialogTitle>
                <h3 className="text-base text-white">Scan QR Code</h3>
              </DialogTitle>
              <DialogDescription className="text-xs text-accent dark:text-accent w-full">
                You can recieve assets from other wallets by scanning the QR
                code.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center gap-4 w-full">
          <div>From: {from}</div>
          <div>To: {to}</div>
          <div className="w-56 truncate">Data: {data}</div>
          <div>Gas: {gas}</div>
          <div>Value: {value}</div>
          <div>ChainId: {chainId}</div>
          <div>
            TransactionDapp:{" "}
            <img
              src={transactionDapp?.icons[0]}
              width={30}
              height={30}
              alt={transactionDapp?.name}
            />
          </div>
          <button className="w-full bg-white text-black py-2">Sign</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
