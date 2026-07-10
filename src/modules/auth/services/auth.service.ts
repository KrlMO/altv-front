import { apiFetch } from "@/lib/api";
import { LoginDTO, LoginResponseDTO } from "../dto/login.dto";
import { VerifyEmailResponseDTO } from "../dto/verifyEmail.dto";
import { SuccessResponse } from "@/types/api";
import { RegisterRequestDTO } from "../dto/register.dto";

export async function loginRequest(data: LoginDTO) {
  return apiFetch<SuccessResponse<LoginResponseDTO>>("/v1/auth/login/local", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function registerRequest(data: RegisterRequestDTO) {
  return apiFetch("/v1/auth/register/local", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function refreshRequest() {
  return apiFetch<SuccessResponse<LoginResponseDTO>>("/v1/auth/refresh", {
    method: "POST",
  });
}

export async function logoutRequest() {
  return apiFetch("/v1/auth/logout", {
    method: "POST",
  });
}

export async function checkEmailVerificationRequest(email: string) {
  return apiFetch<SuccessResponse<VerifyEmailResponseDTO>>("/v1/auth/verify-email-verification", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function resendVerificationRequest(email: string) {
  return apiFetch("/v1/auth/resend-verification", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}