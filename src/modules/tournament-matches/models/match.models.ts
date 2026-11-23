export type StageFormat =
    | "SINGLE_ELIMINATION"
    | "DOUBLE_ELIMINATION"
    | "SWISS"
    | "GROUP_STAGE";

export type StageStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export interface Stage {
    id: number;
    tournamentId: number;
    format: StageFormat;
    formatName: string;
    name: string;
    order: number;
    status: StageStatus;
    config: Record<string, number>;
}

export type MatchStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "WALKOVER";

export interface TeamInfo {
    registrationId: number;
    teamName: string;
}

export interface Match {
    id: number;
    stageId: number;
    tournamentId: number;
    roundNumber: number;
    matchNumber: number;
    teamA?: TeamInfo;
    teamB?: TeamInfo;
    bestOf?: number;
    status: MatchStatus;
    scoreA?: number;
    scoreB?: number;
    winner?: TeamInfo;
    scheduledAt?: string;
}

export interface StandingsRow {
    registrationId: number;
    teamName: string;
    wins: number;
    losses: number;
    active: boolean;
}

export interface StageMatches {
    stage: Stage;
    matches: Match[];
}
