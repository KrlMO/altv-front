import { apiFetch } from "@/lib/api";
import { LoginDTO, LoginResponseDTO } from "../dto/login.dto";

export async function loginRequest(data: LoginDTO) {
  return apiFetch<LoginResponseDTO>("/v1/auth/login/local", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function registerRequest(data: any) {
  return apiFetch("/v1/users/register/local", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function refreshRequest() {
  return apiFetch<LoginResponseDTO>("/v1/auth/refresh", {
    method: "POST",
  });
}

export async function logoutRequest() {
  return apiFetch("/v1/auth/logout", {
    method: "POST",
  });
}