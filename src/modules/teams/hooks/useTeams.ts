"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { MyTeamListItem } from "../models/teams";
import { fetchMyTeams } from "../services/teams.service";

export function useTeams() {
    const { accessToken } = useAuth();
    const [teams, setTeams] = useState<MyTeamListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        if (!accessToken) return;
        try {
            setLoading(true);
            setError(null);
            const data = await fetchMyTeams(accessToken);
            setTeams(data ?? []);
        } catch {
            setError("Error al cargar tus equipos");
        } finally {
            setLoading(false);
        }
    }, [accessToken]);

    useEffect(() => {
        load();
    }, [load]);

    return { teams, loading, error, reload: load };
}
