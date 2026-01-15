"use client";
import {
  createInventoryServices,
  createProductServices,
  deleteInventoryServices,
  deleteProductServices,
  getAllInventory,
  getAllProductServices,
  getAllProductsBySupplierServices,
  getOneProductServices,
  updateProductServices,
} from "@/feature/products/productsServices";
import { ICreateInventory, ICreateProduct, IUpdateProduct } from "@/feature/products/type";
import { _successPromt } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useGetAllProducts = (enabled: boolean = false) => {
  return useQuery({
    queryKey: ["useGetAllProducts"],
    queryFn: async () => {
      const data = await getAllProductServices();
      console.log("🎯 Frontend: Fetched all products", data?.length || 0);
      console.log("📋 Frontend: All products data:", data);
      return data;
    },
    enabled,
    retry: false,
    staleTime: 0, // Always consider data stale
    gcTime: 0, // Don't cache data
  });
};

export const useGetAllProductsBySupplier = (supplierId: string, enabled: boolean = false) => {
  return useQuery({
    queryKey: ["useGetAllProductsBySupplier", supplierId],
    queryFn: async () => {
      const data = await getAllProductsBySupplierServices(supplierId);
      console.log("🎯 Frontend: Fetched supplier products", data?.length || 0);
      console.log("📋 Frontend: Supplier products data:", data);
      return data;
    },
    enabled: enabled && !!supplierId,
    retry: false,
    staleTime: 0, // Always consider data stale
    gcTime: 0, // Don't cache data
  });
};

export const useUpdateProductMutation = (productId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (values: IUpdateProduct) =>
      updateProductServices(productId, values),
    onMutate: () => {
      console.log("Updating...");
    },
    onSuccess: (data, values) => {
      _successPromt("Product Updated", 3000);
      queryClient.invalidateQueries({
        queryKey: ["useGetAllProductsBySupplier", data._user],
      });
      queryClient.invalidateQueries({ queryKey: ["useGetAllProducts"] });
      router.push(`/dashboard/product`);
    },
    onError: (error: any) => {
      console.log(error.response?.data?.error || error.message);
    },
  });
};

export const useCreateInventoryMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (values: ICreateInventory) => createInventoryServices(values),
    onMutate: () => {
      console.log("Creating inventory...");
    },
    onSuccess: (data, values) => {
      console.log(data, "inventory created");
      _successPromt("Inventory Created", 3000);
      queryClient.invalidateQueries({ queryKey: ["useGetAllInventory"] });
      router.push(`/dashboard/product`);
    },
    onError: (error: any) => {
      console.log(error.response?.data?.error || error.message);
    },
  });
};

export const useCreateProductMutation = (
  location?: string,
  quantity?: string
) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const createInventory = useCreateInventoryMutation().mutateAsync;
  
  return useMutation({
    mutationFn: (values: ICreateProduct) => createProductServices(values),
    onMutate: () => {
      console.log("Creating product...");
    },
    onSuccess: async (data, values) => {
      console.log(data, "data product created successfully");
      
      // Create inventory if supplier provides location and quantity
      if (data && data._id && location && quantity) {
        try {
          await createInventory({
            _product: data._id,
            location,
            quantity,
          });
          console.log("Inventory created for product");
        } catch (inventoryError) {
          console.error("Inventory creation failed", inventoryError);
          // Continue with product creation success even if inventory fails
        }
      }

      _successPromt("Product Created", 3000);
      
      // Invalidate all relevant queries to refresh the UI
      queryClient.invalidateQueries({ queryKey: ["useGetAllProducts"] });
      queryClient.invalidateQueries({ 
        queryKey: ["useGetAllProductsBySupplier"] 
      });
      queryClient.invalidateQueries({ queryKey: ["useGetAllInventory"] });
      
      router.push(`/dashboard/product`);
    },
    onError: (error: any) => {
      console.log(error.response?.data?.error || error.message);
    },
  });
};

export const useOneSingleProduct = (productId: string) => {
  return useQuery({
    queryKey: ["useOneSingleProduct", productId],
    queryFn: async () => {
      const data = await getOneProductServices(productId);
      console.log(data, "getOneProductServices");
      return data;
    },
    enabled: !!productId,
    retry: false,
  });
};

export const useGetAllInventory = (enabled: boolean = false) => {
  return useQuery({
    queryKey: ["useGetAllInventory"],
    queryFn: async () => {
      const data = await getAllInventory();
      console.log(data, "getAllInventory");
      return data;
    },
    enabled,
    retry: false,
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (productId: string) => deleteProductServices(productId),
    onMutate: () => {
      console.log("Deleting product...");
    },
    onSuccess: (data, values) => {
      console.log(data, "product deleted successfully");
      _successPromt("Deleted Successfully", 3000);
      queryClient.invalidateQueries({ queryKey: ["useGetAllProducts"] });
      queryClient.invalidateQueries({ 
        queryKey: ["useGetAllProductsBySupplier"] 
      });
      queryClient.invalidateQueries({ queryKey: ["useGetAllInventory"] });
    },
    onError: (error: any) => {
      console.log(error.response?.data?.error || error.message);
    },
  });
};

export const useDeleteInventoryMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (inventoryId: string) => deleteInventoryServices(inventoryId),
    onMutate: () => {
      console.log("Deleting inventory...");
    },
    onSuccess: (data, values) => {
      console.log(data, "inventory deleted successfully");
      _successPromt("Deleted Successfully", 3000);
      queryClient.invalidateQueries({ queryKey: ["useGetAllInventory"] });
    },
    onError: (error: any) => {
      console.log(error.response?.data?.error || error.message);
    },
  });
};