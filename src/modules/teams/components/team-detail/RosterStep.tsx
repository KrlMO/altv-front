"use client";

import { useState } from "react";
import { MainButton } from "@/components/ui/buttom/MainButton";
import { Game } from "@/modules/team_games/models/game.models";
import { TeamGameItem } from "@/modules/team_games/models/team-game.models";
import { AddRosterModal } from "./AddRosterModal";

interface RosterStepProps {
    rosters: TeamGameItem[];
    loading: boolean;
    canManage: boolean;
    adding: boolean;
    removingId: string | null;
    error?: string | null;
    onAddGame: (game: Game) => void;
    onRemove: (teamGameId: string) => void;
    onPrev: () => void;
    onNext: () => void;
}

export function RosterStep({
    rosters,
    loading,
    canManage,
    adding,
    removingId,
    error,
    onAddGame,
    onRemove,
    onPrev,
    onNext,
}: RosterStepProps) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Rosters
            </h2>

            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Los rosters son los videojuegos en los que participa tu equipo.
            </p>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <div className="flex flex-col gap-3">
                {loading ? (
                    <p className="text-sm text-zinc-400">
                        Cargando rosters...
                    </p>
                ) : rosters.length === 0 ? (
                    <p className="text-sm text-zinc-400">
                        Tu equipo aún no tiene videojuegos agregados.
                    </p>
                ) : (
                    rosters.map((roster) => (
                        <div
                            key={roster.id}
                            className="flex items-center justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                {roster.logo && (
                                    <img
                                        src={roster.logo}
                                        alt={roster.gameName}
                                        className="w-9 h-9 rounded-lg object-cover bg-zinc-200 dark:bg-zinc-700 shrink-0"
                                    />
                                )}
                                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                                    {roster.gameName}
                                </span>
                            </div>
                            {canManage && (
                                <button
                                    type="button"
                                    onClick={() => onRemove(roster.id)}
                                    disabled={removingId === roster.id}
                                    className="text-xs text-red-400 hover:text-red-300 transition-colors disabled:opacity-40"
                                >
                                    {removingId === roster.id
                                        ? "Eliminando..."
                                        : "Eliminar"}
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>

            {canManage && (
                <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    disabled={adding}
                    className="w-full p-4 rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center gap-2 text-sm text-zinc-500 hover:border-[#88008B] hover:text-[#88008B] transition-colors disabled:opacity-40"
                >
                    <span className="text-lg">+</span>
                    {adding ? "Añadiendo..." : "Añadir videojuego"}
                </button>
            )}

            <AddRosterModal
                key="add"
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                gameOnly
                onSelectGame={(game) => {
                    setShowModal(false);
                    onAddGame(game);
                }}
            />

            <div className="flex gap-3">
                <MainButton type="button" variant="secondary" onClick={onPrev}>
                    Anterior
                </MainButton>
                <MainButton type="button" onClick={onNext}>
                    Siguiente
                </MainButton>
            </div>
        </div>
    );
}
