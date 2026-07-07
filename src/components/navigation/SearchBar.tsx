"use client";
import { useState } from "react";

export function SearchBar({
    className,
    placeholder = "Buscar jugador, equipo o torneo...",
    onChange,
    compact,
}: {
    className?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    compact?: boolean;
}) {
    const [query, setQuery] = useState("");

    const handleChange = (value: string) => {
        setQuery(value);
        onChange?.(value);
    };

    return (
        <div className={`relative ${className}`}>
            <input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(e) => handleChange(e.target.value)}
                className={`w-full ${compact ? "px-3 py-1.5 text-sm" : "px-4 py-2"} rounded-lg bg-[#D9D9D9] dark:bg-altv-darksecondary
        focus:outline-none focus:ring-2 focus:ring-btn-secondary transition`}
            />
        </div>
    );
}