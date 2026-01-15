"use client";

// hooks/useSignupMutation.ts
import {
  loginService,
  signupService,
  verifyOtpServices,
} from "@/feature/auth/authServices";
import { setAuthentication, setUser } from "@/feature/auth/authSlice";
import { ILoginModal, IOtpModal, ISignupModal } from "@/feature/auth/type";
import { useAppDispatch } from "@/store";
import { _errorPromt, _successPromt } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useSignupMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (values: ISignupModal) => signupService(values),
    onMutate: () => {
      console.log("Signing up...");
    },
    onSuccess: (data, values) => {
      console.log(data.user, "data sign upppppppp");
      const user = data.user;
      _successPromt(
        "Successfully Signup",
        3000,
        `Check your email ${user.email} for your otp ${user.otp.code}`
      );
      router.push(`/verify-user?email=${user.email}`);
      // Optionally update cache or redirect user
      // queryClient.setQueryData(["user"], data);
      dispatch(setUser(user));
    },
    onError: (error: any) => {
      console.log(error.response?.data?.error || error.message);
    },
  });
};

export const useVerfiyOtpMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationKey: ["verify"],
    mutationFn: (values: IOtpModal) => verifyOtpServices(values),
    onMutate: () => {
      console.log("Signing up...");
    },
    onSuccess: (data, values) => {
      // const user = data.user;
      // _successPromt(
      //   "Successfully Signup",
      //   3000,
      //   `Check your email ${user.email} for your otp ${user.otp.code}`
      // );
      router.push(`/dashboard/product`);
      dispatch(setAuthentication());

      // Optionally update cache or redirect user
      // queryClient.setQueryData(["user"], data);
    },
    onError: (error: any) => {
      _errorPromt("Verification Failed", 3000, error.response?.data?.error);
      console.log(error.response?.data?.error || error.message);
    },
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (values: ILoginModal) => loginService(values),
    onMutate: () => {
      console.log("Signing up...");
    },
    onSuccess: (data, values) => {
      console.log(data.user, "data Login upppppppp");
      const user = data.user;
      // _successPromt(
      //   "Successfully Signup",
      //   3000,
      //   `Check your email ${user.email} for your otp ${user.otp.code}`
      // );
      // router.push(`/verify-user?email=${user.email}`);
      // Optionally update cache or redirect user
      router.push(`/dashboard/product`);
      dispatch(setUser(user));
      dispatch(setAuthentication());
      // queryClient.setQueryData(["user"], data);
    },
    onError: (error: any) => {
      console.log(error.response?.data?.error || error.message);
      if (
        error.response?.data?.error ===
        "Please verify your email and try again."
      ) {
      }
    },
  });
};
