import { PlayerSearchResult } from "@/modules/users/models/users.models";

export type TeamRole = "PLAYER" | "COACH" | "ANALYST" | "STAFF" | "TEAM_CAPTAIN";

export interface RosterPlayer {
    player: PlayerSearchResult;
    jerseyPhoto: File | null;
    jerseyPhotoUrl?: string;
    roleId: string | null;
    teamRole: TeamRole;
}

export interface RosterEntry {
    teamGameId?: string;
    gameName: string;
    gameId: string;
    players: RosterPlayer[];
}
