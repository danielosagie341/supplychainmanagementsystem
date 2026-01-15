import mongoose, { Schema } from "mongoose";
import { Iblockchain } from "../types/interfaces/BlockchainLog.inter";

const BlockchainLogSchema = new Schema<Iblockchain>({
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	hash: {
		type: String,
	},
	type: {
		type: String,
	},
	refId: {
		type: String,
	},
	data: {
		type: Object,
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


const BlockchainLog = mongoose.model<Iblockchain>('BlockchainLog', BlockchainLogSchema)

export default BlockchainLog;