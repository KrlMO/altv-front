"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { fetchMyOrganizations } from "@/modules/organizations/services/organizations.service";
import { OrganizationItem } from "@/modules/organizations/models/organization.models";
import { CreateTournamentWizard } from "../components/create-tournament/CreateTournamentWizard";

function CreateTournamentContent() {
    const { accessToken } = useAuth();
    const searchParams = useSearchParams();
    const organizationId = searchParams.get("organization_id");
    // undefined = still loading the preselected organization (if requested).
    const [preselectedOrganization, setPreselectedOrganization] = useState<
        OrganizationItem | null | undefined
    >(organizationId ? undefined : null);

    useEffect(() => {
        if (!accessToken || !organizationId) return;
        let cancelled = false;
        fetchMyOrganizations(accessToken)
            .then((orgs) => {
                if (!cancelled) {
                    setPreselectedOrganization(
                        orgs.find(
                            (org) => String(org.id) === organizationId
                        ) ?? null
                    );
                }
            })
            .catch(() => {
                if (!cancelled) setPreselectedOrganization(null);
            });
        return () => {
            cancelled = true;
        };
    }, [accessToken, organizationId]);

    if (preselectedOrganization === undefined) {
        return (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Cargando…</p>
        );
    }

    return <CreateTournamentWizard preselectedOrganization={preselectedOrganization} />;
}

export function CreateTournamentPage() {
    return (
        <div className="flex w-full flex-col items-center gap-6 py-4">
            <header className="w-full max-w-xl">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    Crear torneo
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Definí la información del torneo en tres pasos. Podrás
                    agregar bracket, formato e inscripción desde la gestión del
                    torneo.
                </p>
            </header>

            <Suspense fallback={<p className="text-sm text-zinc-500">Cargando…</p>}>
                <CreateTournamentContent />
            </Suspense>
        </div>
    );
}
