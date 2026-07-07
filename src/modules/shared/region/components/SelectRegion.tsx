"use client";

import { useRegions } from "../hooks/useRegions";

interface SelectRegionProps {
    label: string;
    value?: number;
    onChange?: (value: number | undefined) => void;
    error?: string;
}

export function SelectRegion({ label, value, onChange, error }: SelectRegionProps) {
    const { regions, loading } = useRegions();

    return (
        <div className="flex w-full flex-col gap-1">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {label}
            </label>

            <select
                value={value ?? ""}
                onChange={(e) => {
                    const val = e.target.value;
                    onChange?.(val ? Number(val) : undefined);
                }}
                disabled={loading}
                className="w-full h-10 rounded-lg border px-3 text-sm
                    bg-white dark:bg-zinc-900
                    border-zinc-300 dark:border-zinc-700
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                    disabled:opacity-50"
            >
                <option value="" disabled>
                    {loading ? "Cargando regiones..." : "Selecciona una región"}
                </option>

                {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                        {region.name}
                    </option>
                ))}
            </select>

            {error && (
                <span className="text-xs text-red-500">{error}</span>
            )}
        </div>
    );
}
