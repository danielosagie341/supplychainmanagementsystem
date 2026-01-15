"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import InputField from "@/components/ui/Input";
import { ILoginModal } from "@/feature/auth/type";
import { useLoginMutation } from "@/hooks/auth.hook";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const loginMutation = useLoginMutation();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ILoginModal>();
  const router = useRouter();

  const onSubmit = async (data: ILoginModal) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg flex-col p-8 shadow-lg w-11/12 sm:w-9/12 md:w-8/12 lg:w-6/12 xl:w-1/2">
        <div className="text-start font-bold text-2xl text-green-500 mb-4">
          Sign In
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            isRequired
            type="text"
            label="Email"
            placeholder="example@email.com"
            register={register("email", {
              required: "Email is required",
            })}
            errorMessage={errors.email?.message as string}
          />

          <InputField
            isRequired
            type="password"
            label="Password"
            placeholder="******"
            register={register("password", {
              required: "Password is required",
            })}
            // isInvalid={!!errors.password}
            errorMessage={errors.password?.message as string}
          />

          <div className="w-full mt-4">
            <button className="w-full px-8 py-2 rounded-md bg-green-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-green-200">
              {loginMutation.isPending ? "Logging..." : "Login"}
            </button>
          </div>
        </form>
        <div className={" w-full text-gray-500 flex items-center gap-2"}>
          <p>Don't have have an account ?</p>
          <Link className={"text-green-500 font-bold"} href={"/create-account"}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
