import { LoginFormData } from "@/app/(auth)/sign-in";
import { RegisterFormData } from "@/app/(auth)/sign-up";
import { useMutation } from "@tanstack/react-query";
import api from "../api";

function useSignUp() {
  return useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const response = await api.post("/auth/register", data);
      return response.data.data;
    },
  });
}

function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await api.post("/auth/login", data);
      return response.data.data;
    },
  });
}

export { useLogin, useSignUp };
