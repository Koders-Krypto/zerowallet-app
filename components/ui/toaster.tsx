"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircleIcon, X } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        success,
        description,
        action,
        ...props
      }) {
        return (
          <Toast
            className="px-6 py-4 flex flex-row justify-start items-center gap-4"
            key={id}
            {...props}
          >
            {success ? (
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
            ) : (
              <X className="w-6 h-6 text-red-500" />
            )}
            <div className="flex flex-col justify-start items-start gap-1 ml-0">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
