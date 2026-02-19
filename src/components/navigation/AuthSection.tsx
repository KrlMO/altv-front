"use client";
import { useState } from "react";
import Link from "next/link";

export function AuthSection() {
    const [isLogged, setIsLogged] = useState(false); // luego viene del contexto

    if (!isLogged) {
        return (
            <Link
                href="/login"
                className="px-4 py-2 rounded-lg bg-btn-primary text-white hover:opacity-90 transition"
            >
                Iniciar sesión
            </Link>
        );
    }

    return (
        <div className="relative">
            <button className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-btn-primary" />
            </button>

            {/* Dropdown futuro */}
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-altv-maindark shadow-lg rounded-lg p-2">
                <Link href="/profile" className="block px-2 py-1 hover:bg-gray-100 dark:hover:bg-altv-darksecondary">
                    Mi cuenta
                </Link>
                <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 dark:hover:bg-altv-darksecondary">
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}
