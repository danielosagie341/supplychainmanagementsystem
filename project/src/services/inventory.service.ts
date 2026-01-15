import Product from "../models/product.model";
import User from "../models/user.model";
import Inventory from "../models/inventory.model";
import { Iinventory } from "../types/interfaces/inventory.inter";

export default class InventoryService {

    static async getAll(userId: string): Promise<Iinventory[]> {
        const inventory = await Inventory.find({ _user: userId })
        .populate('_user')
		.populate('_product')
        return inventory;
    }

    static async getInventoryById(id: string): Promise<Iinventory | null> {
        const inventory = await Inventory.findById(id)
        .populate('_user')
		.populate('_product')
        return inventory;
    }

    static async addInventoryItem(userId: string, data: Iinventory): Promise<Iinventory | null> {
        const user = await User.findById(userId);

        if (!user) {
          return null;
        }

        const newInventory = await Inventory.create({
          ...data,
          _user: userId,
        });

        await newInventory.save();

        user.inventory.push(newInventory.id)

         await user.save()
        return newInventory;
      }

    static async updateInventory(id: string, data: Iinventory): Promise<Iinventory | null> {
        const updatedInventory = await Inventory.findByIdAndUpdate(id, data,{new: true});
        return updatedInventory;
    }

    static async deleteInventory(id: string): Promise<Iinventory | null> {
        const deletedInventory = await Inventory.findByIdAndDelete(id, {new: true});
        return deletedInventory;
    }
}