import { Iorder } from "../types/interfaces/order.inter";
import Order from "../models/order.model";
import User from "../models/user.model";

export default class OrderService {

  static async getAllOrders(userId: string): Promise<Iorder[]> {
    console.log('🔍 DEBUG - OrderService.getAllOrders called with userId:', userId);
    const orders = await Order.find({ _orderedBy: userId })
      .populate("_orderedBy")
      .populate({
        path: "products.productId",
        model: "Product"
      });
    
    console.log('🔍 DEBUG - Found orders count:', orders.length);
    console.log('🔍 DEBUG - Orders data:', JSON.stringify(orders, null, 2));
    
    return orders;
  }

  static async createOrder(userId: string, data: Iorder): Promise<Iorder | null> {
    console.log('🔍 DEBUG - OrderService.createOrder called with userId:', userId);
    console.log('🔍 DEBUG - Order data:', JSON.stringify(data, null, 2));
    
    const user = await User.findById(userId);
    
    const newOrder = await Order.create({
      ...data,
      _orderedBy: userId,
    });

    await newOrder.save();
    
    console.log('🔍 DEBUG - Order created successfully:', JSON.stringify(newOrder, null, 2));

    user.order.push(newOrder.id)
    await user.save()
    
    return newOrder;
  }

  static async getOrderById(id: string): Promise<Iorder | null> {
    console.log('🔍 DEBUG - OrderService.getOrderById called with id:', id);
    const order = await Order.findById(id)
      .populate("_orderedBy")
      .populate({
        path: "products.productId",
        model: "Product"
      });
    
    console.log('🔍 DEBUG - OrderService.getOrderById result:', order);
    return order;
  }

  static async updateOrder(id: string, data: Partial<Iorder>): Promise<Iorder | null> {
    return Order.findByIdAndUpdate(id, data, { new: true })
      .populate("_orderedBy")
      .populate({
        path: "products.productId",
        model: "Product"
      });
  }

  static async deleteOrder(id: string): Promise<Iorder | null> {
    return Order.findByIdAndDelete(id);
  }

}