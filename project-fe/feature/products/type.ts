export type ICreateProduct = {
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  location?: string;
  quantity?: string;
};

export type IUpdateProduct = {
  name?: string;
  description?: string;
  category?: string;
  price?: number;
  unit?: string;
};

export type ICreateInventory = {
  _product: string;
  quantity: string;
  location: string;
};