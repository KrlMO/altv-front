import { TeamGame } from "@/modules/team_games/models/team-game.models";

export interface Team {
    id: string;
    name: string;
    tag: string;
    description: string;
    country: string;
    country_id: number;
    country_iso: string;
    logo: string;
    banner: string;
    colorHex: string;
    teamGames: TeamGame[];
}

export interface MyTeamListItem {
    id: string;
    name: string;
    logo: string;
    member_role: string;
}
