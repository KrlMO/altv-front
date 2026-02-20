"use client";
import { useState } from "react";
import Link from "next/link";
import { UserIcon } from "../ui/icons/UserIcon";

export function AuthSection() {
    const [isLogged, setIsLogged] = useState(false);

    if (!isLogged) {
        return (
            <div className="flex items-center gap-2">
                <UserIcon strokeWidth={1.4} className="h-17 w-17 text-gray-700 dark:text-ciangreen" />
                <Link
                    href="/auth/login"
                    className="px-4 py-2 rounded-[20px] bg-btn-primary text-white hover:opacity-90 transition"
                >
                    Iniciar sesión
                </Link>
            </div>
        );
    }

    return (
        <div className="relative">
            <button className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-btn-primary" />
            </button>

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
