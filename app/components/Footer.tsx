import Image from "next/image";

export default function Footer() {
  return (
    <footer className=" bottom-0 left-0 md:flex items-center justify-center w-full text-sm md:text-base text-center text-white">
      <div className="flex flex-row flex-wrap items-center justify-center w-full gap-2 pb-3">
        Made with 🤍 at ETHOnline 2024 - Powered by{" "}
        <Image
          src="/layerzero/LayerZero logo.svg"
          alt="LayerZero Logo"
          className="shadow-md"
          width={"100"}
          height={"100"}
        />
      </div>
    </footer>
  );
}
