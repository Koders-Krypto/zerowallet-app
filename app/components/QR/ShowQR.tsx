import Truncate from "@/app/utils/truncate";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QrCode } from "lucide-react";
import QRCode from "react-qr-code";

export default function GenerateQR(props: any) {
  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogTrigger asChild>
        <QrCode size={18} />
      </DialogTrigger>
      <DialogContent className="bg-black dark:bg-white flex flex-col justify-start items-start gap-6 w-full mx-auto border border-accent ">
        <DialogHeader>
          <div className="flex flex-row justify-start items-center gap-3">
            <div className="flex flex-col justify-start items-start text-left">
              <DialogTitle>
                <h3 className="text-base text-white">Scan QR Code</h3>
              </DialogTitle>
              <DialogDescription className="text-xs text-accent dark:text-accent w-full">
                You can recieve assets from other wallets by scanning the QR
                code.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center gap-4 w-full">
          <div className="bg-transparent">
            <QRCode value={props.address} size={192} />
          </div>
          <div className="flex flex-col justify-center items-center gap-1 w-full">
            <p className="text-white text-sm">
              {Truncate(props.address, 20, "...")}
            </p>
            <p className="text-white text-sm">{props.ensname}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
