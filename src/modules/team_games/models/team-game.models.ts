import { RosterMember } from "@/modules/users/models/users.models";

export interface TeamGameItem {
    id: string;
    gameId: string;
    gameName: string;
    logo?: string;
    active: boolean;
}

export interface TeamGame {
    id: string;
    teamId: string;
    gameId: string;
    gameName: string;
    createdAt: string;
    roster: RosterMember[];
}
