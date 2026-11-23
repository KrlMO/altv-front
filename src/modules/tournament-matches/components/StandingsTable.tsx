"use client";

import { StandingsRow } from "../models/match.models";

interface StandingsTableProps {
    standings: StandingsRow[];
}

export function StandingsTable({ standings }: StandingsTableProps) {
    if (standings.length === 0) {
        return (
            <p className="text-sm text-neutral-500">
                Sin equipos inscriptos todavía.
            </p>
        );
    }

    return (
        <table className="w-full text-sm">
            <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-neutral-500">
                    <th className="py-2 pr-3">#</th>
                    <th className="py-2 pr-3">Equipo</th>
                    <th className="py-2 pr-3 text-center">G</th>
                    <th className="py-2 pr-3 text-center">P</th>
                    <th className="py-2 text-right">Estado</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
                {standings.map((row, index) => (
                    <tr key={row.registrationId}>
                        <td className="py-2 pr-3 tabular-nums text-neutral-500">
                            {index + 1}
                        </td>
                        <td className="py-2 pr-3 font-medium">
                            {row.teamName}
                        </td>
                        <td className="py-2 pr-3 text-center tabular-nums">
                            {row.wins}
                        </td>
                        <td className="py-2 pr-3 text-center tabular-nums text-neutral-400">
                            {row.losses}
                        </td>
                        <td className="py-2 text-right">
                            <span
                                className={`text-xs ${
                                    row.active
                                        ? "text-emerald-400"
                                        : "text-neutral-500"
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
