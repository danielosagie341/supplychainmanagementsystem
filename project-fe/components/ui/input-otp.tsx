"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function InputOTP({
                    className,
                    containerClassName,
                    ...props
                  }: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
      <OTPInput
          containerClassName={cn(
              "flex items-center gap-2",
              containerClassName
          )}
          className={cn("disabled:cursor-not-allowed", className)}
          {...props}
      />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
      <div
          className={cn("flex items-center gap-2", className)}
          {...props}
      />
  )
}

function InputOTPSlot({
                        index,
                        className,
                        ...props
                      }: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
      <div
          data-active={isActive ? true : undefined}
          className={cn(
              "relative flex h-12 w-12 items-center justify-center border text-lg rounded-md bg-white transition-all",
              "border-gray-200",
              isActive && "border-green-200 z-10 ring-2 ring-gray-300",
              className
          )}
          {...props}
      >
        {char}
        {hasFakeCaret && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-6 w-px animate-caret-blink bg-black duration-1000" />
            </div>
        )}
      </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
      <div
          role="separator"
          className="flex items-center text-gray-400"
          {...props}
      >
        <MinusIcon className="h-4 w-4" />
      </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }