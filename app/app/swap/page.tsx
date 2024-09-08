"use client";
import BlurIn from "@/components/magicui/blur-in";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleArrowUp } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Swap() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 border border-accent w-full h-full text-center">
      <BlurIn word="Coming Soon" className="text-7xl !font-black text-accent" />
    </div>
  );
}
