import { useMutation, UseMutationResult } from "@tanstack/react-query";
import api from "../services/api";
import { AxiosRequestConfig } from "axios";

interface UseMutationApiOptions<TData, TVariables> {
  url: string;
  method?: "post" | "put" | "patch" | "delete";
  config?: AxiosRequestConfig;
  onSuccess?: (data: TData) => void;
  onError?: (error: any) => void;
}

export const useMutationApi = <TData = any, TVariables = any>(
  options: UseMutationApiOptions<TData, TVariables>
): UseMutationResult<TData, any, TVariables, unknown> => {
  const { url, method = "post", config, onSuccess, onError } = options;

  return useMutation<TData, any, TVariables>({
    mutationFn: (variables: TVariables) =>
      api.request<TData>({ url, method, data: variables, ...config }).then(res => res.data),
    onSuccess,
    onError,
  });
};
