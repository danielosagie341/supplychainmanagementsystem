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
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useUpdateUserMutation } from "@/hooks/admin.hook";
import { useSearchParams } from "next/navigation";

export default function AddUserPage() {
  const [restaurantImage, setRestaurantImage] = useState(null);
  const [ownerNIDFile, setOwnerNIDFile] = useState({ name: "yournid.pdf" });
  const [businessLicenseFile, setBusinessLicenseFile] = useState(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Partial<ISignupModal>>({
    defaultValues: {
      firstname: user?.firstname,
      gender: user?.gender,
      lastname: user?.lastname,
      //   userType: user?.userType,
      //   email: user?.email,
    },
  });
  const searcParams = useSearchParams();
  const userId = searcParams.get("userId");
  const updateUserMutation = useUpdateUserMutation();

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const userTypeOptions = [
    { value: "distributor", label: "Distributor" },
    { value: "admin", label: "Administrator" },
    { value: "consumer", label: "Consumer" },
    { value: "supplier", label: "Supplier" },
  ];

  const onSubmit = (data: Partial<ISignupModal>) => {
    // Combine form data with files

    console.log({ data });
    updateUserMutation.mutate({
      data,
      userId: userId as string,
    });
    // Here you would typically send this data to your API
  };

  // const handleImageUpload = () => {
  //     // This would typically trigger a file input click
  //     document.getElementById("restaurantImageInput").click();
  // };

  const handleFileChange = (e: any, setterFunction: any) => {
    if (e.target.files && e.target.files[0]) {
      setterFunction(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setRestaurantImage(null);
  };

  return (
    <div className={"py-20 container mx-auto px-4"}>
      <div className="  p-6 bg-white rounded-lg">
        <div className="mb-8">
          <h1 className="text-2xl  flex items-center text-gray-500 font-bold">
            <div className="w-1 h-8 bg-green-500 mr-3"></div>
            Edit User
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Restaurant Image Upload */}
          {/* <div className="mb-6">
                    <div className="border-2 border-dashed border-green-200 rounded-md p-6 text-center">
                        {restaurantImage ? (
                            <div className="flex justify-center">
                                <img
                                    src={URL.createObjectURL(restaurantImage)}
                                    alt="Restaurant preview"
                                    className="max-h-40 object-contain"
                                />
                            </div>
                        ) : (
                            <div className="flex justify-center items-center h-32">
                                <button
                                    type="button"
                                    onClick={() => document.getElementById("restaurantImageInput").click()}
                                    className="text-green-500 flex items-center"
                                >
                                    <FiUpload className="mr-2" />
                                    Add Photo
                                </button>
                            </div>
                        )}
                        <input
                            id="restaurantImageInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, setRestaurantImage)}
                        />
                    </div>

                    <div className="flex mt-4 gap-3">
                        <button
                            type="button"
                            onClick={handleImageUpload}
                            className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center"
                        >
                            <FiUpload className="mr-2" />
                            User Image
                        </button>

                        {restaurantImage && (
                            <button
                                type="button"
                                onClick={removeImage}
                                className="px-4 py-2 border border-gray-300 rounded-md"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                </div> */}

          {/* Restaurant Name */}
          <InputField
            type="text"
            label="First Name"
            isRequired={true}
            register={register("firstname", {
              required: "First Name is required",
            })}
            errorMessage={errors.firstname?.message}
            startIcon={<FiFileText />}
            placeholder="John"
          />

          {/* Representative Name */}
          <InputField
            type="text"
            label="Last Name"
            isRequired={true}
            register={register("lastname", {
              required: "First Name is required",
            })}
            errorMessage={errors.lastname?.message}
            startIcon={<FiFileText />}
            placeholder="Doe"
          />

          {/* Representative Name */}
          <InputField
            type="email"
            label="Email"
            disabled
            errorMessage={errors.email?.message}
            startIcon={<FiFileText />}
            placeholder="johndoe@gmail.com"
          />

          {/* Established Date, Working Period, and Payment Method in a row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Working Period */}
            <InputField
              type="select"
              label="Gender"
              isRequired={true}
              // register={register("gender", {
              //     required: "Gender is required"
              // })}
              options={genderOptions}
              errorMessage={errors.gender?.message}
              startIcon={<FiClock />}
              control={control}
            />

            {/* Large Payment Method */}
            <InputField
              type="select"
              label="User Type"
              // isRequired={true}
              // register={register("userType", {
              //     required: "UserType is required"
              // })}
              options={userTypeOptions}
              errorMessage={errors.userType?.message}
              control={control}
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors"
            >
              {updateUserMutation?.isPending ? "Editing..." : "Edit User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
