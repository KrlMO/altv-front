"use client";

import { useState } from "react";
import Link from "next/link";
import { createOrganization, fetchMyOrganizations } from "../services/organizations.service";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { OrganizationItem } from "../models/organization.models";

export function MyOrganizationsPage() {
    const { accessToken } = useAuth();
    const [organizations, setOrganizations] = useState<
        OrganizationItem[] | undefined
    >(undefined);
    const [loadError, setLoadError] = useState<string | null>(null);

    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [creating, setCreating] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    useEffect(() => {
        if (!accessToken) return;
        let cancelled = false;
        fetchMyOrganizations(accessToken)
            .then((data) => {
                if (!cancelled) {
                    setOrganizations(data);
                    setLoadError(null);
                }
            })
            .catch((err) => {
                if (!cancelled) {
                    setLoadError(
                        err instanceof Error
                            ? err.message
                            : "Error al cargar organizaciones"
                    );
                }
            });
        return () => {
            cancelled = true;
        };
    }, [accessToken]);

    function reload() {
        if (!accessToken) return;
        fetchMyOrganizations(accessToken)
            .then((data) => {
                setOrganizations(data);
                setLoadError(null);
            })
            .catch((err) =>
                setLoadError(
                    err instanceof Error
                        ? err.message
                        : "Error al cargar organizaciones"
                )
            );
    }

    async function handleCreate() {
        if (!name.trim() || !accessToken) return;
        setCreating(true);
        setFormError(null);
        try {
            await createOrganization(accessToken, name, description || undefined);
            setName("");
            setDescription("");
            setShowForm(false);
            reload();
        } catch (err) {
            setFormError(
                err instanceof Error ? err.message : "Error al crear la organización"
            );
        } finally {
            setCreating(false);
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Mis organizaciones</h1>
                <button
                    onClick={() => setShowForm((v) => !v)}
                    className="rounded bg-white px-4 py-1.5 text-sm font-semibold text-black"
                >
                    {showForm ? "Cancelar" : "Crear organización"}
                </button>
            </div>

            {showForm && (
                <form
                    className="flex flex-col gap-3 rounded-lg border border-neutral-800 bg-neutral-900 p-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleCreate();
                    }}
                >
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nombre de la organización"
                        className="rounded border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descripción (opcional)"
                        rows={3}
                        className="rounded border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm"
                    />
                    {formError && (
                        <p className="text-sm text-red-400">{formError}</p>
                    )}
                    <button
                        type="submit"
                        disabled={creating || !name.trim()}
                        className="self-start rounded bg-white px-4 py-1.5 text-sm font-semibold text-black disabled:opacity-40"
                    >
                        {creating ? "Creando…" : "Crear"}
                    </button>
                </form>
            )}

            {organizations === undefined && (
                <p className="text-sm text-neutral-500">Cargando…</p>
            )}
            {loadError && <p className="text-sm text-red-400">{loadError}</p>}

            {organizations && organizations.length === 0 && (
                <p className="text-sm text-neutral-500">
                    Todavía no perteneces a ninguna organización. Crea la tuya:
                    el plan gratuito te permite tener una.
                </p>
            )}

            {organizations && organizations.length > 0 && (
                <div className="flex flex-col gap-2">
                    {organizations.map((org) => (
                        <div
                            key={org.id}
                            className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900 p-3"
                        >
                            <div>
                                <p className="font-semibold">{org.name}</p>
                                <p className="text-xs text-neutral-500">
                                    {org.roles.join(", ")} · Plan gratuito
                                </p>
                            </div>
                            <Link
                                href={`/app/tournaments/new?organization_id=${org.id}`}
                                className="rounded border border-white px-3 py-1 text-xs font-semibold text-white"
                            >
                                Crear torneo
                            </Link>
                        </div>
                    ))}
                    <p className="text-xs text-neutral-500">
                        ¿Quieres más organizaciones u otras mejoras?{" "}
                        <span className="font-semibold text-neutral-400">
                            Próximamente
                        </span>
                    </p>
                </div>
            )}
        </div>
    );
}
