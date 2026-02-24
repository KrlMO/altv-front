import { apiFetch } from "@/lib/api";
import { LoginDTO, LoginResponseDTO } from "../dto/login.dto";
import { ApiResponse } from "@/types/api";

export async function loginRequest(data: LoginDTO) {
  return apiFetch<ApiResponse<LoginResponseDTO>>("/v1/auth/login/local", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function registerRequest(data: any) {
  debugger
  return apiFetch("/v1/users/register/local", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function refreshRequest() {
  return apiFetch<ApiResponse<LoginResponseDTO>>("/v1/auth/refresh", {
    method: "POST",
  });
}

export async function logoutRequest() {
  return apiFetch("/v1/auth/logout", {
    method: "POST",
  });
}