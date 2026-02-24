import { apiFetch } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";

export async function getMeRequest(accessToken?: string) {
    return apiFetch<ApiResponse<User>>("/v1/users/me",
        { method: "GET", }
        , accessToken
    );
}

