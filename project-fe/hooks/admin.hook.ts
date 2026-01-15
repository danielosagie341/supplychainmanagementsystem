"use client";
import {
  createUserServices,
  deleteUserServices,
  getAllAdminOrdersServices,
  getAllAdminProductsServices,
  getAllUsersServices,
  getOneUserServices,
  updateUserServices,
} from "@/feature/admin/adminServices";
import { ISignupModal } from "@/feature/auth/type";
import { _errorPromt, _successPromt } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useGetAllUsersQuery = (enabled: boolean = false) => {
  return useQuery({
    queryKey: ["useGetAllUsersQuery"],
    queryFn: async () => {
      const data = await getAllUsersServices();
      console.log(data, "getAllUsersServices");
      return data;
    },
    enabled,
    retry: false,
  });
};

export const useCreateUserMutation = () => {
  // const queryClient = useQueryClient();
  const router = useRouter();
  // const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (values: ISignupModal) => createUserServices(values),
    onMutate: () => {
      console.log("Creating...");
    },
    onSuccess: (data, values) => {
      console.log(data, "create user");
      _successPromt("User Created", 3000);
      router.push("/dashboard");
    },
    onError: (error: any) => {
      console.log(error.response?.data?.error || error.message);
    },
  });
};

export const useGetOneUsersQuery = (userId: string) => {
  return useQuery({
    queryKey: ["useGetOneUsersQuery", userId],
    queryFn: async () => {
      const data = await getOneUserServices(userId);
      console.log(data, "getOneUserServices");
      return data;
    },
    enabled: !!userId,
    retry: false,
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  // const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (userId: string) => deleteUserServices(userId),
    onMutate: () => {
      console.log("Deleting...");
    },
    onSuccess: (data, values) => {
      console.log(data, "User Deleted");
      _successPromt("User Deleted", 3000);

      queryClient.invalidateQueries({
        queryKey: ["useGetAllUsersQuery"],
      });
    },
    onError: (error: any) => {
      console.log(error.response?.data?.error || error.message);
    },
  });
};

export const useUpdateUserMutation = () => {
  // const queryClient = useQueryClient();
  const router = useRouter();
  // const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: string;
      data: Partial<ISignupModal>;
    }) => updateUserServices(data, userId),
    onMutate: () => {
      console.log("Updating...");
    },
    onSuccess: (data, values) => {
      console.log(data, "User Updated");
      _successPromt("User Updated", 3000);

      router.push("/dashboard");
    },
    onError: (error: any) => {
      console.log(error.response?.data?.error || error.message);
      _errorPromt(error.response?.data?.error, 3000);
    },
  });
};

export const useGetAllAdminOrdersQuery = (enabled: boolean = false) => {
  return useQuery({
    queryKey: ["useGetAllAdminOrdersQuery"],
    queryFn: async () => {
      const data = await getAllAdminOrdersServices();
      console.log("🔍 DEBUG - getAllAdminOrdersServices raw data:", data);
      console.log("🔍 DEBUG - Is array?", Array.isArray(data));
      console.log("🔍 DEBUG - Data length:", data?.length);
      if (data && data.length > 0) {
        console.log("🔍 DEBUG - First admin order sample:", data[0]);
        console.log("🔍 DEBUG - First admin order products:", data[0]?.products);
      }
      return data;
    },
    enabled,
    retry: false,
  });
};

export const useGetAllAdminProductsQuery = (enabled: boolean = false) => {
  return useQuery({
    queryKey: ["useGetAllAdminProductsQuery"],
    queryFn: async () => {
      const data = await getAllAdminProductsServices();
      console.log(data, "getAllAdminProductsServices");
      return data;
    },
    enabled,
    retry: false,
  });
};
