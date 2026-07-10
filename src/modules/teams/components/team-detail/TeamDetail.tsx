"use client";

import { useEffect, useRef } from "react";
import { SelectCountry } from "@/modules/shared/country/components/SelectCountry";
import { MainButton } from "@/components/ui/buttom/MainButton";
import { useTeamForm } from "../../hooks/useTeamForm";

interface TeamDetailProps {
    teamId: string | null;
    onSaved?: () => void;
}

export function TeamDetail({ teamId, onSaved }: TeamDetailProps) {
    const {
        formData,
        loading,
        submitting,
        error,
        success,
        isNew,
        loadTeam,
        reset,
        updateField,
        submit,
    } = useTeamForm();

    const logoInputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (teamId) {
            loadTeam(teamId);
        } else {
            reset();
        }
    }, [teamId, loadTeam, reset]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await submit();
        if (!error) onSaved?.();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-sm text-zinc-400">Cargando equipo...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {isNew ? "Crear Equipo" : "Editar Equipo"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Logo del equipo
                    </label>
                    <input
                        ref={logoInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                            updateField("logo", e.target.files?.[0] ?? null)
                        }
                    />
                    <button
                        type="button"
                        onClick={() => logoInputRef.current?.click()}
                        className="w-full h-24 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-sm text-zinc-500 hover:border-[#88008B] hover:text-[#88008B] transition-colors"
                    >
                        {formData.logo
                            ? formData.logo.name
                            : "Subir logo"}
                    </button>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Portada del equipo
                    </label>
                    <input
                        ref={coverInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                            updateField("cover", e.target.files?.[0] ?? null)
                        }
                    />
                    <button
                        type="button"
                        onClick={() => coverInputRef.current?.click()}
                        className="w-full h-24 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-sm text-zinc-500 hover:border-[#88008B] hover:text-[#88008B] transition-colors"
                    >
                        {formData.cover
                            ? formData.cover.name
                            : "Subir portada"}
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Nombre del equipo *
                </label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    required
                    placeholder="Nombre del equipo"
                    className="w-full h-10 rounded-lg border px-3 text-sm bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Tag *
                </label>
                <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => updateField("tag", e.target.value)}
                    required
                    placeholder="TAG"
                    maxLength={10}
                    className="w-full h-10 rounded-lg border px-3 text-sm bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Descripción
                </label>
                <textarea
                    value={formData.description}
                    onChange={(e) =>
                        updateField("description", e.target.value)
                    }
                    placeholder="Describe tu equipo..."
                    rows={4}
                    className="w-full rounded-lg border px-3 py-2 text-sm bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
            </div>

            <SelectCountry
                label="País *"
                value={formData.country_id}
                onChange={(val) => updateField("country_id", val)}
            />

            {error && <p className="text-sm text-red-400">{error}</p>}
            {success && <p className="text-sm text-green-400">{success}</p>}

            <div className="flex gap-3">
                <MainButton type="submit" disabled={submitting}>
                    {submitting
                        ? "Guardando..."
                        : isNew
                          ? "Crear Equipo"
                          : "Guardar Cambios"}
                </MainButton>
                <MainButton
                    type="button"
                    variant="secondary"
                    onClick={reset}
                    disabled={submitting}
                >
                    Cancelar
                </MainButton>
            </div>
        </form>
    );
}
