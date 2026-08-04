"use client";

import { useState } from "react";
import { MainButton } from "@/components/ui/buttom/MainButton";
import { Game } from "@/modules/team_games/models/game.models";
import { TeamGameItem } from "@/modules/team_games/models/team-game.models";
import { AddRosterModal } from "./AddRosterModal";
import { RosterEntry, RosterPlayer } from "../../types/roster";

interface RosterStepProps {
    rosters: TeamGameItem[];
    loading: boolean;
    canManage: boolean;
    saving: boolean;
    deactivatingId: string | null;
    activatingId: string | null;
    error?: string | null;
    onFetchMembers: (teamGameId: string) => Promise<RosterPlayer[]>;
    onAddRoster: (game: Game, players: RosterPlayer[]) => Promise<void>;
    onUpdateRoster: (
        teamGameId: string,
        gameId: string,
        current: RosterPlayer[],
        entry: RosterEntry
    ) => Promise<void>;
    onDeactivate: (teamGameId: string) => void;
    onActivate: (teamGameId: string) => void;
    onPrev: () => void;
    onNext: () => void;
}

export function RosterStep({
    rosters,
    loading,
    canManage,
    saving,
    deactivatingId,
    activatingId,
    error,
    onFetchMembers,
    onAddRoster,
    onUpdateRoster,
    onDeactivate,
    onActivate,
    onPrev,
    onNext,
}: RosterStepProps) {
    const [showModal, setShowModal] = useState(false);
    const [editingRoster, setEditingRoster] = useState<{
        id: string;
        game: Game;
        players: RosterPlayer[];
    } | null>(null);

    const handleOpenAdd = () => {
        setEditingRoster(null);
        setShowModal(true);
    };

    const handleOpenEdit = async (roster: TeamGameItem) => {
        const players = await onFetchMembers(roster.id);
        setEditingRoster({
            id: roster.id,
            game: {
                id: Number(roster.gameId),
                name: roster.gameName,
                colorHex: "",
                slug: "",
            },
            players,
        });
        setShowModal(true);
    };

    const handleSave = async (entry: RosterEntry, game: Game) => {
        if (editingRoster) {
            await onUpdateRoster(
                editingRoster.id,
                String(game.id),
                editingRoster.players,
                entry
            );
        } else {
            await onAddRoster(game, entry.players);
        }
        setShowModal(false);
        setEditingRoster(null);
    };

    const existingGameIds = rosters.map((r) => r.gameId);

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Rosters
            </h2>

            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Los rosters son los videojuegos en los que participa tu equipo,
                junto con sus jugadores, coach y staff.
            </p>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <div className="flex flex-col gap-3">
                {loading ? (
                    <p className="text-sm text-zinc-400">
                        Cargando rosters...
                    </p>
                ) : rosters.length === 0 ? (
                    <p className="text-sm text-zinc-400">
                        Tu equipo aún no tiene rosters agregados.
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
                                <div className="flex items-center gap-2 min-w-0">
                                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                                        {roster.gameName}
                                    </span>
                                    {!roster.active && (
                                        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-red-100 text-red-500 dark:bg-red-900/40 dark:text-red-400">
                                            Desactivado
                                        </span>
                                    )}
                                </div>
                            </div>
                            {canManage && (
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handleOpenEdit(roster)}
                                        disabled={saving || deactivatingId === roster.id || activatingId === roster.id}
                                        className="text-xs text-zinc-400 hover:text-[#88008B] transition-colors disabled:opacity-40"
                                    >
                                        Editar
                                    </button>
                                    {roster.active ? (
                                        <button
                                            type="button"
                                            onClick={() => onDeactivate(roster.id)}
                                            disabled={saving || deactivatingId === roster.id || activatingId === roster.id}
                                            className="text-xs text-red-400 hover:text-red-300 transition-colors disabled:opacity-40"
                                        >
                                            {deactivatingId === roster.id
                                                ? "Desactivando..."
                                                : "Desactivar"}
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => onActivate(roster.id)}
                                            disabled={saving || deactivatingId === roster.id || activatingId === roster.id}
                                            className="text-xs text-green-400 hover:text-green-300 transition-colors disabled:opacity-40"
                                        >
                                            {activatingId === roster.id
                                                ? "Activando..."
                                                : "Activar"}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {canManage && (
                <button
                    type="button"
                    onClick={handleOpenAdd}
                    disabled={saving}
                    className="w-full p-4 rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center gap-2 text-sm text-zinc-500 hover:border-[#88008B] hover:text-[#88008B] transition-colors disabled:opacity-40"
                >
                    <span className="text-lg">+</span>
                    {saving ? "Guardando..." : "Añadir roster"}
                </button>
            )}

            <AddRosterModal
                key={editingRoster ? `edit-${editingRoster.id}` : "add"}
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    setEditingRoster(null);
                }}
                onSave={handleSave}
                existingGameIds={existingGameIds}
                editingEntry={
                    editingRoster
                        ? {
                              index: 0,
                              entry: {
                                  teamGameId: editingRoster.id,
                                  gameName: editingRoster.game.name,
                                  gameId: String(editingRoster.game.id),
                                  players: editingRoster.players,
                              },
                          }
                        : undefined
                }
            />

            <div className="flex gap-3">
                <MainButton type="button" variant="secondary" onClick={onPrev}>
                    Anterior
                </MainButton>
                <MainButton
                    type="button"
                    onClick={onNext}
                    disabled={rosters.length === 0}
                >
                    Siguiente
                </MainButton>
            </div>
        </div>
    );
}
