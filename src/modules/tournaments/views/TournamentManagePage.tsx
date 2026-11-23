"use client";

import { useAuth } from "@/context/AuthContext";
import { TournamentManageSection } from "@/modules/tournament-matches/views/TournamentManageSection";

export function TournamentManagePage({ id }: { id: number }) {
    const { accessToken } = useAuth();

    if (!accessToken) {
        return (
            <div className="mx-auto flex w-full max-w-5xl p-4">
                <div className="flex w-full flex-col items-center gap-3 rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center dark:border-zinc-700 dark:bg-altv-bgcontent">
                    <p className="font-medium text-zinc-700 dark:text-zinc-200">
                        Iniciá sesión para gestionar este torneo
                    </p>
                    <a
                        href="/login"
                        className="text-sm font-medium text-btn-primary hover:underline"
                    >
                        Ir a iniciar sesión
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4">
            <header>
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    Gestionar torneo
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Genera rondas, asigna equipos y carga resultados.
                </p>
            </header>
            <TournamentManageSection tournamentId={id} accessToken={accessToken} />
        </div>
    );
}
