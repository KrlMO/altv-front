// Raw shapes returned by the backend API (snake_case).

export interface StageDTO {
    id: number;
    tournament_id: number;
    format_code: string;
    format_name: string;
    name: string;
    stage_order: number;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    config: Record<string, number>;
    created_at: string;
    updated_at: string;
}

export interface TeamInfoDTO {
    registration_id: number;
    team_name: string;
}

export interface MatchDTO {
    id: number;
    stage_id: number;
    tournament_id: number;
    round_number: number;
    match_number: number;
    team_a?: TeamInfoDTO | null;
    team_b?: TeamInfoDTO | null;
    best_of?: number | null;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "WALKOVER";
    score_a?: number | null;
    score_b?: number | null;
    winner?: TeamInfoDTO | null;
    scheduled_at?: string | null;
}

export interface StandingsRowDTO {
    registration_id: number;
    team_name: string;
    wins: number;
    losses: number;
    active: boolean;
}
