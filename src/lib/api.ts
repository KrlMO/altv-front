import { ApiException } from "@/types/api";

export async function apiFetch<T>(
    endpoint: string,
    options?: RequestInit,
    accessToken?: string
): Promise<T> {

    const API_URL = process.env.NEXT_PUBLIC_API_URL!;

    const isFormData = options?.body instanceof FormData;

    const headers: Record<string, string> = {
        ...(options?.headers as Record<string, string> || {}),
    };

    if (!isFormData) {
        headers["Content-Type"] = "application/json";
    }

    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        credentials: "include",
        headers,
        ...options,
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new ApiException(
            data?.message || "API error",
            response.status,
            data?.code
        );
    }

    return data as T;
}