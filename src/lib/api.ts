export async function apiFetch<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const API_URL = process.env.NEXT_PUBLIC_API_URL!;

    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options?.headers || {}),
        },
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
