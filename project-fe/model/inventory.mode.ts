import { IProductModal } from "./product.model";
import { IUser } from "./user.model";

export type InventoryModal = {
  _id: string;
  _user: IUser;
  _product: IProductModal;
  quantity: string;
  location: string;
  createdAt: string;
  lastUpdated: string;
  __v: 0;
};
