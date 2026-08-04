import { Team, MyTeamListItem } from "../models/teams";
import {
    TeamResponseDTO,
    MyTeamListItemDTO,
} from "../dto/teams.dto";
import { mapTeamGameResponseToModel } from "@/modules/team_games/mappers/team-game.mapper";
import { TeamGameManageMemberDTO } from "@/modules/team_games/dto/team-game.dto";
import { RosterPlayer, TeamRole } from "../types/roster";

export function mapTeamResponseToModel(dto: TeamResponseDTO): Team {
    return {
        id: dto.id,
        name: dto.name,
        tag: dto.tag,
        description: dto.description,
        country: dto.country.name,
        country_id: dto.country.id,
        country_iso: dto.country.iso_code,
        logo: dto.logo,
        banner: dto.banner,
        colorHex: dto.color_hex ?? "",
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

export function mapManageMemberDTOToRosterPlayer(
    dto: TeamGameManageMemberDTO
): RosterPlayer {
    return {
        player: {
            id: dto.user_id,
            username: dto.username,
            firstName: dto.first_name,
            lastName: dto.last_name,
            avatar: dto.avatar,
            country: {
                id: dto.country.id,
                name: dto.country.name,
                isoCode: dto.country.iso_code,
                flagPath: dto.country.flag_path,
            },
            countryCode: dto.country_code,
            birthDate: dto.birth_date ?? "",
        },
        jerseyPhoto: null,
        jerseyPhotoUrl: dto.jersey_photo || undefined,
        roleId: null,
        teamRole: dto.team_role as TeamRole,
    };
}
