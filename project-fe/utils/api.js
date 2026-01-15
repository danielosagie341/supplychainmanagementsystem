import axios from "axios";
// import { _getToken } from "./store";
// import EventEmitter from "eventemitter3";
// import { _errorPrompt } from "./core";

// export const authEvents = new EventEmitter();
const axiosInstance = axios.create({
  // baseURL: "https://00f6-102-91-77-189.ngrok-free.app/v1",
  baseURL: "http://localhost:5050/api/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // withCredentials: true,
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
});
// console.log(process.env.EXPO_PUBLIC_BASE_URL, "url");
axiosInstance.interceptors.request.use(
  async (request) => {
    request.headers.Accept = "application/json";
    request.headers["Content-Type"] = "application/json";
    const token = localStorage.getItem("token-key");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    // const cookies = await CookieManager.get(
    //   "https://gloss-care-production.up.railway.app"
    // );
    // console.log("Cookies before request:", cookies);

    console.log("request sentt");
    console.log(request?.baseURL + request.url, "location endpoint");
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Got response");
    return response.data;
  },
  (error) => {
    console.log(error);
    if (error.response?.status === 401) {
      console.log("Unauthorized! Emitting logout event...");
      //   _errorPrompt("Unauthorized!", "Logging User out", 2500);
      //   authEvents.emit("logout"); // Emit a logout event
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
