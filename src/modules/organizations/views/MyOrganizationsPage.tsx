"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
    useMyOrganizations,
    useCreateOrganization,
} from "../hooks/useOrganizations";
import { OrganizationCard } from "../components/OrganizationCard";
import { CreateOrganizationModal } from "../components/CreateOrganizationModal";
import { GeneralButton } from "@/components/ui/buttom/GeneralButton";

export function MyOrganizationsPage() {
    const { accessToken } = useAuth();
    const { organizations, loading, error, load } = useMyOrganizations();
    const [showCreateModal, setShowCreateModal] = useState(false);

    const { create, creating, error: createError } = useCreateOrganization(() => {
        setShowCreateModal(false);
    });

    async function handleCreate(name: string, description?: string) {
        if (!accessToken) return;
        await create(name, description);
        load();
    }

    return (
        <div className="flex w-full max-w-3xl mx-auto flex-col gap-6">
            <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                        Mis organizaciones
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Gestioná tus organizaciones y creá torneos con ellas.
                    </p>
                </div>
                <GeneralButton onClick={() => setShowCreateModal(true)}>
                    Crear organización
                </GeneralButton>
            </header>

            {loading && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Cargando…
                </p>
            )}

            {error && <p className="text-sm text-red-400">{error}</p>}

            {organizations && organizations.length === 0 && (
                <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center dark:border-zinc-700 dark:bg-altv-bgcontent">
                    <p className="font-medium text-zinc-700 dark:text-zinc-200">
                        Todavía no pertenecés a ninguna organización
                    </p>
                    <p className="max-w-sm text-xs text-zinc-500 dark:text-zinc-400">
                        Crea la tuya: el plan gratuito te permite tener una
                        organización y un torneo activo.
                    </p>
                    <GeneralButton onClick={() => setShowCreateModal(true)}>
                        Crear la primera
                    </GeneralButton>
                </div>
            )}

            {organizations && organizations.length > 0 && (
                <div className="flex flex-col gap-3">
                    {organizations.map((org) => (
                        <OrganizationCard key={org.id} organization={org} />
                    ))}
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        ¿Querés más organizaciones u otras mejoras?{" "}
                        <span className="font-semibold text-zinc-400 dark:text-zinc-500">
                            Próximamente
                        </span>
                    </p>
                </div>
            )}

            <CreateOrganizationModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                creating={creating}
                error={createError}
                onCreate={handleCreate}
            />
        </div>
    );
}
