"use client";

import { useAuth } from "@/context/AuthContext";
import { TournamentManageSection } from "@/modules/tournament-matches/views/TournamentManageSection";

export function TournamentManagePage({ id }: { id: number }) {
    const { accessToken } = useAuth();

    if (!accessToken) {
        return (
            <p className="text-sm text-neutral-500">
                Iniciá sesión para gestionar este torneo.
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <header>
                <h1 className="text-2xl font-bold">Gestionar torneo</h1>
                <p className="text-sm text-neutral-400">
                    Genera rondas, asigna equipos y carga resultados.
                </p>
            </header>
            <TournamentManageSection tournamentId={id} accessToken={accessToken} />
        </div>
    );
}
