import { apiFetch } from "@/lib/api";
import { SuccessResponse } from "@/types/api";
import { User } from "@/types/user";

export async function getMeRequest(accessToken?: string) {
    return apiFetch<SuccessResponse<User>>("/v1/users/me",
        { method: "GET", }
        , accessToken
    );
}

