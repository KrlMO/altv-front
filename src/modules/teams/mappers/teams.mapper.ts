import { Team, MyTeamListItem } from "../models/teams";
import {
    TeamResponseDTO,
    MyTeamListItemDTO,
} from "../dto/teams.dto";
import { mapTeamGameResponseToModel } from "@/modules/team_games/mappers/team-game.mapper";

export function mapTeamResponseToModel(dto: TeamResponseDTO): Team {
    return {
        id: dto.id,
        name: dto.name,
        tag: dto.tag,
        description: dto.description,
        country: dto.country,
        country_id: dto.country_id,
        country_iso: dto.country_iso,
        logo: dto.logo,
        cover: dto.cover,
        colorHex: dto.color_hex,
        teamGames: (dto.team_games ?? []).map(mapTeamGameResponseToModel),
    };
}

export function mapMyTeamListItemDTOToModel(dto: MyTeamListItemDTO): MyTeamListItem {
    return {
        id: dto.id,
        name: dto.name,
        logo: dto.logo,
        member_role: dto.member_role,
    };
}
