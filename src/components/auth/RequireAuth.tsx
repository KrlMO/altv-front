"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface RequireAuthProps {
    children: ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
    const { user, authLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !user) {
            router.replace("/auth/login");
        }
    }, [authLoading, user, router]);

    if (authLoading) {
        return <p className="text-sm text-zinc-400 text-center py-8">Cargando...</p>;
    }

    if (!user) {
        return null;
    }

    return <>{children}</>;
}