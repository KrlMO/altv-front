"use client";

import { MainButton } from "@/components/ui/buttom/MainButton";
import { useTeams } from "../../hooks/useTeams";
import { TeamListItem } from "./TeamListItem";

interface MyTeamsListProps {
    selectedTeamId: string | null;
    onSelectTeam: (id: string) => void;
    onCreateTeam: () => void;
}

export function MyTeamsList({
    selectedTeamId,
    onSelectTeam,
    onCreateTeam,
}: MyTeamsListProps) {
    const { teams, loading, error } = useTeams();

    const TEAM_OWNER = "TEAM_OWNER";
    const myTeams = teams.filter((t) => t.member_role === TEAM_OWNER);
    const participatingTeams = teams.filter((t) => t.member_role !== TEAM_OWNER);

    return (
        <div className="flex flex-col gap-4">
            <section>
                <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-2">
                    Mis Equipos
                </h2>
                {loading && (
                    <p className="text-sm text-zinc-400">Cargando equipos...</p>
                )}
                {error && <p className="text-sm text-red-400">{error}</p>}
                {!loading && !error && myTeams.length === 0 && (
                    <p className="text-sm text-zinc-400">
                        Aún no has creado ningún equipo
                    </p>
                )}
                <div className="flex flex-col gap-1">
                    {myTeams.map((team) => (
                        <TeamListItem
                            key={team.id}
                            id={team.id}
                            name={team.name}
                            logo={team.logo}
                            role={team.member_role}
                            isSelected={team.id === selectedTeamId}
                            onSelect={onSelectTeam}
                        />
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-2">
                    Equipos en los que participo
                </h2>
                {!loading && !error && participatingTeams.length === 0 && (
                    <p className="text-sm text-zinc-400">
                        No participas en ningún equipo aún
                    </p>
                )}
                <div className="flex flex-col gap-1">
                    {participatingTeams.map((team) => (
                        <TeamListItem
                            key={team.id}
                            id={team.id}
                            name={team.name}
                            logo={team.logo}
                            role={team.member_role}
                            isSelected={team.id === selectedTeamId}
                            onSelect={onSelectTeam}
                        />
                    ))}
                </div>
            </section>

            <MainButton type="button" onClick={onCreateTeam}>
                Crear Equipo
            </MainButton>
        </div>
    );
}
