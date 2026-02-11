"use client";

import { useCountries } from "../hooks/useCountries";

interface SelectCountryProps {
    label: string;
    value?: number;
    onChange?: (value: number | undefined) => void;
    error?: string;
}

export function SelectCountry({
    label,
    value,
    onChange,
    error,
}: SelectCountryProps) {
    const { countries, loading } = useCountries();
    const selectedCountry = countries.find(c => c.id === value);

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
                className={`
          w-full
          h-10
          mt-1
          rounded-lg border px-3 text-sm
          bg-white dark:bg-zinc-900
          border-zinc-300 dark:border-zinc-700
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          ${error ? "border-red-500 focus:ring-red-500" : ""}
        `}
            >
                <option value="" disabled>
                    {loading ? "Cargando países..." : "Selecciona un país"}
                </option>

                {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                        {country.name}
                    </option>
                ))}
            </select>
            {selectedCountry && selectedCountry.flag_path && (
                <div className="mt-2 flex items-center gap-2">
                    <img
                        src={selectedCountry.flag_path}
                        alt={selectedCountry.name}
                        className="h-5 w-7 object-cover rounded-sm"
                    />
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {selectedCountry.name}
                    </span>
                </div>
            )}


            {error && (
                <span className="text-xs text-red-500">{error}</span>
            )}
        </div>
    );
}
