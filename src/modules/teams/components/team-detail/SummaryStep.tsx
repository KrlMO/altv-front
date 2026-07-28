"use client";

import { MainButton } from "@/components/ui/buttom/MainButton";
import { TeamFormData, RosterEntry, RosterPlayer, TeamRole } from "../../hooks/useTeamWizard";

const ROLE_LABELS: Record<TeamRole, string> = {
    PLAYER: "Jugador",
    TEAM_CAPTAIN: "Capitán",
    COACH: "Coach",
    ANALYST: "Analyst",
    STAFF: "Staff",
};

const ROLE_BADGE_COLORS: Record<TeamRole, string> = {
    TEAM_CAPTAIN: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
    PLAYER: "bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300",
    COACH: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
    ANALYST: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400",
    STAFF: "bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-400",
};

interface SummaryStepProps {
    formData: TeamFormData;
    rosters: RosterEntry[];
    isNew: boolean;
    submitting: boolean;
    onPrev: () => void;
    onsubmit: () => void;
}

export function SummaryStep({
    formData,
    rosters,
    isNew,
    submitting,
    onPrev,
    onsubmit,
}: SummaryStepProps) {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Resumen
            </h2>

            <div className="flex flex-col gap-4">
                <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
                    <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-3">
                        Datos del Equipo
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <span className="text-xs text-zinc-400">Nombre</span>
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {formData.name}
                            </p>
                        </div>
                        <div>
                            <span className="text-xs text-zinc-400">Tag</span>
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {formData.tag}
                            </p>
                        </div>
                        <div className="sm:col-span-2">
                            <span className="text-xs text-zinc-400">Descripcion</span>
                            <p className="text-sm text-zinc-900 dark:text-zinc-100">
                                {formData.description || "Sin descripcion"}
                            </p>
                        </div>
                        <div>
                            <span className="text-xs text-zinc-400">Pais</span>
                            <div className="flex items-center gap-2">
                                {formData.country_iso && (
                                    <img
                                        src={`https://flagcdn.com/24x18/${formData.country_iso.toLowerCase()}.png`}
                                        alt={formData.country_name || ""}
                                        className="h-4"
                                    />
                                )}
                                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                    {formData.country_name || "Sin país"}
                                </p>
                            </div>
                        </div>
                        {formData.logo && (
                            <div>
                                <span className="text-xs text-zinc-400">Logo</span>
                                <p className="text-sm text-zinc-900 dark:text-zinc-100">
                                    {formData.logo.name}
                                </p>
                            </div>
                        )}
                        {formData.cover && (
                            <div>
                                <span className="text-xs text-zinc-400">Portada</span>
                                <p className="text-sm text-zinc-900 dark:text-zinc-100">
                                    {formData.cover.name}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
                    <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-3">
                        Rosters ({rosters.length})
                    </h3>
                    {rosters.length === 0 ? (
                        <p className="text-sm text-zinc-400">Sin rosters agregados</p>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {rosters.map((roster, index) => (
                                <div
                                    key={`${roster.gameId}-${index}`}
                                    className="flex flex-col gap-2"
                                >
                                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                        {roster.gameName}
                                    </p>
                                    {roster.players.length === 0 ? (
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                            Sin miembros
                                        </p>
                                    ) : (
                                        <div className="flex flex-col gap-2">
                                            {roster.players
                                                .slice()
                                                .sort((a, b) => {
                                                    const order: Record<TeamRole, number> = {
                                                        TEAM_CAPTAIN: 0,
                                                        COACH: 1,
                                                        PLAYER: 2,
                                                        ANALYST: 3,
                                                        STAFF: 4,
                                                    };
                                                    return order[a.teamRole] - order[b.teamRole];
                                                })
                                                .map((rp) => (
                                                    <SummaryMemberCard key={rp.player.id} rp={rp} />
                                                ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex gap-3">
                <MainButton type="button" variant="secondary" onClick={onPrev} disabled={submitting}>
                    Anterior
                </MainButton>
                <MainButton type="button" onClick={onsubmit} disabled={submitting}>
                    {submitting ? "Guardando..." : isNew ? "Crear Equipo" : "Guardar Cambios"}
                </MainButton>
            </div>
        </div>
    );
}

function SummaryMemberCard({ rp }: { rp: RosterPlayer }) {
    const { player, teamRole, jerseyPhoto } = rp;

    return (
        <div className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/80">
            <img
                src={player.avatar || "/default-avatar.png"}
                alt={player.username}
                className="w-9 h-9 rounded-full object-cover bg-zinc-200 dark:bg-zinc-700 shrink-0"
            />

            <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-700 shrink-0" />

            <div className="w-9 h-9 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-700 shrink-0 flex items-center justify-center">
                {jerseyPhoto ? (
                    <img
                        src={URL.createObjectURL(jerseyPhoto)}
                        alt="Jersey"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-zinc-400"
                    >
                        <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
                    </svg>
                )}
            </div>

            <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                    {player.username || "—"}
                </span>
            </div>

            <span
                className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold shrink-0 ${ROLE_BADGE_COLORS[teamRole]}`}
            >
                {teamRole === "TEAM_CAPTAIN" && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="mr-0.5">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                )}
                {ROLE_LABELS[teamRole]}
            </span>
        </div>
    );
}
