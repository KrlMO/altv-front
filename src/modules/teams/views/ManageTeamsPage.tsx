"use client";

import { useState } from "react";
import { MyTeamsList } from "../components/teams-list/MyTeamsList";
import { TeamDetail } from "../components/team-detail/TeamDetail";

export function ManageTeams() {
    const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
    const [creating, setCreating] = useState(false);

    const handleSelectTeam = (id: string) => {
        setCreating(false);
        setSelectedTeamId(id);
    };

    const handleCreateTeam = () => {
        setSelectedTeamId(null);
        setCreating(true);
    };

    const handleSaved = () => {
        setCreating(false);
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 max-w-7xl mx-auto min-h-screen">
            <div className="w-full md:w-72 md:shrink-0 bg-white dark:bg-altv-bgcontent rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 h-fit">
                <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                    Mis Equipos
                </h1>
                <MyTeamsList
                    selectedTeamId={selectedTeamId}
                    onSelectTeam={handleSelectTeam}
                    onCreateTeam={handleCreateTeam}
                />
            </div>
            <div className="flex-1 bg-white dark:bg-altv-bgcontent rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
                {creating || selectedTeamId ? (
                    <TeamDetail
                        teamId={creating ? null : selectedTeamId}
                        onSaved={handleSaved}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-zinc-400">
                        <p className="text-sm">
                            Selecciona un equipo o crea uno nuevo
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
