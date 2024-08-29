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
  title: "ZeroWallet - Your Universal Crypto Wallet",
  description:
    "ZeroWallet is a LayerZero-powered crypto wallet that lets you manage gas fees on one chain while accessing dApps across all chains.",
  openGraph: {
    title: "ZeroWallet - Your Universal Crypto Wallet",
    url: "https://zerowallet-app.vercel.app/",
    description:
      "ZeroWallet is a LayerZero-powered crypto wallet that lets you manage gas fees on one chain while accessing dApps across all chains.",
    images: [
      {
        url: "https://zerowallet-app.vercel.app/og/home.png",
        secureUrl: "https://zerowallet-app.vercel.app/og/home.png",
        alt: "ZeroWallet - Your Universal Crypto Wallet",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  alternates: {
    canonical: "https://zerowallet-app.vercel.app/",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZeroWallet - Your Universal Crypto Wallet",
    description:
      "ZeroWallet is a LayerZero-powered crypto wallet that lets you manage gas fees on one chain while accessing dApps across all chains.",
    creator: "@ZeroWallet",
    images: ["https://zerowallet-app.vercel.app/og/home.png"],
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
        <div className="bg-gradient text-white max-w-screen-2xl mx-auto">
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
