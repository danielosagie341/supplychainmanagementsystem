"use client";
import { User, columns, columnsUsers } from "@/components/user/UserColumn";
import { DataTable } from "@/components/ui/DataTable";
import { useGetAllOrders } from "@/hooks/orders.hook";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useGetAllUsersQuery } from "@/hooks/admin.hook";

// async function getData(): Promise<User[]> {
//   return [
//     {
//       id: "728ed52f",
//       email: "m@example.com",
//       name: "david oluwatayo",
//     },

//     {
//       id: "728d52f",

//       email: "a@example.com",
//       name: "esther julius",
//     },
//     {
//       id: "728ed2f",

//       email: "r@example.com",
//       name: "mathew james",
//     },
//     {
//       id: "728ed52",

//       email: "m@example.com",
//       name: "isiah king",
//     },
//     {
//       id: "728e2f",

//       email: "m@example.com",
//       name: "david oluwatayo",
//     },
//     {
//       id: "7282f",

//       email: "m@example.com",
//       name: "daniel john",
//     },
//   ];
// }

export default function DemoPage() {
  // const data = await getData();
  const { user } = useSelector((state: RootState) => state.auth);

  const { data, isLoading, error } = useGetAllOrders(
    user?.userType !== "admin"
  );
  const { data: allUsersData, isLoading: loadingUser } = useGetAllUsersQuery(
    user?.userType === "admin"
  );

  if (isLoading || loadingUser) {
    return (
  <div className="flex flex-col items-center justify-center h-screen space-y-4">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-gray-600 text-sm">Fetching your dashboard...</p>
  </div>
);

  }
  // console.log(error?.response?.data?.error, "jjjjjjj");

  // if (error) {
  //   return <p>Failed to Fetch</p>;
  // }

  const buttonTitle =
    user?.userType === "consumer"
      ? "Place an order"
      : user?.userType === "supplier"
      ? "Add Product"
      : "Add user";
  const route =
    user?.userType === "consumer"
      ? "/dashboard/product"
      : user?.userType === "supplier"
      ? "/dashboard/product/add-product"
      : "/dashboard/user/add-user";
  const Data = user?.userType === "admin" ? allUsersData || [] : data || [];
  return (
    <div className="container mx-auto py-10 px-4">
      <DataTable
        columns={user?.userType === "admin" ? columnsUsers : columns}
        data={Data}
        buttonTitle={buttonTitle}
        route={route}
        title={user?.userType === "consumer" ? "Your Orders" : "Users"}
      />
    </div>
  );
}
