"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchMyTeams } from "../services/teams.service";

export type TeamMemberRole = "TEAM_OWNER" | "TEAM_MANAGER" | "TEAM_STAFF";

const ADMIN_ROLES: TeamMemberRole[] = ["TEAM_OWNER", "TEAM_MANAGER"];

export function useTeamPermission(teamId: string | null) {
    const { accessToken } = useAuth();
    const [memberRole, setMemberRole] = useState<TeamMemberRole | null>(null);
    const [loading, setLoading] = useState(false);

    const load = useCallback(async () => {
        if (!accessToken || !teamId) {
            setMemberRole(null);
            return;
        }
        try {
            setLoading(true);
            const teams = await fetchMyTeams(accessToken);
            const team = teams.find((t) => t.id === teamId);
            setMemberRole((team?.member_role as TeamMemberRole) || null);
        } catch {
            setMemberRole(null);
        } finally {
            setLoading(false);
        }
    }, [accessToken, teamId]);

    useEffect(() => {
        if (!accessToken || !teamId) return;
        let cancelled = false;
        (async () => {
            try {
                const teams = await fetchMyTeams(accessToken);
                if (cancelled) return;
                const team = teams.find((t) => t.id === teamId);
                setMemberRole((team?.member_role as TeamMemberRole) || null);
            } catch {
                if (!cancelled) setMemberRole(null);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [accessToken, teamId]);

    // Derived: no team selected means no role.
    const effectiveRole = teamId ? memberRole : null;
    const canAdminRosters =
        effectiveRole !== null && ADMIN_ROLES.includes(effectiveRole);

    return { memberRole: effectiveRole, canAdminRosters, loading, reload: load };
}
