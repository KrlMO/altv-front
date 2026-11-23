import {
    MatchDTO,
    StandingsRowDTO,
    StageDTO,
    TeamInfoDTO,
} from "../dto/match.dto";
import {
    Match,
    Stage,
    StageFormat,
    StandingsRow,
    TeamInfo,
} from "../models/match.models";

function mapTeamInfo(dto?: TeamInfoDTO | null): TeamInfo | undefined {
    if (!dto) return undefined;
    return {
        registrationId: dto.registration_id,
        teamName: dto.team_name,
    };
}

export function mapStageResponseToModel(dto: StageDTO): Stage {
    return {
        id: dto.id,
        tournamentId: dto.tournament_id,
        format: dto.format_code as StageFormat,
        formatName: dto.format_name,
        name: dto.name,
        order: dto.stage_order,
        status: dto.status,
        config: dto.config ?? {},
    };
}

export function mapMatchResponseToModel(dto: MatchDTO): Match {
    return {
        id: dto.id,
        stageId: dto.stage_id,
        tournamentId: dto.tournament_id,
        roundNumber: dto.round_number,
        matchNumber: dto.match_number,
        teamA: mapTeamInfo(dto.team_a),
        teamB: mapTeamInfo(dto.team_b),
        bestOf: dto.best_of ?? undefined,
        status: dto.status,
        scoreA: dto.score_a ?? undefined,
        scoreB: dto.score_b ?? undefined,
        winner: mapTeamInfo(dto.winner),
        scheduledAt: dto.scheduled_at ?? undefined,
    };
}

export function mapStandingsResponseToModel(
    dto: StandingsRowDTO
): StandingsRow {
    return {
        registrationId: dto.registration_id,
        teamName: dto.team_name,
        wins: dto.wins,
        losses: dto.losses,
        active: dto.active,
    };
}
