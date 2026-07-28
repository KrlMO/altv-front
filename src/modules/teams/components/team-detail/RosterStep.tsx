"use client";

import { useState } from "react";
import { MainButton } from "@/components/ui/buttom/MainButton";
import { RosterEntry } from "../../hooks/useTeamWizard";
import { AddRosterModal } from "./AddRosterModal";

interface RosterStepProps {
    rosters: RosterEntry[];
    onAddRoster: (entry: RosterEntry) => void;
    onUpdateRoster: (index: number, entry: RosterEntry) => void;
    onRemoveRoster: (index: number) => void;
    onPrev: () => void;
    onNext: () => void;
}

export function RosterStep({
    rosters,
    onAddRoster,
    onUpdateRoster,
    onRemoveRoster,
    onPrev,
    onNext,
}: RosterStepProps) {
    const [showModal, setShowModal] = useState(false);
    const [editingEntry, setEditingEntry] = useState<
        { index: number; entry: RosterEntry } | undefined
    >(undefined);

    const existingGameIds = rosters.map((r) => r.gameId);

    const handleOpenAdd = () => {
        setEditingEntry(undefined);
        setShowModal(true);
    };

    const handleOpenEdit = (index: number) => {
        setEditingEntry({ index, entry: rosters[index] });
        setShowModal(true);
    };

    const handleSave = (entry: RosterEntry, index?: number) => {
        if (index !== undefined) {
            onUpdateRoster(index, entry);
        } else {
            onAddRoster(entry);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Añadir Roster
            </h2>

            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Agrega los rosters de cada juego a tu equipo.
            </p>

            <div className="flex flex-col gap-3">
                {rosters.map((roster, index) => (
                    <div
                        key={`${roster.gameId}-${index}`}
                        className="flex items-center justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50"
                    >
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {roster.gameName}
                            </span>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                {roster.players.filter((p) => p.teamRole === "PLAYER" || p.teamRole === "TEAM_CAPTAIN").length} jugador{roster.players.filter((p) => p.teamRole === "PLAYER" || p.teamRole === "TEAM_CAPTAIN").length !== 1 ? "es" : ""}
                                {roster.players.some((p) => p.teamRole === "TEAM_CAPTAIN") && " · 1 capitán"}
                                {roster.players.some((p) => p.teamRole === "COACH") && " · 1 coach"}
                                {roster.players.some((p) => p.teamRole === "ANALYST" || p.teamRole === "STAFF") && ` · ${roster.players.filter((p) => p.teamRole === "ANALYST" || p.teamRole === "STAFF").length} otro${roster.players.filter((p) => p.teamRole === "ANALYST" || p.teamRole === "STAFF").length !== 1 ? "s" : ""}`}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => handleOpenEdit(index)}
                                className="text-xs text-zinc-400 hover:text-[#88008B] transition-colors"
                            >
                                Editar
                            </button>
                            <button
                                type="button"
                                onClick={() => onRemoveRoster(index)}
                                className="text-xs text-red-400 hover:text-red-300 transition-colors"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={handleOpenAdd}
                    className="w-full p-4 rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center gap-2 text-sm text-zinc-500 hover:border-[#88008B] hover:text-[#88008B] transition-colors"
                >
                    <span className="text-lg">+</span>
                    Click para añadir
                </button>
            </div>

            <AddRosterModal
                key={editingEntry ? `edit-${editingEntry.index}` : "add"}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSave={handleSave}
                existingGameIds={existingGameIds}
                editingEntry={editingEntry}
            />

            <div className="flex gap-3">
                <MainButton type="button" variant="secondary" onClick={onPrev}>
                    Anterior
                </MainButton>
                <MainButton type="button" onClick={onNext} disabled={rosters.length === 0}>
                    Finalizar
                </MainButton>
            </div>
        </div>
    );
}
