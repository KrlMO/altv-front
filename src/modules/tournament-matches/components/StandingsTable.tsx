"use client";

import { StandingsRow } from "../models/match.models";

interface StandingsTableProps {
    standings: StandingsRow[];
}

export function StandingsTable({ standings }: StandingsTableProps) {
    if (standings.length === 0) {
        return (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Sin equipos inscriptos todavía.
            </p>
        );
    }

    return (
        <table className="w-full text-sm">
            <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    <th className="py-2 pr-3">#</th>
                    <th className="py-2 pr-3">Equipo</th>
                    <th className="py-2 pr-3 text-center">G</th>
                    <th className="py-2 pr-3 text-center">P</th>
                    <th className="py-2 text-right">Estado</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {standings.map((row, index) => (
                    <tr key={row.registrationId}>
                        <td className="py-2 pr-3 tabular-nums text-zinc-500 dark:text-zinc-400">
                            {index + 1}
                        </td>
                        <td className="py-2 pr-3 font-medium text-zinc-900 dark:text-zinc-100">
                            {row.teamName}
                        </td>
                        <td className="py-2 pr-3 text-center tabular-nums">
                            {row.wins}
                        </td>
                        <td className="py-2 pr-3 text-center tabular-nums text-zinc-500 dark:text-zinc-400">
                            {row.losses}
                        </td>
                        <td className="py-2 text-right">
                            <span
                                className={`text-xs ${
                                    row.active
                                        ? "text-ciangreen"
                                        : "text-zinc-500 dark:text-zinc-400"
                                }`}
                            >
                                {row.active ? "En carrera" : "Cerrado"}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
