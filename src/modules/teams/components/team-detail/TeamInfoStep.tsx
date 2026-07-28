"use client";

import { useRef } from "react";
import { SelectCountry } from "@/modules/shared/country/components/SelectCountry";
import { MainButton } from "@/components/ui/buttom/MainButton";
import { TeamFormData } from "../../hooks/useTeamWizard";

interface TeamInfoStepProps {
    formData: TeamFormData;
    isNew: boolean;
    canProceed: boolean;
    onUpdateField: <K extends keyof TeamFormData>(field: K, value: TeamFormData[K]) => void;
    onNext: () => void;
}

export function TeamInfoStep({
    formData,
    isNew,
    canProceed,
    onUpdateField,
    onNext,
}: TeamInfoStepProps) {
    const logoInputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="flex flex-col gap-6">
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
                            onUpdateField("logo", e.target.files?.[0] ?? null)
                        }
                    />
                    <button
                        type="button"
                        onClick={() => logoInputRef.current?.click()}
                        className="w-full h-24 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-sm text-zinc-500 hover:border-[#88008B] hover:text-[#88008B] transition-colors"
                    >
                        {formData.logo ? formData.logo.name : "Subir logo"}
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
                            onUpdateField("cover", e.target.files?.[0] ?? null)
                        }
                    />
                    <button
                        type="button"
                        onClick={() => coverInputRef.current?.click()}
                        className="w-full h-24 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-sm text-zinc-500 hover:border-[#88008B] hover:text-[#88008B] transition-colors"
                    >
                        {formData.cover ? formData.cover.name : "Subir portada"}
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
                    onChange={(e) => onUpdateField("name", e.target.value)}
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
                    onChange={(e) => onUpdateField("tag", e.target.value)}
                    required
                    placeholder="TAG"
                    maxLength={10}
                    className="w-full h-10 rounded-lg border px-3 text-sm bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Descripcion
                </label>
                <textarea
                    value={formData.description}
                    onChange={(e) => onUpdateField("description", e.target.value)}
                    placeholder="Describe tu equipo..."
                    rows={4}
                    className="w-full rounded-lg border px-3 py-2 text-sm bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
            </div>

            <SelectCountry
                label="Pais *"
                value={formData.country_id}
                onChange={(val, name, iso) => {
                    onUpdateField("country_id", val);
                    onUpdateField("country_name", name);
                    onUpdateField("country_iso", iso);
                }}
            />

            <div className="flex gap-3">
                <MainButton type="button" onClick={onNext} disabled={!canProceed}>
                    Siguiente
                </MainButton>
            </div>
        </div>
    );
}
