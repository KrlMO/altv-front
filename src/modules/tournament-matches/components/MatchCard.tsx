"use client";

import { Match } from "../models/match.models";

function TeamRow({
    name,
    score,
    isWinner,
}: {
    name: string;
    score?: number;
    isWinner: boolean;
}) {
    return (
        <div
            className={`flex items-center justify-between gap-3 rounded px-2 py-1.5 text-sm ${
                isWinner
                    ? "font-semibold text-zinc-900 dark:text-white"
                    : "text-zinc-500 dark:text-zinc-400"
            }`}
        >
            <span className="truncate">{name}</span>
            {score !== undefined && (
                <span className="tabular-nums">{score}</span>
            )}
        </div>
    );
}

interface MatchCardProps {
    match: Match;
    showRoundLabel?: boolean;
    highlight?: boolean;
}

export function MatchCard({ match, showRoundLabel, highlight }: MatchCardProps) {
    const isTbd = !match.teamA || !match.teamB;
    const hasScores = match.scoreA !== undefined || match.scoreB !== undefined;
    const winnerA =
        match.winner && match.teamA && match.winner.registrationId === match.teamA.registrationId;
    const winnerB =
        match.winner && match.teamB && match.winner.registrationId === match.teamB.registrationId;

    const statusLabel =
        match.status === "WALKOVER"
            ? "No presentado"
            : match.status === "COMPLETED"
              ? "Finalizado"
              : match.status === "IN_PROGRESS"
                ? "En juego"
                : isTbd
                  ? "Por definir"
                  : "Pendiente";

    return (
        <div
            className={`rounded-lg border p-2.5 ${
                highlight
                    ? "border-amber-500/60 bg-amber-500/5"
                    : "border-zinc-200 bg-white dark:border-zinc-700 dark:bg-altv-bgcontent"
            }`}
        >
            {showRoundLabel && (
                <p className="mb-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                    Ronda {match.roundNumber} · Partido {match.matchNumber}
                </p>
            )}
            {match.teamA && match.teamB ? (
                <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
                    <TeamRow
                        name={match.teamA.teamName}
                        score={match.scoreA}
                        isWinner={!!winnerA}
                    />
                    <TeamRow
                        name={match.teamB.teamName}
                        score={match.scoreB}
                        isWinner={!!winnerB}
                    />
                </div>
            ) : (
                <div className="flex items-center justify-between px-2 py-1.5 text-sm">
                    <span className="text-zinc-600 dark:text-zinc-300">
                        {match.teamA?.teamName ?? "Por definir"} vs{" "}
                        {match.teamB?.teamName ?? "Por definir"}
                    </span>
                </div>
            )}
            <div className="mt-1.5 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span>{statusLabel}</span>
                {match.bestOf && (
                    <span>
                        Bo{match.bestOf}
                        {hasScores && match.status === "COMPLETED"
                            ? ` · ${match.scoreA}-${match.scoreB}`
                            : ""}
                    </span>
                )}
            </div>
        </div>
    );
}
