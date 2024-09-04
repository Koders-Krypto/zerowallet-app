"use client";
import { gasChainsTokens } from "@/app/utils/tokens";
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
import { useState } from "react";
import {
  BadgeInfo,
  CalendarIcon,
  ChevronsRight,
  Plus,
  PlusSquareIcon,
  Wallet2,
  Zap,
} from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, set } from "date-fns";
import { cn } from "@/lib/utils";

export default function Investments() {
  const [fromChain, setFromChain] = useState<number>(0);
  const [fromToken, setFromToken] = useState<number>(0);
  const [frequency, setFrequency] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

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
  return (
    <div className="flex flex-col gap-6 justify-start p-4 items-start border border-accent w-full h-full">
      <div className="flex flex-row justify-between items-center w-full">
        <h3 className="font-bold text-2xl">Your Investments</h3>
        <Dialog>
          <DialogTrigger>
            <button className="bg-black text-white py-2 px-6 font-medium text-lg flex flex-row justify-center items-center gap-2 border border-black hover:border-accent hover:bg-transparent hover:text-white">
              <PlusSquareIcon /> Create Investment
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
                    type="number"
                    placeholder="0.01"
                    className="bg-transparent focus:outline-none w-full text-white text-4xl"
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
                    <Select
                      value={fromToken.toString()}
                      onValueChange={(e) => {
                        setFromToken(parseInt(e));
                      }}
                    >
                      <SelectTrigger className=" w-24 bg-white px-2 py-2 border border-accent text-black flex flex-row gap-2 items-center justify-center text-sm rounded-full focus:outline-none focus:ring-offset-0 focus:ring-0 focus:ring-accent">
                        <SelectValue placeholder="From Chain" />
                      </SelectTrigger>
                      <SelectContent>
                        {gasChainsTokens[fromChain].tokens.map((from, f) => (
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
                <div className="flex flex-row justify-between items-center text-sm">
                  <div className="text-accent">$0.00</div>
                  <div className="flex flex-row justify-center items-center gap-2 text-accent">
                    <Wallet2 size={16} />
                    <h5>0.00</h5>
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
                      value={fromToken.toString()}
                      onValueChange={(e) => {
                        setFromToken(parseInt(e));
                      }}
                    >
                      <SelectTrigger className=" w-24 bg-white px-2 py-2 border border-accent text-black flex flex-row gap-2 items-center justify-center text-sm rounded-full focus:outline-none focus:ring-offset-0 focus:ring-0 focus:ring-accent">
                        <SelectValue placeholder="From Chain" />
                      </SelectTrigger>
                      <SelectContent>
                        {gasChainsTokens[fromChain].tokens.map((from, f) => (
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
                    placeholder="1"
                    className="bg-transparent focus:outline-none w-full text-white text-4xl"
                  />
                  <div className="flex flex-row justify-center items-center gap-2">
                    <Select
                      value={frequency.toString()}
                      onValueChange={(e) => {
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
                    <div className="text-accent">Start Time</div>
                    <BadgeInfo size={14} />
                  </div>
                  <div className="flex flex-row justify-between items-center gap-2 w-full mt-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          className={cn(
                            "w-fit justify-start text-left font-normal flex flex-row items-center border-accent border-0"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-white" />
                          {startDate ? (
                            format(startDate, "PPP")
                          ) : (
                            <span className="text-white">Pick start date</span>
                          )}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
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
                    <div className="text-accent">End Time</div>
                    <BadgeInfo size={14} />
                  </div>
                  <div className="flex flex-row justify-between items-center gap-2 w-full mt-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          className={cn(
                            "w-fit justify-start text-left font-normal flex flex-row items-center border-accent border-0"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-white" />
                          {endDate ? (
                            format(endDate, "PPP")
                          ) : (
                            <span className="text-white">Pick end date</span>
                          )}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
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
            <button className="bg-transparent py-3 w-full bg-white text-black hover:border-t hover:border-accent hover:bg-transparent hover:text-white text-lg">
              Create
            </button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-3 gap-4 text-white w-full">
        <div className=" w-full flex flex-col gap-0 border border-accent">
          <div className="flex flex-row justify-between items-center px-4 py-3 border-b border-accent">
            <h2 className=" text-xl font-semibold">Vault #1</h2>
            <div>
              <Image
                src={gasChainsTokens[0].icon}
                alt="Wallet Icon"
                width={30}
                height={30}
              />
            </div>
          </div>
          <div className="px-4 py-3 flex flex-col justify-start items-start">
            <div className="flex flex-col justify-between items-start gap-4 w-full">
              <div className="flex flex-row justify-between items-center gap-3 w-full">
                <div className="flex flex-row justify-start items-center gap-2">
                  <Image
                    src={gasChainsTokens[0].tokens[0].icon}
                    alt="From Token"
                    width={30}
                    height={30}
                  />
                  <div className="font-semibold">
                    {gasChainsTokens[0].tokens[0].name}
                  </div>
                </div>
                <div>
                  <Zap />
                </div>
                <div className="flex flex-row justify-start items-center gap-2">
                  <Image
                    src={gasChainsTokens[0].tokens[2].icon}
                    alt="From Token"
                    width={30}
                    height={30}
                  />
                  <div className="font-semibold">
                    {gasChainsTokens[1].tokens[2].name}
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <h4 className="font-semibold">Time</h4>
                <h5>1 hour</h5>
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <h4 className="font-semibold">Frequency</h4>
                <h5>1 once</h5>
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <h4 className="font-semibold">Status</h4>
                <h5 className="flex flex-row justify-center items-center gap-2">
                  <div className="bg-red-600 h-3 w-3 rounded-full"></div>
                  <h5>Active</h5>
                </h5>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <button className="border border-accent px-6 py-2.5">
                  Disable
                </button>
                <button className="border border-accent px-6 py-2.5 bg-white text-black">
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
