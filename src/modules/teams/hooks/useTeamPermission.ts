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
        load();
    }, [load]);

    const canAdminRosters =
        memberRole !== null && ADMIN_ROLES.includes(memberRole);

    return { memberRole, canAdminRosters, loading, reload: load };
}
