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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Truncate from "@/app/utils/truncate";

export default function TxPopup() {
  const {
    setPairing,
    disconnect,
    contractTransaction,
    transactionDapp,
    showTransactionModal,
    setShowTransactionModal,
    setApproveTransaction,
  } = useContext(SignClientContext);
  return (
    <Dialog open={showTransactionModal} onOpenChange={setShowTransactionModal}>
      <DialogContent className="bg-black dark:bg-white flex flex-col justify-start items-start gap-6 w-full mx-auto border border-accent text-white">
        <DialogHeader>
          <div className="flex flex-row justify-start items-center gap-3">
            <div className="flex flex-col justify-start items-start text-left">
              <DialogTitle>
                <h3 className="text-base text-white">Transaction Details</h3>
              </DialogTitle>
              <DialogDescription className="text-xs text-accent dark:text-accent w-full flex flex-row justify-start items-center gap-2">
                <img
                  src={transactionDapp?.icons[0]}
                  width={30}
                  height={30}
                  alt={transactionDapp?.name}
                />
                {transactionDapp?.name} wants you to sign a transaction.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="flex flex-col justify-center items-start gap-4 w-full text-left">
          <div className="flex flex-row justify-between items-center w-full">
            <label>Select Gas Chain</label>
            <Select defaultValue="1">
              <SelectTrigger className="max-w-32 h-fit text-black py-2 rounded-none border-0 border-accent focus:outline-none focus:ring-0 focus:ring-offset-0">
                <SelectValue
                  placeholder="Select Chain"
                  className="text-black"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="pb-4" value={"1"}>
                  <div className="flex flex-row justify-start items-center gap-2">
                    <div className="rounded-full flex justify-center items-center"></div>
                    <div className="truncate">Ethereum Holesky</div>
                  </div>
                </SelectItem>
                <SelectItem className="pb-4" value={"2"}>
                  <div className="flex flex-row justify-start items-center gap-2">
                    <div className="rounded-full flex justify-center items-center"></div>
                    <div className="truncate">Ethereum Holesky</div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <div>Destination Chain:</div>
            <div>{contractTransaction?.chainId}</div>
          </div>

          <div className="flex flex-row justify-between items-center w-full">
            <div>From:</div>
            <div>{transactionDapp?.name}</div>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <div>To:</div>
            <div>{Truncate(contractTransaction?.to, 12, "...")}</div>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <div>Data:</div>
            <div className="w-32 truncate">{contractTransaction?.data}</div>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <div>Gas:</div>
            <div>{contractTransaction?.gas}</div>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <div>Value:</div>
            <div>{contractTransaction?.value}</div>
          </div>

          <button
            className="w-full bg-white text-black py-2"
            onClick={() => setApproveTransaction(true)}
          >
            Sign
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
