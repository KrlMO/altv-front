"use client";

import { MainButton } from "@/components/ui/buttom/MainButton";
import { TeamFormData } from "../../hooks/useTeamWizard";

interface SummaryStepProps {
    formData: TeamFormData;
    isNew: boolean;
    submitting: boolean;
    onPrev: () => void;
    onsubmit: () => void;
}

export function SummaryStep({
    formData,
    isNew,
    submitting,
    onPrev,
    onsubmit,
}: SummaryStepProps) {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Resumen
            </h2>

            <div className="flex flex-col gap-4">
                <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
                    <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-3">
                        Datos del Equipo
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <span className="text-xs text-zinc-400">Nombre</span>
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {formData.name}
                            </p>
                        </div>
                        <div>
                            <span className="text-xs text-zinc-400">Tag</span>
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {formData.tag}
                            </p>
                        </div>
                        <div className="sm:col-span-2">
                            <span className="text-xs text-zinc-400">Descripcion</span>
                            <p className="text-sm text-zinc-900 dark:text-zinc-100">
                                {formData.description || "Sin descripcion"}
                            </p>
                        </div>
                        <div>
                            <span className="text-xs text-zinc-400">Pais</span>
                            <div className="flex items-center gap-2">
                                {formData.country_iso && (
                                    <img
                                        src={`https://flagcdn.com/24x18/${formData.country_iso.toLowerCase()}.png`}
                                        alt={formData.country_name || ""}
                                        className="h-4"
                                    />
                                )}
                                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                    {formData.country_name || "Sin país"}
                                </p>
                            </div>
                        </div>
                        {formData.logo && (
                            <div>
                                <span className="text-xs text-zinc-400">Logo</span>
                                <p className="text-sm text-zinc-900 dark:text-zinc-100">
                                    {formData.logo.name}
                                </p>
                            </div>
                        )}
                        {formData.banner && (
                            <div>
                                <span className="text-xs text-zinc-400">Portada</span>
                                <p className="text-sm text-zinc-900 dark:text-zinc-100">
                                    {formData.banner.name}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex gap-3">
                <MainButton type="button" variant="secondary" onClick={onPrev} disabled={submitting}>
                    Anterior
                </MainButton>
                <MainButton type="button" onClick={onsubmit} disabled={submitting}>
                    {submitting ? "Guardando..." : isNew ? "Crear Equipo" : "Guardar Cambios"}
                </MainButton>
            </div>
        </div>
    );
}
