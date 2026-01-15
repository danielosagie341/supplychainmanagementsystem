import mongoose, { Schema } from "mongoose";
import { Iproduct } from "../types/interfaces/product.inter";

const productSchema = new Schema<Iproduct>({
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	name: {
		type: String,
	},
	description: {
		type: String,
	},
	category: {
		type: String,

	},
	price: {
		type: Number,
	},
	unit: {
		type: String,
		default: '',
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	  },
});


const Product = mongoose.model<Iproduct>('Product', productSchema)

export default Product;