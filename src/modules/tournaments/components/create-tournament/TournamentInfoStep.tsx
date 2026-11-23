"use client";

import { useCallback } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input/Input";
import { Textarea } from "@/components/ui/input/Textarea";
import { SearchableSelect } from "@/components/ui/select/SearchableSelect";
import { searchMyOrganizations } from "@/modules/organizations/services/organizations.service";
import { useAuth } from "@/context/AuthContext";
import { OrganizationItem } from "@/modules/organizations/models/organization.models";
import { Game } from "@/modules/team_games/models/game.models";
import { searchGames } from "@/modules/team_games/services/games.service";
import { TournamentFormData } from "@/modules/tournaments/hooks/useTournamentWizard";

interface TournamentInfoStepProps {
    data: TournamentFormData;
    error: string;
    update: <K extends keyof TournamentFormData>(
        key: K,
        value: TournamentFormData[K]
    ) => void;
}

export function TournamentInfoStep({
    data,
    error,
    update,
}: TournamentInfoStepProps) {
    // searchMyOrganizations filters client-side; it needs the auth token.
    const { accessToken } = useAuth();
    const organizationSearch = useCallback(
        async (query: string) => {
            if (!query.trim() || !accessToken) return [];
            return searchMyOrganizations(accessToken, query.trim());
        },
        [accessToken]
    );

    const gameSearch = useCallback(async (query: string) => {
        if (!query.trim()) return [];
        return searchGames(query.trim());
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <SearchableSelect<OrganizationItem>
                label="Organización"
                placeholder="Buscá tu organización…"
                value={data.organization}
                onChange={(org) => update("organization", org)}
                search={organizationSearch}
                getLabel={(o) => o.name}
                getId={(o) => o.id}
                emptyMessage="No se encontró ninguna organización"
            />

            {!data.organization && (
                <p className="-mt-2 text-xs text-zinc-400 dark:text-zinc-500">
                    ¿No tenés ninguna?{" "}
                    <Link
                        href="/app/organizations"
                        className="font-medium text-btn-primary hover:underline"
                    >
                        Creá la tuya
                    </Link>
                </p>
            )}

            <SearchableSelect<Game>
                label="Juego"
                placeholder="Buscá un juego…"
                value={data.game}
                onChange={(game) => update("game", game)}
                search={gameSearch}
                getLabel={(g) => g.name}
                getId={(g) => g.id}
                renderOption={(g) => (
                    <span className="flex items-center gap-2">
                        <span
                            className="h-3 w-3 shrink-0 rounded-full"
                            style={{ backgroundColor: g.colorHex || "#71717a" }}
                        />
                        {g.name}
                    </span>
                )}
                emptyMessage="No se encontró ningún juego"
            />

            <Input
                label="Nombre del torneo"
                placeholder="Ej: Copa ALTV Temporada 1"
                value={data.name}
                onChange={(e) => update("name", e.target.value)}
            />

            <Textarea
                label="Descripción (opcional)"
                rows={3}
                placeholder="Contale de qué trata el torneo…"
                value={data.description}
                onChange={(e) => update("description", e.target.value)}
            />

            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}
