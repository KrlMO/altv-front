export type OrganizerType = "OFFICIAL" | "COMMUNITY" | "INDEPENDENT";

export type TournamentStatus = "active" | "upcoming" | "finished";

export type TournamentSortBy =
    | "start_date_asc"
    | "start_date_desc"
    | "name_asc"
    | "name_desc"
    | "newest";

export interface TournamentItem {
    id: number;
    name: string;
    logo?: string;
    gameId: number;
    gameName: string;
    organizerType?: OrganizerType;
    organization?: string;
    typeId?: number;
    typeName?: string;
    regionName?: string;
    regionISO?: string;
    countryName?: string;
    startAt: string;
    endAt?: string;
    status: string;
    createdAt: string;
}

import type { TournamentPaginationMeta } from "../dto/tournament.dto";

export interface TournamentListResult {
    data: TournamentItem[];
    meta: TournamentPaginationMeta;
}
