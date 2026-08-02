"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { Game } from "@/modules/team_games/models/game.models";
import { TeamGameItem } from "@/modules/team_games/models/team-game.models";
import {
    fetchTeamGamesByTeam,
    createTeamGame,
    deleteTeamGame,
} from "@/modules/team_games/services/team-games.service";

export function useTeamRosters(teamId: string | null) {
    const { accessToken } = useAuth();

    const [rosters, setRosters] = useState<TeamGameItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [adding, setAdding] = useState(false);
    const [removingId, setRemovingId] = useState<string | null>(null);
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

    const addGame = useCallback(async (game: Game) => {
        if (!accessToken || !teamId || !game.slug) return;
        try {
            setAdding(true);
            setError(null);
            await createTeamGame(
                teamId,
                { game_slug: game.slug, name: game.name },
                accessToken
            );
            await load();
        } catch {
            setError("Error al añadir el videojuego");
        } finally {
            setAdding(false);
        }
    }, [accessToken, teamId, load]);

    const removeGame = useCallback(async (teamGameId: string) => {
        if (!accessToken) return;
        try {
            setRemovingId(teamGameId);
            setError(null);
            await deleteTeamGame(teamGameId, accessToken);
            await load();
        } catch {
            setError("Error al eliminar el videojuego");
        } finally {
            setRemovingId(null);
        }
    }, [accessToken, load]);

    return {
        rosters,
        loading,
        adding,
        removingId,
        error,
        reload: load,
        addGame,
        removeGame,
    };
}
