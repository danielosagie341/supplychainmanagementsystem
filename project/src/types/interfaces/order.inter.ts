import mongoose, { Document, Schema } from "mongoose";

export interface Iorder extends Document{
    _orderedBy: Schema.Types.ObjectId | string;
    products: {
        productId: Schema.Types.ObjectId | string;
        quantity: number;
        unitPrice: number;
    }[];
    status: "pending" | "approved" | "shipped" | "delivered" | "cancelled";
    paymentMethod: string;
    deliveryAddress: string;
    deliveryDate?: Date;
    note?: string;
    createdAt: Date;
}