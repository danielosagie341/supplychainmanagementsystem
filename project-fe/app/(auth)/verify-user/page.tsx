"use client";

import * as React from "react";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Page from "@/app/(auth)/create-account/page";
import InputField from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { useVerfiyOtpMutation } from "@/hooks/auth.hook";
function VerifyUser() {
  const [value, setValue] = React.useState("");
  const router = useRouter();
  const verifyOtpMutation = useVerfiyOtpMutation();

  const handleSubmit = () => {
    verifyOtpMutation.mutate({
      otpCode: value,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg flex-col p-8 shadow-lg w-11/12 sm:w-9/12 md:w-8/12 lg:w-6/12 xl:w-1/2">
        <div className="text-start font-bold text-2xl text-green-500 mb-4">
          Verify Your Account
        </div>
        <div className="space-y-2  ">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup className={"mx-auto"}>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <div className="text-center text-sm">
            {value === "" ? (
              <>Enter your one-time password.</>
            ) : (
              <>You entered: {value}</>
            )}
          </div>
        </div>
        <div className="w-full mt-4">
          <button
            disabled={value.length < 6}
            className="w-full px-8 py-2 rounded-md bg-green-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-green-200"
            // onClick={()=>router.push('/dashboard')}
            onClick={handleSubmit}
          >
            {verifyOtpMutation.isPending ? "Verifying...." : "Verify"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyUser;
