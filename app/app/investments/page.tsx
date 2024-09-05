"use client";
import {
  gasChainsTokens,
  getChainById,
  getTokenInfo,
} from "@/app/utils/tokens";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeEventHandler, useEffect, useState } from "react";
import {
  BadgeInfo,
  CalendarIcon,
  ChevronsRight,
  Loader2,
  PlusSquareIcon,
  Wallet2,
} from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, set } from "date-fns";
import { cn } from "@/lib/utils";
import {
  buildAddSessionKey,
  getAllSessions,
  sendTransaction,
} from "@/app/logic/module";
import { useAccount, useLoginProvider } from "../../context/LoginProvider";
import useAccountStore from "@/app/store/account/account.store";
import {
  convertToSeconds,
  fixDecimal,
  formatTime,
  getTokenBalance,
  getVaultBalance,
} from "@/app/logic/utils";
import { scheduleJob } from "@/app/logic/jobsAPI";
import { WaitForUserOperationReceiptTimeoutError } from "permissionless";
import { ZeroAddress, formatEther, formatUnits } from "ethers";
import { getJsonRpcProvider } from "@/app/logic/web3";
import { setHours, setMinutes } from "date-fns";
import moment from "moment";
import { waitForExecution } from "@/app/logic/permissionless";
import { Switch } from "@/components/ui/switch";

type Investment = {
  address: string;
  token: string;
  targetToken: string;
  vault: string;
  account: string;
  validAfter: number;
  validUntil: number;
  limitAmount: bigint;
  limitUsed: bigint;
  lastUsed: number;
  refreshInterval: bigint;
};

export default function Investments() {
  const { chainId } = useAccountStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [investValue, setInvestValue] = useState<string>("0");
  const [investmentAdded, setInvestmentAdded] = useState(true);
  const [fromChain, setFromChain] = useState<number>(chainId);
  const [fromToken, setFromToken] = useState<number>(0);
  const [balance, setBalance] = useState<string>("0");
  const [targetToken, setTargetToken] = useState<number>(0);
  const [frequency, setFrequency] = useState<number>(0);
  const [refreshInterval, setRefreshInterval] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [tokenVaultDetails, setTokenVaultDetails] = useState<any[]>([]);
  const [nextSessionId, setNextSessionId] = useState<number>(0);

  const { address } = useAccount();
  const { validator } = useLoginProvider();

  useEffect(() => {
    (async () => {
      const provider = await getJsonRpcProvider(chainId.toString());
      const token = getChainById(Number(fromChain))?.tokens[fromToken].address;
      if (token == ZeroAddress) {
        setBalance(formatEther(await provider.getBalance(address)));
      } else {
        setBalance(await getTokenBalance(token!, address, provider));
      }
    })();
  }, [fromChain, fromToken]);

  useEffect(() => {
    (async () => {
      if (investmentAdded) {
        const provider = await getJsonRpcProvider(chainId.toString());
        let tokensWithVault = getChainById(Number(fromChain))?.tokens.filter(
          (token: any) => token.vault != undefined
        );

        if (tokensWithVault) {
          const updatedTokens = await Promise.all(
            tokensWithVault.map(async (token) => {
              const vaultBalance = await getVaultBalance(
                token.vault!,
                address,
                provider
              );
              return {
                ...token,
                vaultBalance, // Add the vault balance to each token
              };
            })
          );

          setTokenVaultDetails(updatedTokens); // Tokens now contain their respective vault balances
        }

        const investments = await getAllSessions(chainId.toString());
        setNextSessionId(investments.length);
        setInvestments(
          investments.filter(
            (investment: Investment) =>
              investment.account.toLowerCase() === address?.toLowerCase()
          )
        );
        setInvestmentAdded(false);
      }
    })();
  }, [chainId, address, investmentAdded]);

  const Frequency = [
    {
      label: "minutes",
    },
    {
      label: "hours",
    },
    {
      label: "days",
    },
  ];

  const [selected, setSelected] = useState<Date>();
  const [startTimeValue, setStartTimeValue] = useState<string>("00:00");

  const handleStartTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!selected) {
      setStartTimeValue(time);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(selected, minutes), hours);
    setSelected(newSelectedDate);
    setStartTimeValue(time);
  };

  const [endTimeValue, setEndTimeValue] = useState<string>("00:00");

  const handleEndTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!selected) {
      setEndTimeValue(time);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(selected, minutes), hours);
    setSelected(newSelectedDate);
    setEndTimeValue(time);
  };
  return (
    <div className="flex flex-col gap-6 justify-start p-4 items-start border border-accent w-full h-full">
      <div className="flex flex-row justify-between items-center w-full">
        <h3 className="font-bold text-2xl">Investments</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <button className="bg-black text-white py-2 px-2 md:px-6 font-medium text-lg flex flex-row justify-center items-center gap-2 border border-black hover:border-accent hover:bg-transparent hover:text-white">
              <PlusSquareIcon />{" "}
              <span className="hidden md:block">Create a Plan</span>
            </button>
          </DialogTrigger>
          <DialogContent className="bg-black dark:bg-white flex flex-col justify-start items-start gap-4 rounded-none sm:rounded-none max-w-lg mx-auto border border-accent">
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-white text-xl">
                Create a Investment
              </DialogTitle>
              <DialogDescription className="text-base text-accent mt-0">
                Create a new investment plan to store your assets and earn
                yield.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col border border-accent divide-y divide-accent gap-px">
              <div className=" px-4 py-3 flex flex-col gap-2 w-full text-base">
                <div className="flex flex-row justify-between items-center text-sm">
                  <div className="flex flex-row justify-start items-center gap-1 text-accent">
                    <div className="text-accent">Invest</div>
                    <BadgeInfo size={14} />
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center gap-2 w-full">
                  <input
                    type="text"
                    // placeholder={0.01}
                    value={investValue}
                    className="bg-transparent focus:outline-none w-full text-white text-4xl"
                    onChange={(e) => setInvestValue(e.target.value)}
                  />
                  <div className="flex flex-row justify-center items-center gap-2">
                    <Select
                      value={fromChain.toString()}
                      onValueChange={(e) => {
                        setFromChain(parseInt(e));
                        setFromToken(0);
                      }}
                    >
                      <SelectTrigger className=" w-28 bg-white px-2 py-2 border border-accent text-black flex flex-row gap-2 items-center justify-center text-sm rounded-full focus:outline-none focus:ring-offset-0 focus:ring-0 focus:ring-accent">
                        <SelectValue placeholder="From Chain" />
                      </SelectTrigger>
                      <SelectContent>
                        {gasChainsTokens.map((from, f) => (
                          <SelectItem key={f} value={from.chainId.toString()}>
                            <div className="flex flex-row justify-center items-center gap-2">
                              <Image
                                className="bg-white rounded-full"
                                src={from.icon}
                                alt={from.name}
                                width={25}
                                height={25}
                              />
                              <h3 className="truncate">{from.name}</h3>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={fromToken.toString()}
                      onValueChange={(e) => {
                        setFromToken(parseInt(e));
                      }}
                    >
                      <SelectTrigger className=" w-24 bg-white px-2 py-2 border border-accent text-black flex flex-row gap-2 items-center justify-center text-sm rounded-full focus:outline-none focus:ring-offset-0 focus:ring-0 focus:ring-accent">
                        <SelectValue placeholder="From Token" />
                      </SelectTrigger>
                      <SelectContent>
                        {getChainById(Number(fromChain))?.tokens.map(
                          (from, f) => (
                            <SelectItem key={f} value={f.toString()}>
                              <div className="flex flex-row justify-center items-center gap-2">
                                <Image
                                  className="bg-white rounded-full"
                                  src={from.icon}
                                  alt={from.name}
                                  width={25}
                                  height={25}
                                />
                                <h3 className="truncate uppercase">
                                  {from.name}
                                </h3>
                              </div>
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-row justify-between items-center text-sm">
                  <div className="text-accent">
                    ${Number(balance).toFixed(8)}
                  </div>
                  <div className="flex flex-row justify-center items-center gap-2 text-accent">
                    <Wallet2 size={16} />
                    <h5>{Number(balance).toFixed(8)}</h5>
                  </div>
                </div>
              </div>

              <div className=" px-4 py-3 flex flex-col gap-2 w-full text-base">
                <div className="flex flex-row justify-start items-center gap-1 text-accent text-sm">
                  <div className="text-accent">Buy</div>
                  <BadgeInfo size={14} />
                </div>
                <div className="flex flex-row justify-between items-center gap-2 w-full">
                  <input
                    type="number"
                    disabled
                    placeholder=""
                    className="bg-transparent focus:outline-none w-full text-white text-4xl"
                  />
                  <div className="flex flex-row justify-center items-center gap-2">
                    <Select
                      value={targetToken.toString()}
                      onValueChange={(e) => {
                        setTargetToken(parseInt(e));
                      }}
                    >
                      <SelectTrigger className=" w-24 bg-white px-2 py-2 border border-accent text-black flex flex-row gap-2 items-center justify-center text-sm rounded-full focus:outline-none focus:ring-offset-0 focus:ring-0 focus:ring-accent">
                        <SelectValue placeholder="From Chain" />
                      </SelectTrigger>
                      <SelectContent>
                        {tokenVaultDetails.map((from, f) => (
                          <SelectItem key={f} value={f.toString()}>
                            <div className="flex flex-row justify-center items-center gap-2">
                              <Image
                                className="bg-white rounded-full"
                                src={from.icon}
                                alt={from.name}
                                width={25}
                                height={25}
                              />
                              <h3 className="truncate">{from.name}</h3>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className=" px-4 py-3 flex flex-col gap-2 w-full text-base">
                <div className="flex flex-row justify-start items-center gap-1 text-accent text-sm">
                  <div className="text-accent">Every</div>
                  <BadgeInfo size={14} />
                </div>
                <div className="flex flex-row justify-between items-center gap-2 w-full">
                  <input
                    type="number"
                    value={refreshInterval}
                    onChange={(e) =>
                      setRefreshInterval(parseInt(e.target.value))
                    }
                    className="bg-transparent focus:outline-none w-full text-white text-4xl"
                  />
                  <div className="flex flex-row justify-center items-center gap-2">
                    <Select
                      value={frequency.toString()}
                      onValueChange={(e) => {
                        console.log(e);
                        setFrequency(parseInt(e));
                      }}
                    >
                      <SelectTrigger className=" w-24 bg-white px-2 py-2 border border-accent text-black flex flex-row gap-2 items-center justify-center text-sm rounded-full focus:outline-none focus:ring-offset-0 focus:ring-0 focus:ring-accent">
                        <SelectValue placeholder="Frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        {Frequency.map((frequency, fre) => {
                          return (
                            <SelectItem key={fre} value={fre.toString()}>
                              {frequency.label}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex flex-row divide-x divide-accent">
                <div className=" px-4 py-3 flex flex-col justify-start items-start gap-2 w-full text-base">
                  <div className="flex flex-row justify-start items-center gap-1 text-accent text-sm">
                    <div className="text-accent">Start Date</div>
                    <BadgeInfo size={14} />
                  </div>
                  <div className="flex flex-row justify-between items-center gap-2 w-full mt-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          className={cn(
                            "w-fit justify-start text-left font-normal flex flex-row items-center border-accent text-white border-0"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-white" />
                          {startDate ? (
                            format(startDate, "PPP") +
                            " " +
                            moment(startTimeValue, "HH:mm:ss").format("hh:mm A")
                          ) : (
                            <span className="text-white">Pick start date</span>
                          )}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <div className="w-full flex flex-row justify-center items-center mt-4">
                          <input
                            className="focus:outline-none text-black bg-transparent w-28"
                            type="time"
                            value={startTimeValue}
                            onChange={handleStartTimeChange}
                          />
                        </div>
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className=" px-4 py-3 flex flex-col justify-start items-start gap-2 w-full text-base">
                  <div className="flex flex-row justify-start items-center gap-1 text-accent text-sm">
                    <div className="text-accent">End Date</div>
                    <BadgeInfo size={14} />
                  </div>
                  <div className="flex flex-row justify-between items-center gap-2 w-full mt-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          className={cn(
                            "w-fit justify-start text-left font-normal flex flex-row items-center border-accent text-white border-0"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-white" />
                          {endDate ? (
                            format(endDate, "PPP") +
                            " " +
                            moment(endTimeValue, "HH:mm:ss").format("hh:mm A")
                          ) : (
                            <span className="text-white">Pick end date</span>
                          )}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <div className="w-full flex flex-row justify-center items-center mt-4">
                          <input
                            className="focus:outline-none text-black bg-transparent w-28"
                            type="time"
                            value={endTimeValue}
                            onChange={handleEndTimeChange}
                          />
                        </div>
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="bg-transparent py-3 w-full bg-white text-black border border-accent hover:bg-transparent hover:text-white text-lg"
              disabled={isLoading}
              onClick={async () => {
                setIsLoading(true);
                try {
                  const sessionKeyCall = await buildAddSessionKey(
                    chainId.toString(),
                    address,
                    investValue,
                    convertToSeconds(
                      refreshInterval,
                      Frequency[frequency].label as any
                    ),
                    getChainById(Number(fromChain))?.tokens[fromToken].address!,
                    tokenVaultDetails[targetToken].address!,
                    tokenVaultDetails[targetToken].vault!
                  );
                  await sendTransaction(
                    chainId.toString(),
                    sessionKeyCall.to,
                    sessionKeyCall.value,
                    sessionKeyCall.data,
                    validator,
                    address
                  );
                } catch (error) {
                  if (
                    error instanceof WaitForUserOperationReceiptTimeoutError
                  ) {
                    const hashPattern = /hash\s"([^"]+)"/;
                    const match = error.message.match(hashPattern);

                    if (match && match[1]) {
                      const transactionHash = match[1];
                      console.log("Transaction hash:", transactionHash);
                      await waitForExecution(
                        fromChain.toString(),
                        transactionHash
                      );
                    } else {
                      console.error(
                        "No transaction hash found in the error message."
                      );
                    }
                    // console.error("User operation timed out:", error.message);
                  } else {
                    throw error;
                  }
                }
                await scheduleJob(nextSessionId.toString());
                setInvestmentAdded(true);
                setDialogOpen(false);
                setIsLoading(false);
              }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating your investement plan...
                </span>
              ) : (
                "Create Plan"
              )}
            </button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white w-full">
        {tokenVaultDetails.map((tokenVault, index) => (
          <div
            key={index}
            className=" w-full flex flex-col gap-0 border border-accent"
          >
            <div className="flex flex-row justify-between items-center px-4 py-3 border-b border-accent">
              <div className="flex flex-row justify-start items-center gap-2">
                <Image
                  src={tokenVault.icon!}
                  alt="From Token"
                  width={30}
                  height={30}
                />
                <div className="font-semibold">{tokenVault.name!}</div>
              </div>
              <div>
                <Image
                  className="bg-white rounded-full"
                  src={getChainById(Number(chainId))?.icon!}
                  alt="Wallet Icon"
                  width={30}
                  height={30}
                />
              </div>
            </div>
            <div className="px-4 py-3 flex flex-col justify-start items-start">
              <div className="flex flex-col justify-between items-start gap-4 w-full">
                <div className="flex flex-row justify-between items-center w-full">
                  <h4 className="font-semibold">Balance</h4>
                  <h5>
                    {fixDecimal(
                      tokenVault.vaultBalance,
                      parseInt(tokenVault.vaultBalance) ? 4 : 6
                    )}
                  </h5>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div></div>
                  <button className="border border-accent px-6 py-2.5 bg-white text-black text-sm hover:bg-transparent hover:text-white">
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 flex-grow max-h-full h-24 overflow-y-scroll w-full">
        {investments.length > 0 && (
          <h3 className="font-bold text-2xl">Investment Plans</h3>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white w-full">
          {investments.map((investment, index) => (
            <div
              key={index}
              className=" w-full flex flex-col gap-0 border border-accent relative"
            >
              <div className="flex flex-row justify-between items-center px-4 py-3 border-b border-accent">
                <h2 className=" text-xl font-semibold">
                  Investment {index + 1}
                </h2>
                <div className="absolute -right-0 md:-right-4 -top-6 md:-top-4">
                  <Image
                    className="bg-white rounded-full"
                    src={getChainById(Number(chainId))?.icon!}
                    alt="Wallet Icon"
                    width={30}
                    height={30}
                  />
                </div>
                <div>
                  <Switch
                    className="bg-accent rounded-full data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-accent border border-accent"
                    defaultChecked={
                      investment.validUntil > Math.floor(Date.now() / 1000)
                        ? true
                        : false
                    }
                  />
                </div>
              </div>
              <div className="px-4 py-3 flex flex-col justify-start items-start">
                <div className="flex flex-col justify-between items-start gap-4 w-full">
                  <div className="flex flex-row justify-between items-center gap-3 w-full">
                    <div className="flex flex-row justify-start items-center gap-2">
                      <Image
                        src={
                          getTokenInfo(Number(chainId), investment.token)?.icon!
                        }
                        alt="From Token"
                        width={30}
                        height={30}
                      />
                      <div className="font-semibold">
                        {getTokenInfo(Number(chainId), investment.token)?.name!}
                      </div>
                    </div>
                    <div>
                      <ChevronsRight />
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2">
                      <Image
                        src={
                          getTokenInfo(Number(chainId), investment.targetToken)
                            ?.icon!
                        }
                        alt="From Token"
                        width={30}
                        height={30}
                      />
                      <div className="font-semibold">
                        {
                          getTokenInfo(Number(chainId), investment.targetToken)
                            ?.name
                        }
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center w-full">
                    <h4 className="font-semibold">Invests</h4>
                    <h5>
                      {formatUnits(
                        investment.limitAmount,
                        getTokenInfo(Number(chainId), investment.token)
                          ?.decimals
                      )}
                    </h5>
                  </div>
                  <div className="flex flex-row justify-between items-center w-full">
                    <h4 className="font-semibold">Every</h4>
                    <h5>{formatTime(Number(investment.refreshInterval))}</h5>
                  </div>
                  <div className="flex flex-row justify-between items-center w-full">
                    <h4 className="font-semibold">Expires On</h4>
                    <>
                      <h5>{`${new Date(
                        Number(investment.validUntil) * 1000
                      ).toDateString()} ${new Date(
                        Number(investment.validUntil) * 1000
                      ).toLocaleTimeString()}`}</h5>
                    </>
                  </div>
                  <div className="flex flex-row justify-between items-center w-full">
                    <h4 className="font-semibold">Status</h4>
                    <h5 className="flex flex-row justify-center items-center gap-2">
                      {investment.validUntil > Math.floor(Date.now() / 1000) ? (
                        <div className="bg-green-600 h-3 w-3 rounded-full"></div>
                      ) : (
                        <div className="bg-red-600 h-3 w-3 rounded-full"></div>
                      )}
                      {investment.validUntil > Math.floor(Date.now() / 1000) ? (
                        <h5>Active</h5>
                      ) : (
                        <h5>Expired</h5>
                      )}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
