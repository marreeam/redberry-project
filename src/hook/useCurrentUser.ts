import { useQueryApi } from "@/hook/useQueryApi";

export const useCurrentUser = () => {
  return useQueryApi({
    url: "currentUser", 
    enabled: false,     
    initialData:
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("currentUser") || "null")
        : null,
  });
};
