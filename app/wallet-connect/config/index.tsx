// config/index.tsx

import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import { mainnet, sepolia, holesky, opBNBTestnet } from "wagmi/chains";

// Your WalletConnect Cloud project ID
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

// Create a metadata object
const metadata = {
  name: "ZeroWallet",
  description:
    "ZeroWallet is a LayerZero-powered crypto wallet that lets you manage gas fees on one chain while accessing dApps across all chains.",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
const chains = [mainnet, sepolia, holesky, opBNBTestnet] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
