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
import { useCreateProductMutation } from "@/hooks/products.hook";
import { ICreateProduct } from "@/feature/products/type";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function AddProductPage() {
  const [restaurantImage, setRestaurantImage] = useState(null);
  const [ownerNIDFile, setOwnerNIDFile] = useState({ name: "yournid.pdf" });
  const [businessLicenseFile, setBusinessLicenseFile] = useState(null);
  const { user } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ICreateProduct>({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: 0,
      unit: "bottle",
    },
  });
  const creatProductMutation = useCreateProductMutation(
    watch("location"),
    watch("quantity")
  );

  const onSubmit = (data: ICreateProduct) => {
    // Combine form data with files
    creatProductMutation.mutate(data);

    // console.log("Form submitted:", formData);
    // Here you would typically send this data to your API
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
            Add Product
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
            label="Product Name"
            isRequired={true}
            register={register("name", {
              required: "Product name is required",
            })}
            errorMessage={errors.name?.message}
            startIcon={<FiFileText />}
            placeholder="Rice"
          />

          <InputField
            type="text"
            label="Category"
            isRequired={true}
            register={register("category", {
              required: "Category is required",
            })}
            errorMessage={errors.category?.message}
            startIcon={<FiFileText />}
            placeholder="Rice..."
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

          {/*Description */}
          <InputField
            type="text"
            label="Price"
            isRequired={true}
            register={register("price", {
              required: "Price is required",
            })}
            errorMessage={errors.price?.message}
            startIcon={<FiMapPin />}
            placeholder="N2,000"
          />

          {user?.userType === "supplier" ? (
            <>
              <InputField
                type="text"
                label="Quantity"
                isRequired={true}
                register={register("quantity", {
                  required: "Quatity is required",
                })}
                errorMessage={errors.quantity?.message}
                startIcon={<FiMapPin />}
                placeholder="1"
              />

              <InputField
                type="text"
                label="Location"
                isRequired={true}
                register={register("location", {
                  required: "Location is required",
                })}
                errorMessage={errors.location?.message}
                startIcon={<FiMapPin />}
                placeholder="Area 1"
              />
            </>
          ) : null}

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors"
            >
              {creatProductMutation.isPending ? "Creating..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
