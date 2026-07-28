import { RosterMember } from "@/modules/users/models/users.models";

export interface TeamGame {
    id: string;
    teamId: string;
    gameId: string;
    gameName: string;
    createdAt: string;
    roster: RosterMember[];
}
