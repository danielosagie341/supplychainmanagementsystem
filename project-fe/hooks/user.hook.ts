"use client";

import { logout, setUser } from "@/feature/auth/authSlice";
import {
  deleteUserServices,
  getUserServices,
  udpateUserServices,
} from "@/feature/user/userServices";
import { useAppDispatch } from "@/store";
import { _successPromt } from "@/utils/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["useGetUser"],
    queryFn: async () => {
      const data = await getUserServices();
      console.log(data, "getUserServices");
      return data;
    },
    retry: false,
  });
};

export const useUpdateUserMutation = () => {
  // const queryClient = useQueryClient();
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (values: any) => udpateUserServices(values),
    onMutate: () => {
      console.log("Creating...");
    },
    onSuccess: (data, values) => {
      console.log(data, "data product upppppppp");
      _successPromt("Updated ", 3000);

      dispatch(setUser(data));
      // dispatch(setAuthentication());
      // queryClient.setQueryData(["user"], data);
    },
    onError: (error: any) => {
      console.log(error.response?.data?.error || error.message);
    },
  });
};

export const useDeleteUserMutation = () => {
  // const queryClient = useQueryClient();
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: () => deleteUserServices(),
    onMutate: () => {
      console.log("Deleteing...");
    },
    onSuccess: (data, values) => {
      console.log(data, "data product upppppppp");
      _successPromt("Deleted Successfully ", 3000);

      dispatch(logout());
      localStorage.removeItem("token-key");
      router.push("/login");
      // dispatch(setAuthentication());
      // queryClient.setQueryData(["user"], data);
    },
    onError: (error: any) => {
      console.log(error.response?.data?.error || error.message);
    },
  });
};
