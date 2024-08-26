import Image from "next/image";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 justify-center items-center min-h-screen text-center">
      <div className="flex flex-col gap-4 items-center max-w-lg">
        <Image src={"/logo.svg"} alt="Zero Logo" width={280} height={280} />
        <p className="px-1.5 mt-2 text-lg text-accent">
          ZeroWallet powered by LayerZero, you{"'"}ll never need to bridge to
          access dApps across all chains effortlessly.
        </p>
      </div>
      <div className="border border-accent p-4 w-full max-w-sm">
        Wallet Connect
      </div>
      <Footer />
    </div>
  );
}
