import { RosterMemberResponseDTO, PlayerSearchResponseDTO } from "../dto/users.dto";
import { RosterMember, PlayerSearchResult } from "../models/users.models";
import { mapCountryResponseToModel } from "@/modules/shared/country/mappers/country.mapper";

export function mapRosterMemberResponseToModel(dto: RosterMemberResponseDTO): RosterMember {
    return {
        id: dto.id,
        userId: dto.user_id,
        teamId: dto.team_id,
        role: dto.role,
        teamRole: dto.team_role,
        jerseyPhoto: dto.jersey_photo,
    };
}

export function mapPlayerSearchResponseToModel(dto: PlayerSearchResponseDTO): PlayerSearchResult {
    return {
        id: dto.id,
        username: dto.nickname,
        firstName: dto.first_name,
        lastName: dto.last_name,
        avatar: dto.profile_photo,
        country: mapCountryResponseToModel(dto.country),
        countryCode: dto.country.iso_code,
        birthDate: dto.birth_date,
    };
}
