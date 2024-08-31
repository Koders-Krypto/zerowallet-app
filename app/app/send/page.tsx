import { Fuel } from "lucide-react";

export default function Bridge() {
  return (
    <div className="w-full h-full text-black border border-accent flex flex-col justify-center items-center gap-6 px-4 py-4 md:py-6">
      <div className="bg-white max-w-md w-full flex flex-col">
        <div className="flex flex-row justify-between items-center gap-4 py-4 border-b border-accent px-6">
          <h2 className="font-bold text-xl">Transfer Tokens</h2>
          <div className="flex flex-row gap-2 items-center justify-center text-sm">
            <Fuel size={20} />
            <div className="bg-black px-4 py-2 text-white flex flex-row gap-2 items-center justify-center text-sm">
              <h2>Gas Chain</h2>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 px-6 pb-4 pt-2">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-end items-center text-sm">
              <div className="flex flex-row justify-center items-center gap-1">
                <div>0.001ETH</div>
                <button className="font-bold">Max</button>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center">
              <input
                type="number"
                placeholder="Enter Amount"
                className="w-full h-full pl-4 py-3 bg-transparent text-black focus:outline-none border-y border-accent border-l"
              />
              <div className="flex flex-row divide-x divide-accent">
                <div className="bg-black text-white px-4 py-3">Chain</div>
                <div className="bg-black text-white px-4 py-3">Token</div>
              </div>
            </div>
          </div>
          <input
            type="number"
            placeholder="Recipient Address"
            className="w-full h-full pl-4 py-3 bg-transparent text-black focus:outline-none border border-accent"
          />
          <button className="w-full bg-black text-white py-4 text-lg font-bold">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
