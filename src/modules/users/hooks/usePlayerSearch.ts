"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { PlayerSearchResult } from "../models/users.models";
import { searchPlayers } from "../services/users.service";

export function usePlayerSearch(debounceMs = 300) {
    const { accessToken } = useAuth();
    const [query, setQuery] = useState("");
    const [players, setPlayers] = useState<PlayerSearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!query.trim()) {
            setPlayers([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(async () => {
            try {
                const results = await searchPlayers(query.trim(), accessToken ?? "");
                setPlayers(results.slice(0, 5));
            } catch {
                setError("Error al buscar jugadores");
                setPlayers([]);
            } finally {
                setLoading(false);
            }
        }, debounceMs);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [query, debounceMs, accessToken]);

    return { query, setQuery, players, loading, error };
}
