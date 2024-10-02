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
  title: "Brewit Wallet - Personal Barista for Your Crypto Journey",
  description:
    "Brewit Wallet - Personal Barista for Your Crypto Journey",
  openGraph: {
    title: "Brewit Wallet - Personal Barista for Your Crypto Journey",
    url: "https://wallet.usezero.xyz/",
    description:
      "Brewit Wallet - Personal Barista for Your Crypto Journey",
    images: [
      {
        url: "https://wallet.usezero.xyz/og/home.png",
        secureUrl: "https://wallet.usezero.xyz/og/home.png",
        alt: "Brewit Wallet - Personal Barista for Your Crypto Journey",
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
    title: "Brewit Wallet - Personal Barista for Your Crypto Journey",
    description:
      "Brewit Wallet - Personal Barista for Your Crypto Journey",
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
