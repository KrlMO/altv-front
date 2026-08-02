import { PlayerSearchResult } from "@/modules/users/models/users.models";

export type TeamRole = "PLAYER" | "COACH" | "ANALYST" | "STAFF" | "TEAM_CAPTAIN";

export interface RosterPlayer {
    player: PlayerSearchResult;
    jerseyPhoto: File | null;
    roleId: string | null;
    teamRole: TeamRole;
}

export interface RosterEntry {
    gameName: string;
    gameId: string;
    players: RosterPlayer[];
}
