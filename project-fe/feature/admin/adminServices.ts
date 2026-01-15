import axiosInstance from "@/utils/api";
import { ENDPOINT_URLS } from "@/utils/endpoints";
import { ISignupModal } from "../auth/type";
import { IUser } from "@/model/user.model";

// Get All Users
export const getAllUsersServices = async (): Promise<IUser[]> => {
  const response = await axiosInstance.get<IUser[]>(
    ENDPOINT_URLS.admin["get-all-users"]
  );
  return response.data || response;
};

// Get All Orders (Admin)
export const getAllAdminOrdersServices = async (): Promise<any> => {
  const response = await axiosInstance.get<any>(
    ENDPOINT_URLS.admin["get-all-orders"]
  );
  return response.data || response;
};

// Create User
export const createUserServices = async (data: ISignupModal): Promise<any> => {
  const response = await axiosInstance.post<any>(
    ENDPOINT_URLS.admin["create-user"],
    data
  );
  return response.data || response;
};

// Get One User
export const getOneUserServices = async (userId: string): Promise<IUser> => {
  const response = await axiosInstance.get<IUser>(
    ENDPOINT_URLS.admin["get-one-user"](userId)
  );
  return response.data || response;
};

// Delete User
export const deleteUserServices = async (userId: string): Promise<any> => {
  const response = await axiosInstance.delete<any>(
    ENDPOINT_URLS.admin["delete-user"](userId)
  );
  return response.data || response;
};

// Update User
export const updateUserServices = async (
  data: Partial<ISignupModal>,
  userId: string
): Promise<any> => {
  const response = await axiosInstance.patch<any>(
    ENDPOINT_URLS.admin["update-user"](userId),
    data
  );
  return response.data || response;
};

// Get All Products (Admin)
export const getAllAdminProductsServices = async (): Promise<any> => {
  const response = await axiosInstance.get<any>(
    ENDPOINT_URLS.products["get-all"]
  );
  return response.data || response;
};