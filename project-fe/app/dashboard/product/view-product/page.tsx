"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Logo from "@/public/globe.svg";
import { useSearchParams } from "next/navigation";
import { useOneSingleProduct } from "@/hooks/products.hook";
import InputField from "@/components/ui/Input";
import { FiFileText } from "react-icons/fi";
import { useCreateOrderMutation } from "@/hooks/orders.hook";
import { ICreateOrderModal } from "@/feature/order/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function AddUserPage() {
  const [restaurantImage, setRestaurantImage] = useState(null);
  const [ownerNIDFile, setOwnerNIDFile] = useState({ name: "yournid.pdf" });
  const [businessLicenseFile, setBusinessLicenseFile] = useState(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");

  const {
    data: SingleProduct,
    isLoading,
    error,
  } = useOneSingleProduct(productId as string);
  const createOrderMutation = useCreateOrderMutation();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ICreateOrderModal>({
    defaultValues: {
      paymentMethod: "",
      deliveryAddress: "",
      note: "",
      products: [
        {
          productId: productId as string,
          quantity: 1,
          unitPrice: SingleProduct?.price || 0,
        },
      ],
      status: "pending",
    },
  });

  // Watch for quantity changes to recalculate
  const watchedQuantity = watch("products.0.quantity");

  const workingPeriodOptions = [
    { value: "9:00 AM - 10:00 PM", label: "9:00 AM - 10:00 PM" },
    { value: "8:00 AM - 9:00 PM", label: "8:00 AM - 9:00 PM" },
    { value: "10:00 AM - 11:00 PM", label: "10:00 AM - 11:00 PM" },
    { value: "24 hours", label: "24 hours" },
  ];

  const paymentOptions = [
    { value: "Cash in hand", label: "Cash in hand" },
    { value: "Bank transfer", label: "Bank Transfer" },
    { value: "Credit card", label: "Credit card" },
    { value: "Mobile payment", label: "Mobile payment" },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 text-sm">Fetching your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return <p>Unable to fetch product</p>;
  }

  const onSubmit = (data: ICreateOrderModal) => {
    // Ensure unitPrice is set correctly
    const orderData: ICreateOrderModal = {
      ...data,
      products: [
        {
          productId: productId as string,
          quantity: data.products[0].quantity,
          unitPrice: SingleProduct?.price || 0,
        }
      ] as [{ productId: string; quantity: number; unitPrice: number; }]
    };
    createOrderMutation.mutate(orderData);
    console.log(orderData);
  };

  const totalPrice = (SingleProduct ? SingleProduct.price : 0) * watchedQuantity;

  return (
    <div className={"py-20 container mx-auto px-4"}>
      <div className="p-6 bg-white rounded-lg">
        <div className="mb-8">
          <h1 className="text-2xl flex items-center text-gray-500 font-bold">
            <div className="w-1 h-8 bg-green-500 mr-3"></div>
            Product Details
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={"flex flex-col gap-4 justify-center"}
        >
          <div className={"text-center"}>
            <h2 className={"font-bold text-2xl"}>{SingleProduct?.name}</h2>
          </div>

          <div>
            <div className={"text-start mb-4"}>
              <p className={"text-gray-400 text-md"}>Product name</p>
              <p className={"text-lg font-bold"}>{SingleProduct?.name}</p>
            </div>

            <hr />

            <div className={"text-start mb-4"}>
              <p className={"text-gray-400 text-md"}>Unit Price</p>
              <p className={"text-lg font-bold"}>
                ₦{SingleProduct?.price?.toLocaleString()}
              </p>
            </div>

            <hr />

            <div className={"text-start mb-4"}>
              <p className={"text-gray-400 text-md"}>Description</p>
              <p className={"text-lg font-bold"}>
                {SingleProduct?.description}
              </p>
            </div>

            <hr />

            <div className={"text-start mb-4"}>
              <p className={"text-gray-400 text-md"}>Category</p>
              <p className={"text-lg font-bold"}>{SingleProduct?.category}</p>
            </div>

            <hr />

            <InputField
              isRequired
              type="select"
              label="Payment Method"
              placeholder="Select your Payment Method"
              register={register("paymentMethod", {
                required: "Payment Method is required",
              })}
              options={paymentOptions}
              errorMessage={errors.paymentMethod?.message as string}
            />
            <br />
            <hr />

            <InputField
              type="text"
              label="Delivery Address"
              isRequired={true}
              register={register("deliveryAddress", {
                required: "Delivery Address is required",
              })}
              errorMessage={errors.deliveryAddress?.message}
              startIcon={<FiFileText />}
              placeholder="Enter delivery address..."
            />
            <br />
            <hr />
            <InputField
              type="text"
              label="Note"
              isRequired={false}
              register={register("note")}
              errorMessage={errors.note?.message}
              startIcon={<FiFileText />}
              placeholder="Any special instructions..."
            />
            <br />
            <hr />
            
            <InputField
              type="number"
              label="Quantity"
              isRequired={true}
              register={register("products.0.quantity", {
                required: "Quantity is required",
                min: { value: 1, message: "Quantity must be at least 1" }
              })}
              errorMessage={errors?.products?.[0]?.quantity?.message}
              startIcon={<FiFileText />}
              placeholder="1"
            />

            <div className={"text-start mb-4"}>
              <p className={"text-gray-400 text-md"}>Total Price</p>
              <p className={"text-lg font-bold text-green-600"}>
                ₦{totalPrice.toLocaleString()}
              </p>
            </div>
          </div>

          <Button
            type="submit"
            className={"bg-green-500 py-2 px-10 text-white mx-auto"}
            disabled={createOrderMutation.isPending}
          >
            {createOrderMutation.isPending ? "Ordering...." : "Make An Order"}
          </Button>
        </form>
      </div>
    </div>
  );
}