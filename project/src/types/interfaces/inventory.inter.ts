import mongoose, { Document, Schema } from "mongoose";

export interface Iinventory extends Document{
	_user:  Schema.Types.ObjectId | string;
	_product:  Schema.Types.ObjectId | string;
	quantity: Number,
	location: String,
	createdAt: Date,
	lastUpdated: Date
  }

