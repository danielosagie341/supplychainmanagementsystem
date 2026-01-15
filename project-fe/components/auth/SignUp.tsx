"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import InputField from "@/components/ui/Input";
import { useSignupMutation } from "@/hooks/auth.hook";
import { ISignupModal } from "@/feature/auth/type";

const SignUpForm = () => {
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ISignupModal>();
  const router = useRouter();
  const signupMutation = useSignupMutation();

  const userTypeOptions = [
    { value: "admin", label: "Administrator" },
    { value: "consumer", label: "Consumer" },
    { value: "supplier", label: "Supplier" },
  ];

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const onSubmit = async (data: ISignupModal) => {
    signupMutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg flex-col p-8 shadow-lg w-11/12 sm:w-9/12 md:w-8/12 lg:w-6/12 xl:w-1/2">
        <div className="text-start font-bold text-2xl text-green-500 mb-4">
          Sign Up
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            isRequired
            type="text"
            label="First Name"
            placeholder="david"
            register={register("firstname", {
              required: "First Name is required",
            })}
            errorMessage={errors.firstname?.message as string}
          />
          <InputField
            isRequired
            type="text"
            label="Last Name"
            placeholder="david"
            register={register("lastname", {
              required: "Last Name is required",
            })}
            errorMessage={errors.lastname?.message as string}
          />

          <InputField
            isRequired
            type="email"
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
            errorMessage={errors.password?.message as string}
          />

          <InputField
            isRequired
            type="select"
            label="User Type"
            placeholder="Select your user type"
            register={register("userType", {
              required: "User type is required",
            })}
            options={userTypeOptions}
            errorMessage={errors.userType?.message as string}
          />

          <InputField
            isRequired
            type="select"
            label="Gender "
            placeholder="Select your Gender"
            register={register("gender", {
              required: "Gender is required",
            })}
            options={genderOptions}
            errorMessage={errors.gender?.message as string}
          />

          <div className="w-full mt-4">
            <button
              type="submit"
              disabled={signupMutation.isPending}
              className="w-full px-8 py-2 rounded-md bg-green-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-green-200"
            >
              {signupMutation.isPending ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        <div className="w-full text-gray-500 flex items-center gap-2 mt-2">
          <p>Already have an account?</p>
          <Link href="/login" className="text-green-500 font-bold">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
