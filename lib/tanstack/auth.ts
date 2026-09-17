import { resetTokenFormData } from "@/app/(auth)/forgot-password";
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

function requestResetCode() {
  return useMutation({
    mutationFn: async (data: resetTokenFormData) => {
      const response = await api.post("/auth/forgot-password", data);
      return response.data;
    },
  });
}

function useValidateCode() {
  return useMutation({
    mutationFn: async ({ token, email }: { token: string; email: string }) => {
      const response = await api.post("/auth/validate-token", { token, email });
      return response.data;
    },
  });
}

function useChangePassword() {
  return useMutation({
    mutationFn: async ({ password }: { password: string }) => {
      const res = await api.patch(
        "/auth/reset-password",
        { password },
        { withCredentials: true },
      );
      return res.data;
    },
  });
}
export {
  requestResetCode,
  useChangePassword,
  useLogin,
  useSignUp,
  useValidateCode,
};
