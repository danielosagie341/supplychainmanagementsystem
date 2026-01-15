import axiosInstance from "@/utils/api";
import { ENDPOINT_URLS } from "@/utils/endpoints";
import { ILoginModal, IOtpModal, ISignupModal } from "./type";
import { IUser } from "@/model/user.model";

type SignupRes = {
  user: IUser;
};
// Sign up
export const signupService = async (
  credentials: ISignupModal
): Promise<SignupRes> => {
  const response = await axiosInstance.post<SignupRes>(
    ENDPOINT_URLS.auth.signup,
    credentials
  );
  console.log({ response }, response.data, "ffffff");
  localStorage.setItem("token-key", response?.token);
  return response.data || response;
};

// Sign up
export const verifyOtpServices = async (
  credentials: IOtpModal
): Promise<any> => {
  const response = await axiosInstance.post<any>(
    ENDPOINT_URLS.auth.verify,
    credentials
  );
  return response.data || response;
};

// Login
export const loginService = async (credentials: ILoginModal): Promise<any> => {
  const response = await axiosInstance.post<any>(
    ENDPOINT_URLS.auth.login,
    credentials
  );
  console.log({ response }, response.data, "login");
  localStorage.setItem("token-key", response?.token);
  return response.data || response;
};
