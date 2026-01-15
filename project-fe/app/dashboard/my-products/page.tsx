"use client";
import { DataTable } from "@/components/ui/DataTable";
import { useGetAllProductsBySupplier } from "@/hooks/products.hook";
import { columns } from "@/components/product/productColumn";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function MyProductsPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: products, isLoading } = useGetAllProductsBySupplier(user?.id, !!user);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 text-sm">Fetching your products...</p>
      </div>
    );
  }

  return (
    <div className=" items-center justify-items-center min-h-screen p-8 pb-20 ">
      <div className="container mx-auto py-10 px-4">
        <DataTable
          columns={columns}
          data={products || []}
          buttonTitle="Add New Product"
          route="/dashboard/product/add-product"
          title="My Products"
        />
      </div>
    </div>
  );
}
