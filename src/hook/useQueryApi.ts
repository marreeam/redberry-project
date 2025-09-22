import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import api from "@/services/api";
import { AxiosRequestConfig } from "axios";

interface UseQueryApiOptions<TData> extends Omit<UseQueryOptions<TData, any, TData, [string]>, "queryKey" | "queryFn"> {
  url: string;
  config?: AxiosRequestConfig;
  enabled?: boolean;
}

export const useQueryApi = <TData = any>({
  url,
  config,
  enabled = true,
  ...options
}: UseQueryApiOptions<TData>) => {
  return useQuery<TData, any, TData, [string]>({
    queryKey: [url],
    queryFn: () => api.get<TData>(url, config).then(res => res.data),
    enabled,
    ...options,
  });
};
