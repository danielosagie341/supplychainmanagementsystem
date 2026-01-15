import mongoose, { Schema } from "mongoose";
import { Iorder } from "../types/interfaces/order.inter";

const orderSchema = new Schema<Iorder>({
    _orderedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    products: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
          },
          quantity: {
            type: Number,
            required: true
          },
          unitPrice: {
            type: Number,
            required: true
          }
        }
    ],
    status: {
        type: String,
        default: "pending"
    },
    paymentMethod: {
        type: String, // Fixed: was incorrectly structured as {supplier: String}
    },
    deliveryAddress: {
        type: String,
    },
    deliveryDate: {
        type: Date,
    },
    note: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model<Iorder>('Order', orderSchema)

export default Order;