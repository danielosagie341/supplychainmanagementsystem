"use client";
import { DataTable } from "@/components/ui/DataTable";
import {
  useGetAllProducts,
  useGetAllProductsBySupplier,
} from "@/hooks/products.hook";
import { columns as allProductsColumns } from "@/components/product/productColumn";
import { columns as myProductsColumns } from "@/components/product/myProductColumn";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function ProductPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  
  const { data: allProducts, isLoading: isLoadingAll, refetch: refetchAll } = useGetAllProducts(true);
  
  const { 
    data: myProducts, 
    isLoading: isLoadingMine, 
    refetch: refetchMine 
  } = useGetAllProductsBySupplier(
    user?._id || "", 
    user?.userType === "supplier"
  );

  console.log("Current user:", user);
  console.log("All products:", allProducts);
  console.log("My products:", myProducts);

  if (isLoadingAll || isLoadingMine) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 text-sm">Fetching products...</p>
      </div>
    );
  }

  const canAddProduct = user?.userType === "admin" || user?.userType === "supplier";

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20">
      <div className="container mx-auto py-10 px-4 space-y-10">
        {user?.userType === "supplier" && (
          <DataTable
            columns={myProductsColumns}
            data={myProducts || []}
            buttonTitle="Add New Product"
            route="/dashboard/product/add-product"
            title="My Products"
          />
        )}
        <DataTable
          columns={allProductsColumns}
          data={allProducts || []}
          buttonTitle={
            canAddProduct && user?.userType !== "supplier"
              ? "Add New Product"
              : ""
          }
          route={
            canAddProduct && user?.userType !== "supplier"
              ? "/dashboard/product/add-product"
              : ""
          }
          title="All Products"
        />
      </div>
    </div>
  );
}