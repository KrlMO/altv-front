import { apiFetch } from "@/lib/api";
import { SuccessResponse } from "@/types/api";
import { Region } from "../dto/region.dto";

export async function fetchRegions(): Promise<Region[]> {
    const response = await apiFetch<SuccessResponse<Region[]>>(
        "/v1/regions",
        { method: "GET" }
    );
    return response.data;
}
