import mongoose, { Document, Schema } from "mongoose";

export interface Iblockchain extends Document{
	_user:  Schema.Types.ObjectId | string;
	hash: String,
	type: String,
	refId: String,
	data: {
		name?: string;
		category?: string;
		productId?: string;
		location?: string;
		quantity?: number;
	  };
	createdAt: Date,
	lastUpdated: Date
  }
