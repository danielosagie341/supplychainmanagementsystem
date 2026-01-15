import axiosInstance from "@/utils/api";
import { ENDPOINT_URLS } from "@/utils/endpoints";
import { ICreateInventory, ICreateProduct, IUpdateProduct } from "./type";
import { IProductModal } from "@/model/product.model";
import { InventoryModal } from "@/model/inventory.mode";

// Get All Products
export const getAllProductServices = async (): Promise<any> => {
  const response = await axiosInstance.get<any>(
    ENDPOINT_URLS.products["get-all"]
  );
  return response.data || response;
};

// Get All Products by supplier
export const getAllProductsBySupplierServices = async (supplierId: string): Promise<any> => {
  const response = await axiosInstance.get<any>(
    ENDPOINT_URLS.products["get-all-by-supplier"](supplierId)
  );
  return response.data || response;
};

// create Product
export const createProductServices = async (
  field: ICreateProduct
): Promise<IProductModal> => {
  const response = await axiosInstance.post<IProductModal>(
    ENDPOINT_URLS.products["create-product"],
    field
  );
  return response.data || response;
};

// Get One Product
export const getOneProductServices = async (
  productId: string
): Promise<IProductModal> => {
  const response = await axiosInstance.get<IProductModal>(
    ENDPOINT_URLS.products["single-product"](productId)
  );
  return response.data || response;
};

// update Product
export const updateProductServices = async (
  productId: string,
  field: IUpdateProduct
): Promise<IProductModal> => {
  const response = await axiosInstance.patch<IProductModal>(
    ENDPOINT_URLS.products["update-product"](productId),
    field
  );
  return response.data || response;
};

// delete Product
export const deleteProductServices = async (
  productId: string
): Promise<IProductModal> => {
  const response = await axiosInstance.delete<IProductModal>(
    ENDPOINT_URLS.products["delete-product"](productId)
  );
  return response.data || response;
};

// Get All Inventory
export const getAllInventory = async (): Promise<any> => {
  const response = await axiosInstance.get<any>(
    ENDPOINT_URLS.products["get-inventory"]
  );
  return response.data || response;
};

// delete Inventory
export const deleteInventoryServices = async (
  inventoryId: string
): Promise<any> => {
  const response = await axiosInstance.delete<any>(
    ENDPOINT_URLS.products["delete-inventory"](inventoryId)
  );
  return response.data || response;
};

// create Inventory
export const createInventoryServices = async (
  field: ICreateInventory
): Promise<InventoryModal[]> => {
  const response = await axiosInstance.post<InventoryModal[]>(
    ENDPOINT_URLS.products["create-inventory"],
    field
  );
  return response.data || response;
};