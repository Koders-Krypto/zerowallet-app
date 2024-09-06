"use client";
import BlurIn from "@/components/magicui/blur-in";

export default function Swap() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 border border-accent w-full h-full text-center">
      <BlurIn word="Coming Soon" className="text-7xl !font-black text-accent" />
    </div>
  );
}
