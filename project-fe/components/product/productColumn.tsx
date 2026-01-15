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
import { IProductModal } from "@/model/product.model";
import {
  useDeleteInventoryMutation,
  useDeleteProductMutation,
} from "@/hooks/products.hook";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export type Payment = {
  _id: string;
  location?: string;
  //   Price;
  price: number;
  status: "pending" | "processing" | "success" | "failed";
  name: string;
  category: string;
  _product?: IProductModal;
};

export const columns: ColumnDef<Payment>[] = [
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
  //   {
  //     accessorKey: "status",
  //     header: "Status",
  //   },

  {
    accessorKey: "name",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product name
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      );
    },
    cell: ({ row }) => {
      const payment = row.original;

      const name = payment?.name || payment?._product?.name;

      return <div className="text-left font-medium">{name}</div>;
    },
  },
  {
    accessorKey: "category",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          {/* <ArrowUpDown className="ml-2 h-4 w-4 " /> */}
        </Button>
      );
    },
    cell: ({ row }) => {
      const payment = row.original;

      const Category = payment?.category || payment?._product?.category;

      return <div className="text-left font-medium">{Category}</div>;
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const payment = row.original;

      const amount = payment?.price || payment?._product?.price;

      console.log({ amount }, { payment });

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NGN",
      }).format(amount as number);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    // header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const payment = row.original;
      const deleteInventoryMutation = useDeleteInventoryMutation();
      const deleteProductMutation = useDeleteProductMutation();
      const { user } = useSelector((state: RootState) => state.auth);

      console.log({ payment });

      const handleDelete = () => {
        if (payment.location) {
          deleteInventoryMutation.mutate(payment?._id);
        } else {
          deleteProductMutation.mutate(payment._id);
        }
      };

      const canPerformActions = user?.userType === "admin";

      return (
        <div className="relative ">
          {deleteProductMutation.isPending ? (
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
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
                    href={`/dashboard/product/view-product?product=${
                      payment._product?._id || payment?._id
                    }`}
                  >
                    View
                  </Link>
                </DropdownMenuItem>
                {canPerformActions && (
                  <>
                    <DropdownMenuItem>
                      {" "}
                      <Link
                        href={`/dashboard/product/edit-product?product=${
                          payment._product?._id || payment?._id
                        }`}
                      >
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button type="button" onClick={handleDelete}>
                        Delete
                      </button>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      );
    },
  },
];
