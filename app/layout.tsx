import type { Metadata } from "next";
import { Mulish, Space_Grotesk } from "next/font/google";
import "./styles/globals.css";
import { headers } from "next/headers";

import { cookieToInitialState } from "wagmi";

import { config } from "@/app/wallet-connect/config";
import Web3ModalProvider from "@/app/wallet-connect/context";
import { LoginProvider } from "./context/LoginProvider";
import Footer from "./components/Footer/Footer";
import { Toaster } from "@/components/ui/toaster";

const mulish = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZeroWallet - Unlock the Omni-Chain Future",
  description:
    "ZeroWallet, powered by LayerZero, simplifies multi-chain management. Track your portfolio of tokens, positions, and NFTs, invest in yield-generating vaults, and bridge assets across chains. With passkey login via account abstraction, onboarding Web3 users is seamless. Transfer OFTs across supported chains easily.",
  openGraph: {
    title: "ZeroWallet - Unlock the Omni-Chain Future",
    url: "https://wallet.usezero.xyz/",
    description:
      "ZeroWallet, powered by LayerZero, simplifies multi-chain management. Track your portfolio of tokens, positions, and NFTs, invest in yield-generating vaults, and bridge assets across chains. With passkey login via account abstraction, onboarding Web3 users is seamless. Transfer OFTs across supported chains easily.",
    images: [
      {
        url: "https://wallet.usezero.xyz/og/home.png",
        secureUrl: "https://wallet.usezero.xyz/og/home.png",
        alt: "ZeroWallet - Unlock the Omni-Chain Future",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  alternates: {
    canonical: "https://wallet.usezero.xyz/",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZeroWallet - Unlock the Omni-Chain Future",
    description:
      "ZeroWallet, powered by LayerZero, simplifies multi-chain management. Track your portfolio of tokens, positions, and NFTs, invest in yield-generating vaults, and bridge assets across chains. With passkey login via account abstraction, onboarding Web3 users is seamless. Transfer OFTs across supported chains easily.",
    creator: "@ZeroWallet",
    images: ["https://wallet.usezero.xyz/og/home.png"],
  },
  robots: {
    index: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en">
      <body className={mulish.className + " bg-gradient"}>
        <div className=" text-white max-w-screen-2xl mx-auto">
          <div className=" flex flex-col items-center justify-center w-full">
            <Web3ModalProvider initialState={initialState}>
              <LoginProvider>{children}</LoginProvider>
            </Web3ModalProvider>
          </div>
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
