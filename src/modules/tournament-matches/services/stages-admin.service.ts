import { apiFetch } from "@/lib/api";
import { SuccessResponse } from "@/types/api";
import { CreateStagePayload, StageFormatDTO } from "../dto/stage.dto";

export async function createStage(
    accessToken: string,
    tournamentId: number,
    payload: CreateStagePayload
): Promise<number> {
    const response = await apiFetch<SuccessResponse<{ id: number }>>(
        `/v1/tournaments/${tournamentId}/stages`,
        {
            method: "POST",
            body: JSON.stringify({
                format_code: payload.format_code,
                name: payload.name,
                stage_order: payload.stage_order,
                config: payload.config,
            }),
        },
        accessToken
    );
    return response.data.id;
}

export async function fetchStageFormats(
    accessToken: string
): Promise<StageFormatDTO[]> {
    const response = await apiFetch<SuccessResponse<StageFormatDTO[]>>(
        "/v1/stage-formats",
        { method: "GET" },
        accessToken
    );
    return response.data;
}
