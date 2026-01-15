"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown, Loader } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropDownMenu";
import { Checkbox } from "@/components/ui/Checkbox";
import { IUser } from "@/model/user.model";
import { useOneSingleProduct } from "@/hooks/products.hook";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useDeleteUserMutation } from "@/hooks/admin.hook";
import {
  useDeleteOrderMutation,
  useUpdateOrderMutation,
} from "@/hooks/orders.hook";

export type User = {
  _id: string;
  name: string;
  lastname: string;
  firstname: string;
  userType: string;
  email: string;
  status: string;
  _orderedBy: IUser;
  products: {
    productId: string;
    quantity: string;
    unitPrice: string;
    _id: string;
  }[];
  paymentMethod: string;
  deliveryAddress: string;
  note: string;
  createdAt: string;
};

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "orderNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order #
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="font-medium">
          #{order._id.slice(-6).toUpperCase()}
        </div>
      );
    },
  },

  {
    accessorKey: "products",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Items
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.original;
      const totalItems = order?.products?.length || 0;
      const totalQuantity = order?.products?.reduce((sum, product) => 
        sum + (Number(product.quantity) || 0), 0
      ) || 0;

      return (
        <div>
          <div className="font-medium">{totalItems} item(s)</div>
          <div className="text-sm text-gray-500">Qty: {totalQuantity}</div>
        </div>
      );
    },
  },

  {
    accessorKey: "totalPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.original;
      console.log("🔍 DEBUG - Order data in column:", order);
      console.log("🔍 DEBUG - Products in column:", order?.products);
      
      const totalPrice = order?.products?.reduce((sum, product) => {
        const quantity = Number(product.quantity) || 0;
        const unitPrice = Number(product.unitPrice) || 0;
        console.log("🔍 DEBUG - Processing product:", product);
        console.log("🔍 DEBUG - Quantity:", quantity, "UnitPrice:", unitPrice);
        const subtotal = quantity * unitPrice;
        console.log("🔍 DEBUG - Subtotal:", subtotal);
        return sum + subtotal;
      }, 0) || 0;

      console.log("🔍 DEBUG - Final Total Price:", totalPrice);

      if (totalPrice === 0 || isNaN(totalPrice)) {
        console.log("🔍 DEBUG - Total price is 0 or NaN, showing debug info");
        console.log("🔍 DEBUG - Order structure:", JSON.stringify(order, null, 2));
      }

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NGN",
      }).format(totalPrice);

      console.log("🔍 DEBUG - Formatted price:", formatted);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },

  {
    accessorKey: "paymentMethod",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Payment Method
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="capitalize">
          {order?.paymentMethod || "Not specified"}
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.original;
      const status = order?.status || "pending";
      
      const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
          case "approved":
            return "bg-green-100 text-green-800";
          case "pending":
            return "bg-yellow-100 text-yellow-800";
          case "shipped":
            return "bg-blue-100 text-blue-800";
          case "delivered":
            return "bg-green-100 text-green-800";
          case "cancelled":
          case "declined":
            return "bg-red-100 text-red-800";
          default:
            return "bg-gray-100 text-gray-800";
        }
      };

      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order Date
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.original;
      const date = new Date(order.createdAt);
      return (
        <div>
          <div className="font-medium">{date.toLocaleDateString()}</div>
          <div className="text-sm text-gray-500">{date.toLocaleTimeString()}</div>
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      const { user } = useSelector((state: RootState) => state.auth);
      const deleteOrderMutation = useDeleteOrderMutation();
      const updateOrderMutation = useUpdateOrderMutation();

      console.log("🔍 DEBUG - Actions column order:", order);
      console.log("🔍 DEBUG - Actions column order._id:", order._id);

      return (
        <div className="relative">
          {deleteOrderMutation.isPending || updateOrderMutation.isPending ? (
            <Loader />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <button
                    onClick={() => {
                      console.log("🔍 DEBUG - View button clicked, order._id:", order._id);
                      const url = `/dashboard/orders/view-order?orderId=${order._id}`;
                      console.log("🔍 DEBUG - Navigating to URL:", url);
                      window.location.href = url;
                    }}
                  >
                    View Details
                  </button>
                </DropdownMenuItem>
                {user?.userType !== "consumer" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <button
                        onClick={() =>
                          updateOrderMutation.mutate({
                            productId: order._id,
                            data: {
                              status: "approved",
                            },
                          })
                        }
                      >
                        Approve
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button
                        onClick={() =>
                          updateOrderMutation.mutate({
                            productId: order._id,
                            data: {
                              status: "declined",
                            },
                          })
                        }
                      >
                        Decline
                      </button>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button
                    onClick={() => deleteOrderMutation.mutate(order._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      );
    },
  },
];

// Keep the existing columnsUsers for admin users
export const columnsUsers: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const userRow = row.original;
      return (
        <div>
          {userRow?.firstname} {userRow?.lastname}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "userType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User Type
        </Button>
      );
    },
    cell: ({ row }) => {
      const userRow = row.original;
      return (
        <span className="capitalize">{userRow?.userType}</span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const userRow = row.original;
      const deletedUserAdminMutation = useDeleteUserMutation();

      return (
        <div className="relative">
          {deletedUserAdminMutation.isPending ? (
            <Loader />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href={`/dashboard/user/view-user?userId=${userRow?._id}`}>
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/dashboard/user/edit-user?userId=${userRow?._id}`}>
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={() => deletedUserAdminMutation.mutate(userRow._id)}
                  >
                    Delete
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      );
    },
  },
];