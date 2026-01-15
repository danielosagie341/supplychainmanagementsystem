import mongoose, { Document, Schema } from "mongoose";

export interface Iproduct extends Document{
	_user:  Schema.Types.ObjectId | string;
	name: String,
	description: String,
	category: String,
	price: Number,
	unit: String,
	createdAt: Date,
	updatedAt: Date
  }

