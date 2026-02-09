import { apiFetch } from "@/lib/api";
import { LoginDTO, LoginResponseDTO } from "../dto/login.dto";

export function loginRequest(data: LoginDTO) {
  return apiFetch<LoginResponseDTO>("/v1/auth/login/local", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
