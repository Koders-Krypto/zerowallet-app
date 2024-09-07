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
    "ZeroWallet, powered by LayerZero, simplifies multi-chain management. Track your portfolio of tokens, positions, and NFTs, invest in yield-generating vaults, and bridge assets across chains. With passkey login via account abstraction, onboarding Web3 users is seamless. Transfer OFTs across supported chains easily.",
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
