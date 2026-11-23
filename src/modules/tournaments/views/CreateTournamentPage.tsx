"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { fetchMyOrganizations } from "@/modules/organizations/services/organizations.service";
import {
    createTournament,
    fetchGames,
} from "../services/tournaments-create.service";
import { OrganizationItem } from "@/modules/organizations/models/organization.models";

interface Game {
    id: number;
    name: string;
}

export function CreateTournamentPage() {
    const { accessToken } = useAuth();
    const router = useRouter();

    const [organizations, setOrganizations] = useState<
        OrganizationItem[] | undefined
    >(undefined);
    const [games, setGames] = useState<Game[] | undefined>(undefined);

    const [organizationId, setOrganizationId] = useState<string>("");
    const [gameId, setGameId] = useState<string>("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startAt, setStartAt] = useState("");
    const [endAt, setEndAt] = useState("");
    const [colorHex, setColorHex] = useState("#7c3aed");
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!accessToken) return;
        fetchMyOrganizations(accessToken)
            .then(setOrganizations)
            .catch((err: Error) => setError(err.message));
        fetchGames(accessToken)
            .then(setGames)
            .catch(() => setGames([]));
    }, [accessToken]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!accessToken || !organizationId || !gameId || !startAt) return;
        setCreating(true);
        setError(null);
        try {
            const id = await createTournament(accessToken, {
                organization_id: Number(organizationId),
                game_id: Number(gameId),
                name,
                description: description || undefined,
                start_at: new Date(startAt).toISOString(),
                end_at: endAt ? new Date(endAt).toISOString() : undefined,
                color_hex: colorHex || undefined,
                organizer_type: "COMMUNITY",
            });
            router.push(`/tournaments/${id}`);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Error al crear el torneo"
            );
        } finally {
            setCreating(false);
        }
    }

    if (!accessToken) {
        return (
            <p className="text-sm text-neutral-500">
                Iniciá sesión para crear un torneo.
            </p>
        );
    }

    const inputClass =
        "rounded border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm";

    return (
        <div className="flex max-w-xl flex-col gap-4">
            <h1 className="text-2xl font-bold">Crear torneo</h1>

            {organizations !== undefined && organizations.length === 0 && (
                <p className="text-sm text-neutral-500">
                    Necesitas una organización.{" "}
                    <Link
                        href="/app/organizations"
                        className="text-white underline"
                    >
                        Crea la tuya
                    </Link>{" "}
                    (plan gratuito: una organización y un torneo activo).
                </p>
            )}

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 rounded-lg border border-neutral-800 bg-neutral-900 p-4"
            >
                <select
                    value={organizationId}
                    onChange={(e) => setOrganizationId(e.target.value)}
                    className={inputClass}
                    required
                >
                    <option value="">Organización…</option>
                    {(organizations ?? []).map((o) => (
                        <option key={o.id} value={o.id}>
                            {o.name}
                        </option>
                    ))}
                </select>

                <select
                    value={gameId}
                    onChange={(e) => setGameId(e.target.value)}
                    className={inputClass}
                    required
                >
                    <option value="">Juego…</option>
                    {(games ?? []).map((g) => (
                        <option key={g.id} value={g.id}>
                            {g.name}
                        </option>
                    ))}
                </select>

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre del torneo"
                    className={inputClass}
                    required
                />

                <div className="flex gap-3">
                    <label className="flex flex-1 flex-col gap-1 text-xs text-neutral-400">
                        Inicio
                        <input
                            type="datetime-local"
                            value={startAt}
                            onChange={(e) => setStartAt(e.target.value)}
                            className={inputClass}
                            required
                        />
                    </label>
                    <label className="flex flex-1 flex-col gap-1 text-xs text-neutral-400">
                        Fin (opcional)
                        <input
                            type="datetime-local"
                            value={endAt}
                            onChange={(e) => setEndAt(e.target.value)}
                            className={inputClass}
                        />
                    </label>
                </div>

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descripción (opcional)"
                    rows={3}
                    className={inputClass}
                />

                <label className="flex items-center gap-2 text-xs text-neutral-400">
                    Color del torneo
                    <input
                        type="color"
                        value={colorHex}
                        onChange={(e) => setColorHex(e.target.value)}
                        className="h-8 w-12 rounded border border-neutral-700 bg-neutral-800"
                    />
                </label>

                <label className="flex items-center gap-2 text-xs text-neutral-400">
                    <input type="checkbox" disabled /> Torneo oficial
                    <span className="rounded bg-neutral-800 px-2 py-0.5 text-[10px] uppercase">
                        Próximamente
                    </span>
                </label>

                {error && <p className="text-sm text-red-400">{error}</p>}

                <button
                    type="submit"
                    disabled={
                        creating ||
                        !organizationId ||
                        !gameId ||
                        !name.trim() ||
                        !startAt
                    }
                    className="self-start rounded bg-white px-4 py-1.5 text-sm font-semibold text-black disabled:opacity-40"
                >
                    {creating ? "Creando…" : "Crear torneo"}
                </button>
            </form>
        </div>
    );
}
