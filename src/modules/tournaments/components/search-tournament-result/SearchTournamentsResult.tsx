"use client";

import { useState } from "react";
import { SearchBar } from "@/components/navigation/SearchBar";
import { SelectCountry } from "@/modules/shared/country/components/SelectCountry";
import { SelectRegion } from "@/modules/shared/region/components/SelectRegion";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { ResultListSkeleton } from "@/components/ui/card/ResultListSkeleton";
import { useTournaments } from "../../hooks/useTournaments";
import { useTournamentTypes } from "../../hooks/useTournamentTypes";
import { TournamentResult } from "../tournament-result/TournamentResult";

interface SearchTournamentsResultProps {
    gameId?: number | null;
    gameName?: string | null;
}

const selectClass =
    "w-full h-10 rounded-lg border px-3 text-sm bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-btn-primary/60";

export function SearchTournamentsResult({
    gameId,
    gameName,
}: SearchTournamentsResultProps) {
    const [showFilters, setShowFilters] = useState(false);
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

    const activeFilters =
        (regionId !== undefined ? 1 : 0) +
        (countryId !== undefined ? 1 : 0) +
        (organizerType !== undefined ? 1 : 0) +
        (typeId !== undefined ? 1 : 0);

    function clearFilters() {
        setRegionId(undefined);
        setCountryId(undefined);
        setOrganizerType(undefined);
        setTypeId(undefined);
    }

    const total = result.meta?.total ?? 0;

    return (
        <div>
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    {gameName ? (
                        <>
                            Torneos de{" "}
                            <span className="text-btn-primary">{gameName}</span>
                        </>
                    ) : (
                        "Torneos"
                    )}
                </h2>
                {!loading && !error && total > 0 && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {total} {total === 1 ? "torneo" : "torneos"}
                    </p>
                )}
            </div>

            <div className="mb-4">
                <SearchBar
                    compact
                    placeholder="Buscar torneo..."
                    onChange={setName}
                />
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-2">
                <select
                    value={status ?? ""}
                    onChange={(e) => {
                        setStatus(
                            e.target.value
                                ? (e.target.value as typeof status)
                                : undefined
                        );
                        setPage(1);
                    }}
                    aria-label="Estado del torneo"
                    className={`${selectClass} w-auto min-w-32`}
                >
                    <option value="">Todos los estados</option>
                    <option value="active">Activos</option>
                    <option value="upcoming">Próximos</option>
                    <option value="finished">Finalizados</option>
                </select>

                <button
                    type="button"
                    onClick={() => setShowFilters((v) => !v)}
                    aria-expanded={showFilters}
                    className={`flex h-10 items-center gap-1.5 rounded-lg border px-3 text-sm font-medium transition-colors ${
                        showFilters || activeFilters > 0
                            ? "border-btn-primary/50 text-btn-primary"
                            : "border-zinc-300 text-zinc-600 hover:border-btn-primary/50 hover:text-btn-primary dark:border-zinc-700 dark:text-zinc-300"
                    }`}
                >
                    Filtros
                    {activeFilters > 0 && (
                        <span className="rounded-full bg-btn-primary px-1.5 text-[10px] font-bold text-white">
                            {activeFilters}
                        </span>
                    )}
                    <span aria-hidden className="text-[10px]">
                        {showFilters ? "▲" : "▼"}
                    </span>
                </button>

                {activeFilters > 0 && (
                    <button
                        type="button"
                        onClick={clearFilters}
                        className="h-10 rounded-lg px-3 text-sm text-zinc-500 hover:text-btn-primary dark:text-zinc-400"
                    >
                        Limpiar filtros
                    </button>
                )}
            </div>

            {showFilters && (
                <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
                            className={selectClass}
                        >
                            <option value="">Todos</option>
                            <option value="OFFICIAL">Oficial ALTV</option>
                            <option value="COMMUNITY">Comunidad</option>
                            <option value="INDEPENDENT">
                                Organizador Independiente
                            </option>
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
                                    e.target.value
                                        ? Number(e.target.value)
                                        : undefined
                                )
                            }
                            className={selectClass}
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
                            className={selectClass}
                        >
                            <option value="start_date_asc">
                                Fecha inicio (próximos)
                            </option>
                            <option value="start_date_desc">
                                Fecha inicio (recientes)
                            </option>
                            <option value="name_asc">Nombre (A-Z)</option>
                            <option value="name_desc">Nombre (Z-A)</option>
                            <option value="newest">Más recientes</option>
                        </select>
                    </div>
                </div>
            )}

            <div>
                {loading && <ResultListSkeleton label="Cargando torneos" />}
                {error && <p className="text-sm text-red-400">{error}</p>}

                {!loading && !error && result.data.length === 0 && (
                    <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700">
                        <p className="font-medium text-zinc-700 dark:text-zinc-200">
                            No se encontraron torneos
                        </p>
                        <p className="max-w-sm text-xs text-zinc-500 dark:text-zinc-400">
                            Probá con otro término de búsqueda o ajustá los
                            filtros de estado y región.
                        </p>
                    </div>
                )}

                <div className="flex flex-col gap-2">
                    {result.data.map((tournament) => (
                        <TournamentResult
                            key={tournament.id}
                            tournament={tournament}
                        />
                    ))}
                </div>

                {result.data.length > 0 && (
                    <div className="mt-4">
                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
