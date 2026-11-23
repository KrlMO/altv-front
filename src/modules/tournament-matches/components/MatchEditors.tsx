"use client";

import { useState } from "react";
import { Match, StandingsRow } from "../models/match.models";
import { MainButton } from "@/components/ui/buttom/MainButton";

interface MatchResultEditorProps {
    match: Match;
    disabled: boolean;
    onSave: (scoreA: number, scoreB: number) => void;
}

const inputClass =
    "w-14 rounded-lg border border-zinc-300 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-btn-primary/60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";

const selectClass =
    "rounded-lg border border-zinc-300 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-btn-primary/60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";

// Result inputs for a playable match; shows the final score when done.
export function MatchResultEditor({
    match,
    disabled,
    onSave,
}: MatchResultEditorProps) {
    const [scoreA, setScoreA] = useState<string>(
        match.scoreA !== undefined ? String(match.scoreA) : ""
    );
    const [scoreB, setScoreB] = useState<string>(
        match.scoreB !== undefined ? String(match.scoreB) : ""
    );

    if (match.status === "COMPLETED") {
        return (
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Resultado final: {match.scoreA}-{match.scoreB}
            </p>
        );
    }
    if (!match.teamA || !match.teamB) {
        return (
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Asigna ambos equipos para poder cargar un resultado.
            </p>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <input
                type="number"
                min={0}
                aria-label={`Puntos ${match.teamA.teamName}`}
                value={scoreA}
                onChange={(e) => setScoreA(e.target.value)}
                className={inputClass}
            />
            <span className="text-zinc-500 dark:text-zinc-400">-</span>
            <input
                type="number"
                min={0}
                aria-label={`Puntos ${match.teamB.teamName}`}
                value={scoreB}
                onChange={(e) => setScoreB(e.target.value)}
                className={inputClass}
            />
            <MainButton
                type="button"
                disabled={disabled || scoreA === "" || scoreB === ""}
                onClick={() => onSave(Number(scoreA), Number(scoreB))}
                className="rounded-lg px-3 py-1 text-xs"
            >
                Guardar
            </MainButton>
        </div>
    );
}

interface MatchTeamsEditorProps {
    match: Match;
    participants: StandingsRow[];
    disabled: boolean;
    onSave: (teamA?: number, teamB?: number) => void;
}

// Selects to assign teams manually into TBD slots.
export function MatchTeamsEditor({
    match,
    participants,
    disabled,
    onSave,
}: MatchTeamsEditorProps) {
    const [teamA, setTeamA] = useState<string>("");
    const [teamB, setTeamB] = useState<string>("");

    const openA = !match.teamA;
    const openB = !match.teamB;
    if (!openA && !openB) return null;

    const options = participants.filter((p) => {
        if (p.registrationId === match.teamA?.registrationId) return false;
        if (p.registrationId === match.teamB?.registrationId) return false;
        return true;
    });

    return (
        <div className="flex flex-wrap items-center gap-2">
            {openA && (
                <select
                    aria-label="Equipo A"
                    value={teamA}
                    onChange={(e) => setTeamA(e.target.value)}
                    className={selectClass}
                >
                    <option value="">Equipo A…</option>
                    {options.map((p) => (
                        <option key={p.registrationId} value={p.registrationId}>
                            {p.teamName}
                        </option>
                    ))}
                </select>
            )}
            {openB && (
                <select
                    aria-label="Equipo B"
                    value={teamB}
                    onChange={(e) => setTeamB(e.target.value)}
                    className={selectClass}
                >
                    <option value="">Equipo B…</option>
                    {options.map((p) => (
                        <option key={p.registrationId} value={p.registrationId}>
                            {p.teamName}
                        </option>
                    ))}
                </select>
            )}
            <MainButton
                type="button"
                disabled={
                    disabled ||
                    (openA && !teamA) ||
                    (openB && !teamB) ||
                    (openA && !openB && !teamA && !teamB)
                }
                onClick={() =>
                    onSave(
                        teamA ? Number(teamA) : undefined,
                        teamB ? Number(teamB) : undefined
                    )
                }
                className="rounded-lg px-3 py-1 text-xs"
            >
                Asignar
            </MainButton>
        </div>
    );
}
