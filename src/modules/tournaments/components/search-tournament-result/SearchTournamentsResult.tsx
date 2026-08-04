"use client";

import { SearchBar } from "@/components/navigation/SearchBar";
import { SelectCountry } from "@/modules/shared/country/components/SelectCountry";
import { SelectRegion } from "@/modules/shared/region/components/SelectRegion";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { useTournaments } from "../../hooks/useTournaments";
import { useTournamentTypes } from "../../hooks/useTournamentTypes";
import { TournamentResult } from "../tournament-result/TournamentResult";

interface SearchTournamentsResultProps {
    gameId?: number | null;
    gameName?: string | null;
}

export function SearchTournamentsResult({
    gameId,
    gameName,
}: SearchTournamentsResultProps) {
    const {
        setName,
        regionId,
        setRegionId,
        countryId,
        setCountryId,
        organizerType,
        setOrganizerType,
        typeId,
        setTypeId,
        status,
        setStatus,
        sortBy,
        setSortBy,
        setPage,
        result,
        totalPages,
        page,
        loading,
        error,
    } = useTournaments({ game_id: gameId });

    const { types } = useTournamentTypes();

    return (
        <div>
            <div className="flex items-center justify-between gap-4 mb-4">
                {gameName && (
                    <h2 className="text-xl font-bold">
                        Torneos de{" "}
                        <span className="text-btn-secondary">{gameName}</span>
                    </h2>
                )}
                {!gameName && (
                    <h2 className="text-xl font-bold">Torneos</h2>
                )}
            </div>

            <div className="mb-4">
                <SearchBar
                    compact
                    placeholder="Buscar torneo..."
                    onChange={setName}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Estado
                    </label>
                    <select
                        value={status ?? ""}
                        onChange={(e) =>
                            setStatus(
                                e.target.value
                                    ? (e.target.value as typeof status)
                                    : undefined
                            )
                        }
                        className="w-full h-10 rounded-lg border px-3 text-sm
                            bg-white dark:bg-zinc-900
                            border-zinc-300 dark:border-zinc-700
                            focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Todos</option>
                        <option value="active">Activos</option>
                        <option value="upcoming">Próximos</option>
                        <option value="finished">Finalizados</option>
                    </select>
                </div>

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
                        Quién organiza
                    </label>
                    <select
                        value={organizerType ?? ""}
                        onChange={(e) =>
                            setOrganizerType(
                                e.target.value
                                    ? (e.target.value as typeof organizerType)
                                    : undefined
                            )
                        }
                        className="w-full h-10 rounded-lg border px-3 text-sm
                            bg-white dark:bg-zinc-900
                            border-zinc-300 dark:border-zinc-700
                            focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Todos</option>
                        <option value="OFFICIAL">Oficial ALTV</option>
                        <option value="COMMUNITY">Comunidad</option>
                        <option value="INDEPENDENT">Organizador Independiente</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Tipo de torneo
                    </label>
                    <select
                        value={typeId ?? ""}
                        onChange={(e) =>
                            setTypeId(
                                e.target.value ? Number(e.target.value) : undefined
                            )
                        }
                        className="w-full h-10 rounded-lg border px-3 text-sm
                            bg-white dark:bg-zinc-900
                            border-zinc-300 dark:border-zinc-700
                            focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Todos</option>
                        {types.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>

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
                        <option value="start_date_asc">Fecha inicio (próximos)</option>
                        <option value="start_date_desc">Fecha inicio (recientes)</option>
                        <option value="name_asc">Nombre (A-Z)</option>
                        <option value="name_desc">Nombre (Z-A)</option>
                        <option value="newest">Más recientes</option>
                    </select>
                </div>
            </div>

            <div>
                {loading && (
                    <p className="text-sm text-gray-400">Cargando torneos...</p>
                )}
                {error && <p className="text-sm text-red-400">{error}</p>}

                {!loading && !error && result.data.length === 0 && (
                    <p className="text-sm text-gray-400">
                        No se encontraron torneos
                    </p>
                )}

                <div className="flex flex-col gap-2">
                    {result.data.map((tournament) => (
                        <TournamentResult
                            key={tournament.id}
                            tournament={tournament}
                        />
                    ))}
                </div>

                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
}
