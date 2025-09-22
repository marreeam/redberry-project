import { useMutationApi } from "@/hook/useMutationApi";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import api from "./api";

export interface LoginData {
    email: string;
    password: string;
  }
  
  export const useLogin = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    return useMutationApi<LoginData, LoginData>({
      url: "/login",
      method: "post",
      onSuccess,
      onError,
    });
  };
  


  export interface RegisterData {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    avatar?: File;
  }
  
  export const useRegister = (
    onSuccess?: (data: any) => void,
    onError?: (error: any) => void
  ): UseMutationResult<any, any, RegisterData, unknown> => {
    const mutation = useMutation<any, any, RegisterData>({
      mutationFn: async (data: RegisterData) => {
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("password_confirmation", data.password_confirmation);
  
        if (data.avatar) formData.append("avatar", data.avatar);
  
        const res = await api.post("/register", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data;
      },
      onSuccess,
      onError,
    });
  
    return mutation as UseMutationResult<any, any, RegisterData, unknown>;
  };
  
