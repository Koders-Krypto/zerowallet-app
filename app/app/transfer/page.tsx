"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Check, Fuel, Loader2, SendHorizonal, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import * as ethers from "ethersv5"; // Correct import statement
import {
  gasChainsTokens,
  getChainById,
  GasChainType,
} from "@/app/utils/tokens";
import { waitForTransactionReceipt, readContract } from "@wagmi/core";
import { config } from "@/app/wallet-connect/config/index";
import { Address, erc20Abi, formatEther, formatUnits } from "viem";
import { switchChain, getChainId } from "@wagmi/core";
import {
  useBalance,
  useSendTransaction,
  useContractWrite,
  useWriteContract,
} from "wagmi";
import { LoginContext } from "@/app/context/LoginProvider";
import { sendTransaction } from "viem/actions";
import Truncate from "@/app/utils/truncate";
import MyOFTABI from "@/app/context/MyOFT";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { createClient } from "@layerzerolabs/scan-client";
import { useToast } from "@/components/ui/use-toast";

export type Message = {
  srcUaAddress: string;
  dstUaAddress: string;
  srcChainId: number;
  dstChainId: number;
  dstTxHash?: string;
  dstTxError?: string;
  srcTxHash: string;
  srcBlockHash: string;
  srcBlockNumber: string;
  srcUaNonce: number;
  status: MessageStatus;
};

enum MessageStatus {
  INFLIGHT = "INFLIGHT",
  DELIVERED = "DELIVERED",
  FAILED = "FAILED",
  PAYLOAD_STORED = "PAYLOAD_STORED",
  BLOCKED = "BLOCKED",
  CONFIRMING = "CONFIRMING",
}
const sendABI = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "dstEid",
            type: "uint32",
          },
          {
            internalType: "bytes32",
            name: "to",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "amountLD",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minAmountLD",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "extraOptions",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "composeMsg",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "oftCmd",
            type: "bytes",
          },
        ],
        internalType: "struct SendParam",
        name: "_sendParam",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "nativeFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lzTokenFee",
            type: "uint256",
          },
        ],
        internalType: "struct MessagingFee",
        name: "_fee",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "_refundAddress",
        type: "address",
      },
    ],
    name: "send",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "guid",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "nonce",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "nativeFee",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "lzTokenFee",
                type: "uint256",
              },
            ],
            internalType: "struct MessagingFee",
            name: "fee",
            type: "tuple",
          },
        ],
        internalType: "struct MessagingReceipt",
        name: "msgReceipt",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "amountSentLD",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountReceivedLD",
            type: "uint256",
          },
        ],
        internalType: "struct OFTReceipt",
        name: "oftReceipt",
        type: "tuple",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];
// ERC-20 contract ABI for transfer function
const ERC20_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: "to",
        type: "address",
      },
      {
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    type: "function",
  },
];
const sendParam = [
  40217,
  new Uint8Array(
    Buffer.from([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 165, 48, 219, 8, 150, 104, 108, 49,
      120, 88, 208, 113, 130, 239, 169, 12, 22, 193, 76, 215,
    ])
  ),
  "1000000000000000000",
  "1000000000000000000",
  "0x00030100110100000000000000000000000000030d40",
  "0x",
  "0x",
];

export default function Bridge() {
  const { accountInfo } = useContext(LoginContext);
  const [chainA, setChainA] = useState<GasChainType>(gasChainsTokens[0]);
  const [chainB, setChainB] = useState<GasChainType>(gasChainsTokens[0]);
  const [selectedTokenID, setSelectedTokenID] = useState<number>(0);
  const [recipientAddress, setRecipientAddress] = useState<string>(
    accountInfo.address
  );
  const [amount, setAmount] = useState<string>("");
  const [disableTransfer, setDisableTransfer] = useState<boolean>(true);
  const [transferStatus, setTransferStatus] = useState<
    | "IDLE"
    | "TRANSACTION_PENDING"
    | "TRANSACTION_SUCCESS"
    | "TRANSACTION_FAILED"
    | "MESSAGE_PENDING"
    | "MESSAGE_SUCCESS"
    | "MESSAGE_FAILED"
  >("IDLE");
  const [nativeFee, setNativeFee] = useState<string>("0");
  const { toast } = useToast();

  const { writeContract: writeContract } = useWriteContract({ config });

  const waitForTransaction = async (hash: Address) => {
    try {
      const transactionReceipt = await waitForTransactionReceipt(config, {
        confirmations: 2,
        hash,
      });
      if (transactionReceipt.status === "success") {
        setTransferStatus("TRANSACTION_SUCCESS");
        return {
          success: true,
          data: transactionReceipt,
        };
      }
      setTransferStatus("TRANSACTION_FAILED");
      throw transactionReceipt.status;
    } catch (e: any) {
      setTransferStatus("TRANSACTION_FAILED");
      throw e;
    }
  };

  const { data: transferEtherHash, sendTransaction: sendEtherTransaction } =
    useSendTransaction();

  const validateInput = (recipientAddress: string, amount: string) => {
    if (recipientAddress === "") {
      setDisableTransfer(true);
      return false;
    }
    if (amount === "" || parseFloat(amount) <= 0) {
      setDisableTransfer(true);
      return false;
    }
    setDisableTransfer(false);
    return true;
  };

  useEffect(() => {
    if (transferEtherHash) {
      setTransferStatus("TRANSACTION_PENDING");
      waitForTransaction(transferEtherHash).then((res) => {
        if (res.success) {
          refetchNativeBalanceA();
          setTransferStatus("TRANSACTION_SUCCESS");
        } else {
          //   refetchNativeBalanceA();
          setTransferStatus("TRANSACTION_FAILED");
        }
      });
    }
  }, [transferEtherHash]);

  useEffect(() => {
    if (chainA.name === chainB.name) return;

    (async () => {
      const eidA = chainA.endpointId;
      const eidB = chainB.endpointId;
      //   const amountInEther = parseUnits(amount, "ether");
      //   console.log("amountInEther: ", amountInEther);

      const options = Options.newOptions()
        .addExecutorLzReceiveOption(200000, 0)
        .toHex()
        .toString();

      // const [nativeFee] = await MyOFT.quoteSend(sendParam, false)

      //   console.log("zeroPadByte ", ethers);

      //   console.log("before readCntract: ", {
      //     address: chainA.tokens[selectedTokenID].address,
      //     functionName: "quoteSend",
      //     args: [sendParam, false],
      //     chainId: chainA.chainId,
      //   });
      //   const result: any = await readContract(config, {
      //     abi: MyOFT,
      //     address: chainA.tokens[selectedTokenID].address,
      //     functionName: "quoteSend",
      //     args: [sendParam, false],
      //     chainId: chainA.chainId,
      //   });

      //   const { nativeFee } = result;
      //   console.log("nativeFee: ", nativeFee);
      const nativeFee = "191653002712926";

      setNativeFee(nativeFee);
    })();
  }, [chainA, chainB]);

  const getTxpoolStatus = async (txHash: string) => {
    try {
      const client = createClient("testnet");
      const { messages } = await client.getMessagesBySrcTxHash(txHash);
      const _message: Message = messages[0] as Message;
      setTransferStatus("MESSAGE_PENDING");
      if (
        !_message ||
        (_message.status !== "DELIVERED" &&
          _message.status !== "FAILED" &&
          _message.status !== "BLOCKED")
      ) {
        setTimeout(() => {
          getTxpoolStatus(txHash);
        }, 60 * 1000);
      } else if (_message.status === "FAILED") {
        // await handleFailedMessage(txHash);
        setTransferStatus("MESSAGE_FAILED");
      } else {
        setTransferStatus("MESSAGE_SUCCESS");
      }
      6;
    } catch (e) {
      setTimeout(() => {
        getTxpoolStatus(txHash);
      }, 60 * 1000);
    }
  };

  const transferTokens = async () => {
    try {
      setTransferStatus("TRANSACTION_PENDING");
      const chainId = getChainId(config);

      if (chainId !== chainA.chainId) {
        await switchChain(config, { chainId: chainA.chainId });
      }
      const address = accountInfo.address;

      const amountInEther = ethers.utils.parseUnits(amount, "ether");

      if (chainA.chainId === chainB.chainId) {
        if (selectedTokenID === 0) {
          sendEtherTransaction({
            to: recipientAddress as `0x${string}`,
            value: BigInt(amountInEther.toString()),
            chainId: chainA.chainId,
          });
          refetchNativeBalanceA();
          refetchNativeBalanceB();
        } else {
          //   const result = await writeContract(config, {
          //     abi: ERC20_ABI,
          //     address: chainA.tokens[selectedTokenID].address as `0x${string}`,
          //     functionName: "transfer",
          //     args: [recipientAddress, amountInEther],
          //     chainId: chainA.chainId,
          //   });
          //   await waitForTransaction(result);
          refetchTokenBalanceA();
          refetchTokenBalanceB();
        }
      } else {
        const options = Options.newOptions()
          .addExecutorLzReceiveOption(200000, 0)
          .toHex()
          .toString();

        const sendParam = {
          dstEid: chainB.endpointId, // example destination Eid
          to: ethers.utils.zeroPad(address, 32),
          amountLD: amountInEther, // 1.0 native token (e.g., ETH) in wei
          minAmountLD: ethers.utils.parseEther("0"), // Minimum amount for successful transaction
          extraOptions: options, // Example extra options
          composeMsg: "0x", // Example composed message
          oftCmd: "0x", // Example OFT command
        };

        //@ts-ignore
        const ethereumProvider = window.ethereum;
        const provider = new ethers.providers.Web3Provider(ethereumProvider);

        if (ethereumProvider == undefined) {
          console.error("No Ethereum provider found");
          return;
        }

        //@ts-ignore
        await ethereumProvider.request({ method: "eth_requestAccounts" });
        const signer = provider.getSigner();
        //   const signerAddress = await signer.getAddress();

        const MyOFT = new ethers.Contract(
          chainA.tokens[selectedTokenID].address as `0x${string}`,
          MyOFTABI,
          signer
        );

        const [nativeFee] = await MyOFT.quoteSend(sendParam, false);

        const fee = {
          nativeFee, // Native fee, e.g., 0.01 ETH
          lzTokenFee: ethers.utils.parseUnits("0", 18), // Layer Zero token fee (adjust decimals accordingly)
        };

        const tr = await MyOFT.send(sendParam, fee, address, {
          value: nativeFee,
        });
        await tr.wait();

        await getTxpoolStatus(tr.hash);
      }
    } catch (err: any) {
      console.log("err: ", err);
      setTransferStatus("IDLE");
      toast({
        success: true,
        title: "Failed to Transfer",
        description: err.message,
      });
    }
  };

  const {
    data: chainABalance,
    // loading: isLoadingA,
    refetch: refetchTokenBalanceA,
  } = useBalance({
    address: accountInfo.address,
    token: chainA.tokens[selectedTokenID].address as `0x${string}`,
    chainId: chainA.chainId,
  });

  const {
    data: chainBBalance,
    // loading: isLoadingB,
    refetch: refetchTokenBalanceB,
  } = useBalance({
    address: accountInfo.address,
    token: chainB.tokens[selectedTokenID].address as `0x${string}`,
    chainId: chainB.chainId,
  });

  const { data: nativeBalanceA, refetch: refetchNativeBalanceA } = useBalance({
    address: accountInfo.address,
    chainId: chainA.chainId,
  });

  const { data: nativeBalanceB, refetch: refetchNativeBalanceB } = useBalance({
    address: accountInfo.address,
    chainId: chainB.chainId,
  });

  const getBalanceA = () => {
    console.log(
      "chainABalance: ",
      chainABalance,
      nativeBalanceA,
      chainA.tokens[selectedTokenID]
    );
    if (chainA.tokens[selectedTokenID].name === "ETH") {
      return formatEther(nativeBalanceA?.value ?? BigInt("0"), "wei");
    } else {
      return formatUnits(
        chainABalance?.value ?? BigInt("0"),
        chainA.tokens[selectedTokenID].decimals
      );
      //   return formatUnits(
      //     chainABalance?.value ?? BigInt("0"),
      //     chainA.tokens[selectedTokenID].decimals
      //   );
    }
  };

  const getBalanceB = () => {
    if (chainB.tokens[selectedTokenID].name === "ETH") {
      return formatEther(nativeBalanceB?.value ?? BigInt("0"), "wei");
    } else {
      return formatUnits(
        chainBBalance?.value ?? BigInt("0"),
        chainB.tokens[selectedTokenID].decimals
      );
      //   return formatUnits(
      //     chainBBalance?.value ?? BigInt("0"),
      //     chainB.tokens[selectedTokenID].decimals
      //   );
    }
  };

  const chainComponent = (
    selectedChain: GasChainType,
    setSelectedChain: (chain: GasChainType) => void,
    AorB: "A" | "B"
  ) => {
    return (
      <div className="relative">
        <Select
          value={gasChainsTokens
            .findIndex((res) => res.name === selectedChain.name)
            .toString()}
          onValueChange={(e) => {
            //   setSelectedTokenID(0);
            setSelectedChain(gasChainsTokens[parseInt(e)]);
            // setSelectedTransferChainID(parseInt(e));
          }}
        >
          <SelectTrigger className="bg-black text-white px-4 w-full py-3 h-full border-accent border-r-0 focus:outline-none focus:ring-offset-0 focus:ring-0">
            <SelectValue placeholder="Chain" />
          </SelectTrigger>
          <SelectContent>
            {gasChainsTokens.map((chain, c) => (
              <SelectItem key={chain.chainId} value={c.toString()}>
                <div className="flex flex-row justify-center items-center gap-2 w-auto">
                  <Image
                    className="bg-white rounded-full"
                    src={chain.icon}
                    alt={chain.name}
                    width={20}
                    height={20}
                  />
                  <h3>{chain.name}</h3>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* <div className="flex flex-row justify-center items-center gap-2 w-auto absolute text-xs -top-4 right-0">
          <h3>{AorB === "A" ? getBalanceA() : getBalanceB()}</h3>
        </div> */}
      </div>
    );
  };

  //   console.log("fee: ", BigInt(nativeFee), BigInt(parseUnits(amount, "ether")));
  return (
    <div className="w-full h-full text-white border border-accent flex flex-col justify-start md:justify-center items-start md:items-center gap-6 px-4 py-4 md:py-6">
      <div className="bg-transparent border border-accent max-w-lg w-full flex flex-col">
        <div className="flex flex-row justify-between items-center gap-2 py-3.5 border-b border-accent px-4 md:px-6">
          <h2 className="font-bold text-xl truncate">OFT Transfer</h2>
          {/* <div className="flex flex-row gap-2 items-center justify-center text-sm">
            {chainComponent(chainA, setChainA)}
            {chainComponent(chainB, setChainB)}
          </div> */}
        </div>
        <div className="flex flex-col gap-4 px-4 md:px-6 pb-6 pt-7 relative">
          <div className="grid grid-cols-3 divide-x divide-accent">
            {chainComponent(chainA, setChainA, "A")}
            <Select
              key={gasChainsTokens.findIndex((res) => res.name === chainA.name)}
              value={selectedTokenID.toString()}
              onValueChange={(e) => setSelectedTokenID(parseInt(e))}
            >
              <SelectTrigger className="bg-black text-white px-4 w-full py-3 h-full focus:outline-none focus:ring-offset-0 focus:ring-0">
                <SelectValue placeholder="Token" />
              </SelectTrigger>

              <SelectContent>
                {chainA.tokens.map((stoken, t) => (
                  <SelectItem key={t} value={t.toString()}>
                    <div className="flex flex-row justify-center items-center gap-2 w-auto">
                      <Image
                        className="bg-white rounded-full"
                        src={stoken.icon}
                        alt={stoken.name}
                        width={20}
                        height={20}
                      />
                      <h3>{stoken.name}</h3>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="relative">
              <div className="absolute -top-5 right-0 text-xs">
                <div className="flex flex-row justify-end items-center gap-1">
                  {getBalanceA()}{" "}
                  {/* <button
                    onClick={() => setAmount(getBalanceA())}
                    className="font-bold"
                  >
                    Max
                  </button> */}
                </div>
              </div>
              <input
                type="number"
                placeholder={"0.01 ETH"}
                onChange={(e) => {
                  setAmount(e.target.value);
                  validateInput(recipientAddress, e.target.value);
                }}
                className="w-full h-full pr-2 py-3 bg-black text-white border-y border-accent !border-r text-right focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 border-r border-accent">
            {chainComponent(chainB, setChainB, "B")}
          </div>

          <input
            type="string"
            placeholder="Recipient address (0x0)"
            className="w-full h-full pl-4 py-3 bg-transparent text-white focus:outline-none border border-accent"
            onChange={(e) => {
              setRecipientAddress(e.target.value);
              validateInput(e.target.value, amount);
            }}
            value={recipientAddress}
          />
          {amount && nativeFee && (
            <div className="border border-accent px-4 py-1.5 flex flex-col text-sm gap-0 divide-y divide-accent">
              <div className="flex flex-row justify-between items-center py-2">
                <h4>Amount</h4>
                <h5>{amount} ETH</h5>
              </div>

              <div className="flex flex-row justify-between items-center pt-2 py-2">
                <h4>Native Fee</h4>
                <h5>{formatEther(BigInt(nativeFee))} ETH</h5>
              </div>
            </div>
          )}

          {transferStatus === "IDLE" ? (
            <button
              className={
                !disableTransfer
                  ? "w-full bg-white hover:bg-transparent hover:text-white border border-accent text-black py-3.5 text-lg font-bold flex flex-row justify-center items-center gap-2"
                  : "w-full border border-accent px-4 py-3 flex text-lg justify-center items-center gap-2 divide-y divide-accent"
              }
              onClick={transferTokens}
              disabled={disableTransfer}
            >
              Transfer <SendHorizonal size={20} />
            </button>
          ) : (
            <div className="flex flex-row justify-center items-center gap-2">
              <div className="w-full bg-white hover:bg-transparent hover:text-white border border-accent text-black py-3.5 text-lg font-bold flex flex-row justify-center items-center gap-2">
                {transferStatus === "TRANSACTION_PENDING" ? (
                  <div className="flex flex-row gap-4 items-center">
                    <Loader2 className="animate-spin" size={20} />
                    Transferring...
                  </div>
                ) : transferStatus === "TRANSACTION_SUCCESS" ? (
                  <div className="flex flex-row gap-4 items-center">
                    <Check size={20} /> Success
                  </div>
                ) : transferStatus === "TRANSACTION_FAILED" ? (
                  <div className="flex flex-row gap-4 items-center ">
                    <X size={20} /> Failed
                  </div>
                ) : transferStatus === "MESSAGE_PENDING" ? (
                  <div className="flex flex-row gap-4 items-center ">
                    <Loader2 className="animate-spin" size={20} />
                    Bridge Pending...
                  </div>
                ) : transferStatus === "MESSAGE_SUCCESS" ? (
                  <div className="flex flex-row gap-4 items-center">
                    <Check size={20} /> Success
                  </div>
                ) : transferStatus === "MESSAGE_FAILED" ? (
                  <div className="flex flex-row gap-4 items-center">
                    <X size={20} /> Failed
                  </div>
                ) : (
                  <div className="flex flex-row gap-4 items-center">
                    Transfer
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
