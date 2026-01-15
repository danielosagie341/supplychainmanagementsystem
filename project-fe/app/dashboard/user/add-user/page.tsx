"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FiUpload,
  FiCalendar,
  FiMapPin,
  FiPhone,
  FiUser,
  FiFileText,
  FiClock,
} from "react-icons/fi";
import InputField from "@/components/ui/Input"; // Adjust path as needed
import { ISignupModal } from "@/feature/auth/type";
import { useCreateUserMutation } from "@/hooks/admin.hook";

export default function AddUserPage() {
  const [restaurantImage, setRestaurantImage] = useState(null);
  const [ownerNIDFile, setOwnerNIDFile] = useState({ name: "yournid.pdf" });
  const [businessLicenseFile, setBusinessLicenseFile] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ISignupModal>({
    defaultValues: {
      email: "",
      firstname: "",
      gender: "",
      lastname: "",
      password: "",
      userType: "",
    },
  });

  const createUserMutation = useCreateUserMutation();

  const workingPeriodOptions = [
    { value: "9:00 AM - 10:00 PM", label: "9:00 AM - 10:00 PM" },
    { value: "8:00 AM - 9:00 PM", label: "8:00 AM - 9:00 PM" },
    { value: "10:00 AM - 11:00 PM", label: "10:00 AM - 11:00 PM" },
    { value: "24 hours", label: "24 hours" },
  ];

  const paymentOptions = [
    { value: "Cash in hand", label: "Cash in hand" },
    { value: "Bank transfer", label: "Bank transfer" },
    { value: "Credit card", label: "Credit card" },
    { value: "Mobile payment", label: "Mobile payment" },
  ];

  const onSubmit = (data: ISignupModal) => {
    createUserMutation.mutate(data);
    // Here you would typically send this data to your API
  };

  // const handleImageUpload = () => {
  //     // This would typically trigger a file input click
  //     document.getElementById("restaurantImageInput").click();
  // };

  // const handleFileChange = (e:any, setterFunction:any) => {
  //     if (e.target.files && e.target.files[0]) {
  //         setterFunction(e.target.files[0]);
  //     }
  // };

  // const removeImage = () => {
  //     setRestaurantImage(null);
  // };

  const userTypeOptions = [
    { value: "distributor", label: "Distributor" },
    { value: "admin", label: "Administrator" },
    { value: "consumer", label: "Consumer" },
    { value: "supplier", label: "Supplier" },
  ];

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  return (
    <div className={"py-20 container mx-auto px-4"}>
      <div className="  p-6 bg-white rounded-lg">
        <div className="mb-8">
          <h1 className="text-2xl  flex items-center text-gray-500 font-bold">
            <div className="w-1 h-8 bg-green-500 mr-3"></div>
            Add Users
          </h1>
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
              disabled={createUserMutation.isPending}
              className="w-full px-8 py-2 rounded-md bg-green-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-green-200"
            >
              {createUserMutation.isPending ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
