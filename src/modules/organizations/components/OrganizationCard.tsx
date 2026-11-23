"use client";

import Link from "next/link";
import { GeneralButton } from "@/components/ui/buttom/GeneralButton";
import { OrganizationItem } from "../models/organization.models";

const ROLE_LABELS: Record<string, string> = {
    OWNER: "Propietario",
    ADMIN: "Administrador",
    MEMBER: "Miembro",
};

export function OrganizationCard({ organization }: { organization: OrganizationItem }) {
    return (
        <article className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-btn-primary/50 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-700 dark:bg-altv-bgcontent dark:hover:border-btn-primary">
            <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-zinc-900 dark:text-zinc-100">
                    {organization.name}
                </p>
                {organization.description && (
                    <p className="mt-0.5 line-clamp-1 text-xs text-zinc-500 dark:text-zinc-400">
                        {organization.description}
                    </p>
                )}
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    {organization.roles.map((role) => (
                        <span
                            key={role}
                            className="rounded-full bg-btn-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-btn-primary"
                        >
                            {ROLE_LABELS[role] ?? role}
                        </span>
                    ))}
                    <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                        Plan gratuito
                    </span>
                </div>
            </div>

            <div className="flex w-full shrink-0 sm:w-auto">
                <Link
                    href={`/app/tournaments/new?organization_id=${organization.id}`}
                    className="w-full sm:w-auto"
                >
                    <GeneralButton className="w-full sm:w-auto">
                        Crear torneo
                    </GeneralButton>
                </Link>
            </div>
        </article>
    );
}
