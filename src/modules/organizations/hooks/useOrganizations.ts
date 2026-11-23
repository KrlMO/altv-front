"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { OrganizationItem } from "../models/organization.models";
import {
    createOrganization,
    fetchMyOrganizations,
} from "../services/organizations.service";

// organizations === undefined means the fetch is still in flight.
export function useMyOrganizations() {
    const { accessToken } = useAuth();
    const [organizations, setOrganizations] = useState<
        OrganizationItem[] | undefined
    >(undefined);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(() => {
        if (!accessToken) return;
        let cancelled = false;
        fetchMyOrganizations(accessToken)
            .then((data) => {
                if (!cancelled) setOrganizations(data);
            })
            .catch((err: Error) => {
                if (!cancelled) setError(err.message);
            });
        return () => {
            cancelled = true;
        };
    }, [accessToken]);

    useEffect(() => load(), [load]);

    return { organizations, loading: organizations === undefined, error, load };
}

export function useCreateOrganization(onCreated: () => void) {
    const { accessToken } = useAuth();
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const create = useCallback(
        async (name: string, description?: string) => {
            if (!accessToken) return;
            setCreating(true);
            setError(null);
            try {
                await createOrganization(accessToken, name, description);
                onCreated();
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Error al crear la organización"
                );
            } finally {
                setCreating(false);
            }
        },
        [accessToken, onCreated]
    );

    return { create, creating, error };
}
