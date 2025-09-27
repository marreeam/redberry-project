import { useMutationApi } from "@/hook/useMutationApi";
import { UseMutationResult } from "@tanstack/react-query";

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: { id: number; username: string; email: string; avatar?: string };
  token: string;
}

export const useLogin = (
  onSuccess?: (data: LoginResponse) => void,
  onError?: (error: any) => void
): UseMutationResult<LoginResponse, any, LoginData, unknown> => {
  return useMutationApi<LoginResponse, LoginData>({
    url: "/login",
    method: "post",
    onSuccess: (data) => {
      localStorage.setItem("currentUserToken", data.token);
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      if (data.user.avatar) localStorage.setItem("currentUserAvatar", data.user.avatar);

      if (onSuccess) onSuccess(data);
    },
    onError,
  });
};
