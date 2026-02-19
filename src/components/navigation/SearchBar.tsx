"use client";
import { useState } from "react";

export function SearchBar() {
    const [query, setQuery] = useState("");

    return (
        <div className="relative w-96">
            <input
                type="text"
                placeholder="Buscar jugador, equipo o torneo..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-[30px] bg-[#D9D9D9] dark:bg-altv-darksecondary
                   focus:outline-none focus:ring-2 focus:ring-btn-secondary transition"
            />

            {query && (
                <div className="absolute top-12 w-full bg-white dark:bg-altv-maindark shadow-lg rounded-lg p-2">
                    Resultados aparecerán aquí
                </div>
            )}
        </div>
    );
}
