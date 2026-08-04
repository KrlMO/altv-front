import { TournamentItemDTO } from "../dto/tournament.dto";
import { TournamentItem } from "../models/tournament.models";

export function mapTournamentResponseToModel(dto: TournamentItemDTO): TournamentItem {
    return {
        id: dto.id,
        name: dto.name,
        logo: dto.logo ?? undefined,
        gameId: dto.game_id,
        gameName: dto.game_name,
        organizerType: dto.organizer_type ?? undefined,
        organization: dto.organization ?? undefined,
        typeId: dto.type_id ?? undefined,
        typeName: dto.type_name ?? undefined,
        regionName: dto.region_name ?? undefined,
        regionISO: dto.region_iso ?? undefined,
        countryName: dto.country_name ?? undefined,
        startAt: dto.start_at,
        endAt: dto.end_at ?? undefined,
        status: dto.status,
        createdAt: dto.created_at,
    };
}
