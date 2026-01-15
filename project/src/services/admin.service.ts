import User from "../models/user.model";
import Order from "../models/order.model";
import { Iuser } from "../types/interfaces/user.inter";

export default class AdminService{
    static async getAll(): Promise<Iuser[]>{
        const users =  await User.find()
        .populate("product")
        .populate("order")
        .populate("inventory")
        return users
    }

    static async getAllOrders(): Promise<any[]>{
        console.log('🔍 DEBUG - AdminService.getAllOrders called');
        const orders = await Order.find()
        .populate("_orderedBy")
        .populate({
            path: "products.productId",
            model: "Product"
        })
        .sort({ createdAt: -1 });
        
        console.log('🔍 DEBUG - Admin service found orders count:', orders.length);
        console.log('🔍 DEBUG - Admin orders data:', JSON.stringify(orders, null, 2));
        
        return orders;
    }

    static async getOne(userId: string): Promise<Iuser | null>{
        const user = await User.findById(userId)
        .populate("product")
        .populate("order")
        .populate("inventory")
        return user
    }

    static async createUser(id: string, data: Iuser): Promise<Iuser | null> {
        const user = await User.findById(id);

        if (!user) {
          return null;
        }

        const newUser = await User.create({
          ...data,
          isActive: true,
          _user: id,
        });

        await newUser.save();

        return newUser;
    }

    static async updateUser(id: string, data: Iuser): Promise<Iuser | null> {
        const updatedUser = await User.findByIdAndUpdate(id, data,{new: true});
        return updatedUser;
    }

    static async deleteUser(id: string): Promise<Iuser | null> {
        const deletedUser = await User.findByIdAndDelete(id, {new: true});
        return deletedUser;
    }
}