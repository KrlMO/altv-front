import { TeamGame } from "../models/team-game.models";
import { RosterMember } from "@/modules/users/models/users.models";

interface TeamGameResponseDTO {
    id: string;
    team_id: string;
    game_id: string;
    game_name: string;
    created_at: string;
    roster: RosterMemberResponseDTO[];
}

interface RosterMemberResponseDTO {
    id: string;
    user_id: string;
    team_id: string;
    role: string;
    team_role: string;
    jersey_photo?: string;
}

function mapRosterMember(dto: RosterMemberResponseDTO): RosterMember {
    return {
        id: dto.id,
        userId: dto.user_id,
        teamId: dto.team_id,
        role: dto.role,
        teamRole: dto.team_role,
        jerseyPhoto: dto.jersey_photo,
    };
}

export function mapTeamGameResponseToModel(dto: TeamGameResponseDTO): TeamGame {
    return {
        id: dto.id,
        teamId: dto.team_id,
        gameId: dto.game_id,
        gameName: dto.game_name,
        createdAt: dto.created_at,
        roster: (dto.roster ?? []).map(mapRosterMember),
    };
}
