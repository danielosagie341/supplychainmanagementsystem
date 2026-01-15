"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown, Loader } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropDownMenu";
import { Checkbox } from "@/components/ui/Checkbox";
import { useDeleteOrderMutation } from "@/hooks/orders.hook";
import { ICreateOrderModal } from "@/feature/order/types";

export const columns: ColumnDef<ICreateOrderModal>[] = [
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
    id: "productName",
    header: "Product Name",
    cell: ({ row }) => {
      const order = row.original;
      console.log("🔍 DEBUG - Product Name Cell - order:", order);
      console.log("🔍 DEBUG - Product Name Cell - products:", order.products);
      
      if (!order.products || !Array.isArray(order.products) || order.products.length === 0) {
        return <div className="text-gray-500">No products</div>;
      }
      
      // If single product, show the product name
      if (order.products.length === 1) {
        const product = order.products[0];
        console.log("🔍 DEBUG - Single product:", product);
        const productName = (product.productId as any)?.name || `Product ID: ${product.productId}`;
        return <div>{productName}</div>;
      }
      
      // If multiple products, show count
      return <div>{order.products.length} items</div>;
    },
  },
  {
    id: "quantity",
    header: "Total Quantity",
    cell: ({ row }) => {
      const order = row.original;
      console.log("🔍 DEBUG - Quantity Cell - order:", order);
      
      if (!order.products || !Array.isArray(order.products) || order.products.length === 0) {
        return <div className="text-gray-500">0</div>;
      }
      
      const totalQuantity = order.products.reduce((sum: number, product: any) => {
        const quantity = Number(product.quantity) || 0;
        console.log("🔍 DEBUG - Product quantity:", quantity, "Type:", typeof product.quantity);
        return sum + quantity;
      }, 0);
      
      console.log("🔍 DEBUG - Total quantity calculated:", totalQuantity);
      return <div>{totalQuantity}</div>;
    },
  },
  {
    id: "totalPrice",
    header: "Total Price",
    cell: ({ row }) => {
      const order = row.original;
      console.log("🔍 DEBUG - Total Price Cell - order:", order);
      
      if (!order.products || !Array.isArray(order.products) || order.products.length === 0) {
        return <div className="text-gray-500">₦0.00</div>;
      }
      
      const totalPrice = order.products.reduce((sum: number, product: any) => {
        const quantity = Number(product.quantity) || 0;
        const unitPrice = Number(product.unitPrice) || 0;
        console.log("🔍 DEBUG - Price calc - quantity:", quantity, "unitPrice:", unitPrice, "product:", product);
        return sum + (quantity * unitPrice);
      }, 0);
      
      console.log("🔍 DEBUG - Total price calculated:", totalPrice);
      
      if (isNaN(totalPrice) || totalPrice === 0) {
        return <div className="text-red-500">₦0.00</div>;
      }
      
      const formatted = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(totalPrice);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      const deleteOrderMutation = useDeleteOrderMutation();

      return (
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
              <Link href={`/dashboard/orders/view-order?order=${order._id}`}>
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button type="button" onClick={() => deleteOrderMutation.mutate(order._id)}>
                Delete
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
