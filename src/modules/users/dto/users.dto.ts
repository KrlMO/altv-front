import { CountryResponseDTO } from "@/modules/shared/country/dto/country.dto";

export interface RosterMemberResponseDTO {
    id: string;
    user_id: string;
    team_id: string;
    role: string;
    team_role: string;
    jersey_photo?: string;
}

export interface PlayerSearchResponseDTO {
    id: string;
    first_name: string;
    last_name: string;
    nickname: string;
    profile_photo: string;
    country: CountryResponseDTO;
    birth_date: string;
}
