import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./styles/globals.css";

const roboto = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZeroWallet - Your Universal Crypto Wallet",
  description:
    "ZeroWallet is a LayerZero-powered crypto wallet that lets you manage gas fees on one chain while accessing dApps across all chains.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className + " bg-gradient text-white"}>
        {children}
      </body>
    </html>
  );
}
