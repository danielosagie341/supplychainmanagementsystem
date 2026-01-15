import mongoose, { Schema } from "mongoose";
import { Iinventory } from "../types/interfaces/inventory.inter";

const InventorySchema = new Schema<Iinventory>({
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	_product: {
		type: Schema.Types.ObjectId,
		ref: 'Product',
	},
	quantity: {
		type: String,
	},
	location: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	lastUpdated: {
		type: Date,
		default: Date.now(),
	},
});


const Inventory = mongoose.model<Iinventory>('Inventory', InventorySchema)

export default Inventory;