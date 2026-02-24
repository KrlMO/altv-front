export async function apiFetch<T>(
    endpoint: string,
    options?: RequestInit,
    accessToken?: string
): Promise<T> {
    const API_URL = process.env.NEXT_PUBLIC_API_URL!;

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options?.headers as Record<string, string> || {}),
    };

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
        const error = new Error(data?.message || "API error") as any;
        error.status = response.status;
        throw error;
    }

    return data as T;
}