"use client";

import { useState } from "react";
import { SearchBar } from "@/components/navigation/SearchBar";
import { useGames } from "../../hooks/useGames";
import { GameOption } from "./GameOption";

interface FilterByGameProps {
    onGameSelect?: (gameId: number | null, gameName: string | null) => void;
}

export function FilterByGame({ onGameSelect }: FilterByGameProps) {
    const { query, setQuery, games, loading, error } = useGames();
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const handleSelect = (id: number) => {
        const next = selectedId === id ? null : id;
        setSelectedId(next);
        const game = games.find((g) => g.id === id);
        onGameSelect?.(next, next !== null ? game?.name ?? null : null);
    };

    return (
        <div>
            <h2 className="text-lg font-semibold mb-3">Filtrar por juego</h2>
            <SearchBar
                compact
                className="mb-3"
                placeholder="Buscar juego..."
                onChange={setQuery}
            />

            {loading && <p className="text-sm text-gray-400">Buscando...</p>}
            {error && <p className="text-sm text-red-400">{error}</p>}

            {!loading && query.trim() && games.length === 0 && !error && (
                <p className="text-sm text-gray-400">No se encontraron juegos</p>
            )}

            <div className="flex flex-col gap-1.5">
                {games.map((game) => (
                    <GameOption
                        key={game.id}
                        id={game.id}
                        name={game.name}
                        colorHex={game.colorHex}
                        isSelected={selectedId === game.id}
                        onSelect={handleSelect}
                    />
                ))}
            </div>
        </div>
    );
}
