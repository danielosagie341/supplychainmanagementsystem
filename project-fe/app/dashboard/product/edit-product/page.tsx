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
import { useUpdateProductMutation } from "@/hooks/products.hook";
import { useSearchParams } from "next/navigation";

export default function AddProductPage() {
  const [restaurantImage, setRestaurantImage] = useState(null);
  const [ownerNIDFile, setOwnerNIDFile] = useState({ name: "yournid.pdf" });
  const [businessLicenseFile, setBusinessLicenseFile] = useState(null);
  const searchParams = useSearchParams();
  const productId = searchParams.get("product") ?? "";
  const updateProductMutation = useUpdateProductMutation(productId);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      unit: "",
    },
  });

  const onSubmit = (data: any) => {
    updateProductMutation.mutate(data);
  };

  const handleImageUpload = () => {
    // This would typically trigger a file input click
    document.getElementById("restaurantImageInput")?.click();
  };

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
            Edit Product
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Restaurant Image Upload */}
          <div className="mb-6">
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
                    onClick={handleImageUpload}
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
          </div>

          {/* Restaurant Name */}
          <InputField
            type="text"
            label="Product Name"
            isRequired={true}
            register={register("name", {
              required: "Product name is required",
            })}
            errorMessage={errors.name?.message}
            startIcon={<FiFileText />}
            placeholder="Sun valley restaurant"
          />

          <InputField
            type="text"
            label="Price"
            isRequired={true}
            register={register("price", {
              required: "Price is required",
            })}
            errorMessage={errors.price?.message}
            startIcon={<FiFileText />}
            placeholder="300"
          />

          <InputField
            type="text"
            label="Unit"
            isRequired={true}
            register={register("unit", {
              required: "Unit is required",
            })}
            errorMessage={errors.unit?.message}
            startIcon={<FiFileText />}
            placeholder="1"
          />

          {/*Description */}
          <InputField
            type="textarea"
            label="Description"
            isRequired={true}
            register={register("description", {
              required: "Description is required",
            })}
            errorMessage={errors.description?.message}
            startIcon={<FiMapPin />}
            placeholder="G. P. O., Asafoatse Nettey Road, Accra"
            rows={3}
          />

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors"
            >
              {updateProductMutation.isPending ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
