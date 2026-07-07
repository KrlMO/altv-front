"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { UserIcon } from "../ui/icons/UserIcon";

export function AuthSection() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!user) {
        return (
            <div className="flex items-center gap-2">
                <Link
                    href="/auth/login"
                    className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-altv-darksecondary transition"
                >
                    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-altv-darksecondary flex items-center justify-center">
                        <UserIcon
                            strokeWidth={1.4}
                            className="h-5 w-5 text-gray-600 dark:text-gray-300"
                        />
                    </div>
                    <span className="text-sm font-medium hidden sm:inline">Iniciar sesión</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-altv-darksecondary transition"
            >
                {user.profile_photo ? (
                    <img
                        src={user.profile_photo}
                        alt="Avatar"
                        className="h-8 w-8 rounded-full object-cover"
                    />
                ) : (
                    <div className="h-8 w-8 rounded-full bg-btn-primary flex items-center justify-center text-white text-sm font-semibold">
                        {user.nickname?.charAt(0).toUpperCase()}
                    </div>
                )}

                <span className="text-sm font-medium">
                    {user.nickname}
                </span>

                <span className="text-xs opacity-60">⌄</span>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-altv-maindark shadow-xl rounded-xl p-2 border border-gray-100 dark:border-altv-darksecondary">
                    <Link
                        href="/profile"
                        className="block px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-altv-darksecondary transition"
                    >
                        Mi cuenta
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-altv-darksecondary transition text-red-500"
                    >
                        Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    );
}