import axiosInstance from "@/utils/api";
import { ENDPOINT_URLS } from "@/utils/endpoints";

export const getUserServices = async (): Promise<any> => {
  const response = await axiosInstance.get<any>(ENDPOINT_URLS.user["get-user"]);
  return response.data || response;
};

// create Product
export const udpateUserServices = async (field: any): Promise<any> => {
  const response = await axiosInstance.put<any>(
    ENDPOINT_URLS.user["update-user"],
    field
  );
  return response.data || response;
};

// create Product
export const deleteUserServices = async (): Promise<any> => {
  const response = await axiosInstance.delete<any>(
    ENDPOINT_URLS.user["delete-user"]
  );
  return response.data || response;
};
