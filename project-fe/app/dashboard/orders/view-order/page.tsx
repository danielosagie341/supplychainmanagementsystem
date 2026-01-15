"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGetOneOrdersQuery, useUpdateOrderMutation } from "@/hooks/orders.hook";
import { Button } from "@/components/ui/Button";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { ArrowLeft, Package, User, CreditCard, MapPin, FileText, Calendar, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ViewOrderPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || searchParams.get("order");
  const router = useRouter();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  
  const updateOrderMutation = useUpdateOrderMutation();

  console.log("🔍 DEBUG - ViewOrderPage orderId:", orderId);
  console.log("🔍 DEBUG - ViewOrderPage all params:", searchParams.toString());

  const {
    data: order,
    isLoading,
    error,
  } = useGetOneOrdersQuery(orderId as string);

  console.log("🔍 DEBUG - ViewOrderPage order data:", order);
  console.log("🔍 DEBUG - ViewOrderPage loading:", isLoading);
  console.log("🔍 DEBUG - ViewOrderPage error:", error);
  console.log("🔍 DEBUG - ViewOrderPage order exists:", !!order);
  console.log("🔍 DEBUG - ViewOrderPage order type:", typeof order);
  console.log("🔍 DEBUG - ViewOrderPage order keys:", order ? Object.keys(order) : 'no keys');

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 text-sm">Loading order details...</p>
      </div>
    );
  }

  if (error) {
    console.log("🔍 DEBUG - Error occurred:", error);
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <p className="text-red-600 text-lg">Error loading order</p>
        <p className="text-sm text-gray-600">Order ID: {orderId}</p>
        <p className="text-sm text-gray-600">Error: {JSON.stringify(error)}</p>
        <Button onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  if (!order) {
    console.log("🔍 DEBUG - No order data received");
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <p className="text-red-600 text-lg">Order not found</p>
        <p className="text-sm text-gray-600">Order ID: {orderId}</p>
        <p className="text-sm text-gray-600">Loading: {isLoading ? 'true' : 'false'}</p>
        <Button onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  const totalPrice = order.products?.reduce((sum: number, product: any) => {
    const quantity = Number(product.quantity) || 0;
    const unitPrice = Number(product.unitPrice) || 0;
    return sum + (quantity * unitPrice);
  }, 0) || 0;

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
      case "declined":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleMarkAsDelivered = () => {
    updateOrderMutation.mutate(
      {
        data: { status: "delivered" },
        productId: orderId as string,
      },
      {
        onSuccess: () => {
          setIsConfirmModalOpen(false);
          // Refresh the data
          window.location.reload();
        },
        onError: (error) => {
          console.error("Error updating order:", error);
          setIsConfirmModalOpen(false);
        },
      }
    );
  };

  return (
    <div className="py-20 container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => router.back()}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Order #{order._id.slice(-6).toUpperCase()}
              </h1>
              <p className="text-gray-600">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {order.status?.toLowerCase() !== "delivered" && (
              <Button
                onClick={() => setIsConfirmModalOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center"
                disabled={updateOrderMutation.isPending}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as Delivered
              </Button>
            )}
            <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
              {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Products */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Package className="h-5 w-5 text-gray-600 mr-2" />
                <h2 className="text-xl font-semibold">Order Items</h2>
              </div>
              <div className="space-y-4">
                {order.products?.map((product: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">
                        {product.productId?.name || `Product ID: ${product.productId}`}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Quantity: {product.quantity} × ₦{Number(product.unitPrice).toLocaleString()}
                      </p>
                      {product.productId?.description && (
                        <p className="text-sm text-gray-500">{product.productId.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ₦{(Number(product.quantity) * Number(product.unitPrice)).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total</span>
                    <span>₦{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            {order.note && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <FileText className="h-5 w-5 text-gray-600 mr-2" />
                  <h2 className="text-xl font-semibold">Order Notes</h2>
                </div>
                <p className="text-gray-700">{order.note}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <User className="h-5 w-5 text-gray-600 mr-2" />
                <h2 className="text-xl font-semibold">Customer</h2>
              </div>
              <div className="space-y-2">
                <p className="font-medium">
                  {order._orderedBy?.firstname} {order._orderedBy?.lastname}
                </p>
                <p className="text-gray-600">{order._orderedBy?.email}</p>
                <p className="text-sm text-gray-500 capitalize">{order._orderedBy?.userType}</p>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-gray-600 mr-2" />
                <h2 className="text-xl font-semibold">Delivery</h2>
              </div>
              <p className="text-gray-700">{order.deliveryAddress || "No delivery address provided"}</p>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <CreditCard className="h-5 w-5 text-gray-600 mr-2" />
                <h2 className="text-xl font-semibold">Payment</h2>
              </div>
              <div className="space-y-2">
                <p className="font-medium capitalize">{order.paymentMethod || "Not specified"}</p>
                <p className="text-2xl font-bold text-green-600">₦{totalPrice.toLocaleString()}</p>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 text-gray-600 mr-2" />
                <h2 className="text-xl font-semibold">Timeline</h2>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ordered</span>
                  <span className="text-sm">{new Date(order.createdAt).toLocaleString()}</span>
                </div>
                {order.deliveryDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected Delivery</span>
                    <span className="text-sm">{new Date(order.deliveryDate).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleMarkAsDelivered}
          title="Mark Order as Delivered"
          message="Are you sure you want to mark this order as delivered? This action is irreversible and will permanently change the order status."
          confirmButtonText="Yes, Mark as Delivered"
          cancelButtonText="Cancel"
          isLoading={updateOrderMutation.isPending}
        />
      </div>
    </div>
  );
}