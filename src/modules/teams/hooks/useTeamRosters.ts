"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { Game } from "@/modules/team_games/models/game.models";
import { TeamGameItem } from "@/modules/team_games/models/team-game.models";
import { RosterEntry, RosterPlayer } from "../types/roster";
import {
    fetchTeamGamesByTeam,
    deactivateTeamGame,
    activateTeamGame,
    fetchTeamGameManageMembers,
    addTeamGameMembers,
    removeTeamGameMembers,
    addTeamGameMemberRole,
    removeTeamGameMemberRole,
    uploadTeamGameMemberJersey,
    createRoster,
} from "@/modules/team_games/services/team-games.service";
import { mapManageMemberDTOToRosterPlayer } from "../mappers/teams.mapper";

export function useTeamRosters(teamId: string | null) {
    const { accessToken } = useAuth();

    const [rosters, setRosters] = useState<TeamGameItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deactivatingId, setDeactivatingId] = useState<string | null>(null);
    const [activatingId, setActivatingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        if (!accessToken || !teamId) {
            setRosters([]);
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const data = await fetchTeamGamesByTeam(teamId, accessToken);
            setRosters(data ?? []);
        } catch {
            setError("Error al cargar los rosters");
        } finally {
            setLoading(false);
        }
    }, [accessToken, teamId]);

    useEffect(() => {
        load();
    }, [load]);

    const fetchMembers = useCallback(
        async (teamGameId: string): Promise<RosterPlayer[]> => {
            if (!accessToken) return [];
            try {
                const dtos = await fetchTeamGameManageMembers(
                    teamGameId,
                    accessToken
                );
                return dtos.map(mapManageMemberDTOToRosterPlayer);
            } catch {
                setError("Error al cargar los miembros del roster");
                return [];
            }
        },
        [accessToken]
    );

    const addRoster = useCallback(
        async (game: Game, players: RosterPlayer[]) => {
            if (!accessToken || !teamId) return;
            if (!game.slug) {
                setError("No se pudo crear el roster: el videojuego no tiene slug");
                return;
            }
            try {
                setSaving(true);
                setError(null);
                await createRoster(
                    teamId,
                    {
                        gameSlug: game.slug,
                        members: players.map((p) => ({
                            user_id: Number(p.player.id),
                            role: p.teamRole,
                        })),
                        jerseys: Object.fromEntries(
                            players
                                .filter((p) => p.jerseyPhoto)
                                .map((p) => [String(p.player.id), p.jerseyPhoto as File])
                        ),
                    },
                    accessToken
                );
                await load();
            } catch {
                setError("Error al añadir el roster");
            } finally {
                setSaving(false);
            }
        },
        [accessToken, teamId, load]
    );

    const updateRoster = useCallback(
        async (
            teamGameId: string,
            gameId: string,
            currentPlayers: RosterPlayer[],
            entry: RosterEntry
        ) => {
            if (!accessToken) return;
            try {
                setSaving(true);
                setError(null);

                const currentById = new Map(
                    currentPlayers.map((p) => [String(p.player.id), p])
                );
                const newById = new Map(
                    entry.players.map((p) => [String(p.player.id), p])
                );

                const removedIds = [...currentById.keys()].filter(
                    (id) => !newById.has(id)
                );
                if (removedIds.length > 0) {
                    await removeTeamGameMembers(teamGameId, removedIds.map(Number), accessToken);
                }

                for (const [id, player] of newById) {
                    const existing = currentById.get(id);
                    if (!existing) {
                        await addTeamGameMembers(
                            teamGameId,
                            {
                                members: [{ user_id: Number(id), role: player.teamRole }],
                                game_id: Number(gameId),
                            },
                            accessToken
                        );
                        if (player.jerseyPhoto) {
                            await uploadTeamGameMemberJersey(
                                teamGameId,
                                id,
                                player.jerseyPhoto,
                                accessToken
                            );
                        }
                    } else {
                        if (existing.teamRole !== player.teamRole) {
                            await removeTeamGameMemberRole(
                                teamGameId,
                                [{ user_id: Number(id), roles: [{ name: existing.teamRole }] }],
                                accessToken
                            );
                            await addTeamGameMemberRole(
                                teamGameId,
                                [{ user_id: Number(id), roles: [{ name: player.teamRole }] }],
                                accessToken
                            );
                        }
                        if (player.jerseyPhoto) {
                            await uploadTeamGameMemberJersey(
                                teamGameId,
                                id,
                                player.jerseyPhoto,
                                accessToken
                            );
                        }
                    }
                }

                await load();
            } catch {
                setError("Error al guardar el roster");
            } finally {
                setSaving(false);
            }
        },
        [accessToken, load]
    );

    const deactivateGame = useCallback(async (teamGameId: string) => {
        if (!accessToken) return;
        try {
            setDeactivatingId(teamGameId);
            setError(null);
            await deactivateTeamGame(teamGameId, accessToken);
            await load();
        } catch {
            setError("Error al desactivar el videojuego");
        } finally {
            setDeactivatingId(null);
        }
    }, [accessToken, load]);

    const activateGame = useCallback(async (teamGameId: string) => {
        if (!accessToken) return;
        try {
            setActivatingId(teamGameId);
            setError(null);
            await activateTeamGame(teamGameId, accessToken);
            await load();
        } catch {
            setError("Error al activar el videojuego");
        } finally {
            setActivatingId(null);
        }
    }, [accessToken, load]);

    return {
        rosters,
        loading,
        saving,
        deactivatingId,
        activatingId,
        error,
        reload: load,
        fetchMembers,
        addRoster,
        updateRoster,
        deactivateGame,
        activateGame,
    };
}
