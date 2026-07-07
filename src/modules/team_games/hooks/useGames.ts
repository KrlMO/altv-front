"use client";

import { useState, useEffect, useRef } from "react";
import { Game } from "../dto/game.dto";
import { searchGames } from "../services/games.service";

export function useGames(debounceMs = 300) {
    const [query, setQuery] = useState("");
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!query.trim()) {
            setGames([]);
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
                const results = await searchGames(query.trim());
                setGames(results.slice(0, 5));
            } catch {
                setError("Error al buscar juegos");
                setGames([]);
            } finally {
                setLoading(false);
            }
        }, debounceMs);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [query, debounceMs]);

    return { query, setQuery, games, loading, error };
}
