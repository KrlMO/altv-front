"use client";

import { SearchBar } from "@/components/navigation/SearchBar";
import { SelectCountry } from "@/modules/shared/country/components/SelectCountry";
import { SelectRegion } from "@/modules/shared/region/components/SelectRegion";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { MainButton } from "@/components/ui/buttom/MainButton";
import { useTeamGames } from "../../hooks/useTeamGames";
import { TeamResult } from "./TeamResult";

interface SearchTeamResultProps {
    gameId?: number | null;
    gameName?: string | null;
}

export function SearchTeamResult({ gameId, gameName }: SearchTeamResultProps) {
    const {
        setName,
        regionId,
        setRegionId,
        countryId,
        setCountryId,
        sortBy,
        setSortBy,
        setPage,
        result,
        loading,
        error,
    } = useTeamGames({ game_id: gameId });

    return (
        <div>
            <div className="flex items-center justify-between gap-4 mb-4">
                {gameName && (
                    <h2 className="text-xl font-bold">
                        Equipos de{" "}
                        <span className="text-btn-secondary">{gameName}</span>
                    </h2>
                )}
                <MainButton type="button" className="px-6 shrink-0" onClick={() => window.location.href = "/app/teams/manage"}>
                    Crear Equipo
                </MainButton>
            </div>

            <div className="mb-4">
                <SearchBar
                    compact
                    placeholder="Buscar equipo..."
                    onChange={setName}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <SelectRegion
                    label="Región"
                    value={regionId}
                    onChange={setRegionId}
                />
                <SelectCountry
                    label="País"
                    value={countryId}
                    onChange={setCountryId}
                />
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Ordenar por
                    </label>
                    <select
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(e.target.value as typeof sortBy)
                        }
                        className="w-full h-10 rounded-lg border px-3 text-sm
                            bg-white dark:bg-zinc-900
                            border-zinc-300 dark:border-zinc-700
                            focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="name_asc">Nombre (A-Z)</option>
                        <option value="name_desc">Nombre (Z-A)</option>
                        <option value="newest">Más recientes</option>
                        <option value="oldest">Más antiguos</option>
                    </select>
                </div>
            </div>

            <div>
                {loading && (
                    <p className="text-sm text-gray-400">Cargando equipos...</p>
                )}
                {error && <p className="text-sm text-red-400">{error}</p>}

                {!loading && !error && result.data.length === 0 && (
                    <p className="text-sm text-gray-400">
                        No se encontraron equipos
                    </p>
                )}

                <div className="flex flex-col gap-2">
                    {result.data.map((team) => (
                        <TeamResult
                            key={team.id}
                            logo={team.logo}
                            name={team.name}
                        />
                    ))}
                </div>

                <Pagination
                    page={result.page}
                    totalPages={result.total_pages}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
}
