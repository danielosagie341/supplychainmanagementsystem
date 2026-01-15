import { ReactNode } from "react";
import { toast } from "sonner";

export const _successPromt = (
  message: string,
  duration: number | undefined,
  description?: ReactNode | (() => React.ReactNode)
) => {
  toast.success(message, {
    duration,
    richColors: true,
    description,
  });
};

export const _errorPromt = (
  message: string,
  duration: number | undefined,
  description?: ReactNode | (() => React.ReactNode)
) => {
  toast.error(message, {
    duration,
    richColors: true,
    description,
  });
};
