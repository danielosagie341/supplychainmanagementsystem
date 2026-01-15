"use client";
import { DataTable } from "@/components/ui/DataTable";
import { useGetAllOrders } from "@/hooks/orders.hook";
import { columns } from "@/components/order/orderColumn";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function OrdersPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: orders, isLoading } = useGetAllOrders(!!user);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 text-sm">Fetching your orders...</p>
      </div>
    );
  }

  return (
    <div className=" items-center justify-items-center min-h-screen p-8 pb-20 ">
      <div className="container mx-auto py-10 px-4">
        <DataTable
          columns={columns}
          data={orders || []}
          buttonTitle="Create New Order"
          route="/dashboard/product"
          title="My Orders"
        />
      </div>
    </div>
  );
}
