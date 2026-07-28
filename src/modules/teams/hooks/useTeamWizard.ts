"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { Team } from "../models/teams";
import { PlayerSearchResult } from "@/modules/users/models/users.models";
import {
    CreateTeamRequestDTO,
    UpdateTeamRequestDTO,
    RosterEntryDTO,
} from "../dto/teams.dto";
import {
    fetchTeamById,
    createTeam,
    updateTeam,
} from "../services/teams.service";

export type WizardStep = 1 | 2 | 3 | 4;

export type TeamRole = "PLAYER" | "COACH" | "ANALYST" | "STAFF" | "TEAM_CAPTAIN";

export interface TeamFormData {
    name: string;
    tag: string;
    description: string;
    country_id: number | undefined;
    country_name?: string;
    country_iso?: string;
    logo: File | null;
    cover: File | null;
}

export interface RosterPlayer {
    player: PlayerSearchResult;
    jerseyPhoto: File | null;
    roleId: string | null;
    teamRole: TeamRole;
}

export interface RosterEntry {
    gameName: string;
    gameId: string;
    players: RosterPlayer[];
}

const emptyForm: TeamFormData = {
    name: "",
    tag: "",
    description: "",
    country_id: undefined,
    logo: null,
    cover: null,
};

const STEP_LABELS: Record<WizardStep, string> = {
    1: "Datos del Equipo",
    2: "Añadir Roster",
    3: "Resumen",
    4: "Guardar",
};

export function useTeamWizard(teamId: string | null) {
    const { accessToken } = useAuth();

    const [step, setStep] = useState<WizardStep>(1);
    const [formData, setFormData] = useState<TeamFormData>(emptyForm);
    const [rosters, setRosters] = useState<RosterEntry[]>([]);
    const [existingTeam, setExistingTeam] = useState<Team | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const isNew = !teamId;

    const loadTeam = useCallback(async (id: string) => {
        if (!accessToken) return;
        try {
            setLoading(true);
            setError(null);
            const team = await fetchTeamById(id, accessToken);
            if (!team) {
                setError("Equipo no encontrado");
                return;
            }
            setExistingTeam(team);
            setFormData({
                name: team.name,
                tag: team.tag,
                description: team.description,
                country_id: team.country_id,
                country_name: team.country,
                country_iso: team.country_iso,
                logo: null,
                cover: null,
            });
            const mappedRosters: RosterEntry[] = team.teamGames.map((tg) => ({
                gameName: tg.gameName,
                gameId: tg.gameId,
                players: tg.roster.map((r) => ({
                    player: {
                        id: r.userId,
                        username: "",
                        firstName: "",
                        lastName: "",
                        avatar: "",
                        country: { id: 0, name: "", isoCode: "", flagPath: "" },
                        countryCode: "",
                        birthDate: "",
                    },
                    jerseyPhoto: null,
                    roleId: r.role || null,
                    teamRole: (r.teamRole as TeamRole) || "PLAYER",
                })),
            }));
            setRosters(mappedRosters);
        } catch {
            setError("Error al cargar el equipo");
        } finally {
            setLoading(false);
        }
    }, [accessToken]);

    const reset = useCallback(() => {
        setStep(1);
        setFormData(emptyForm);
        setRosters([]);
        setExistingTeam(null);
        setError(null);
        setSuccess(null);
    }, []);

    const updateField = useCallback(
        <K extends keyof TeamFormData>(field: K, value: TeamFormData[K]) => {
            setFormData((prev) => ({ ...prev, [field]: value }));
        },
        []
    );

    const nextStep = useCallback(() => {
        setStep((prev) => Math.min(prev + 1, 4) as WizardStep);
    }, []);

    const prevStep = useCallback(() => {
        setStep((prev) => Math.max(prev - 1, 1) as WizardStep);
    }, []);

    const goToStep = useCallback((target: WizardStep) => {
        setStep(target);
    }, []);

    const addRoster = useCallback((entry: RosterEntry) => {
        setRosters((prev) => [...prev, entry]);
    }, []);

    const updateRoster = useCallback((index: number, entry: RosterEntry) => {
        setRosters((prev) => prev.map((r, i) => (i === index ? entry : r)));
    }, []);

    const removeRoster = useCallback((index: number) => {
        setRosters((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const canProceedFromStep1 = formData.name.trim() !== "" && formData.tag.trim() !== "" && formData.country_id !== undefined;

    const buildRostersDTO = (): RosterEntryDTO[] | undefined => {
        if (rosters.length === 0) return undefined;
        return rosters.map((roster) => ({
            game_id: roster.gameId,
            members: roster.players.map((rp) => ({
                user_id: rp.player.id,
                role: rp.roleId || undefined,
                team_role: rp.teamRole,
                jersey_photo: rp.jerseyPhoto || undefined,
            })),
        }));
    };

    const submitAll = useCallback(async () => {
        try {
            setSubmitting(true);
            setError(null);
            setSuccess(null);

            let savedTeamId = teamId;

            if (teamId && existingTeam) {
                const dto: UpdateTeamRequestDTO = {};
                if (formData.name !== existingTeam.name) dto.name = formData.name;
                if (formData.tag !== existingTeam.tag) dto.tag = formData.tag;
                if (formData.description !== existingTeam.description)
                    dto.description = formData.description;
                if (formData.country_id !== existingTeam.country_id)
                    dto.country_id = formData.country_id!;
                if (formData.logo) dto.logo = formData.logo;
                if (formData.cover) dto.banner = formData.cover;

                const rostersDTO = buildRostersDTO();
                if (rostersDTO) dto.rosters = rostersDTO;

                await updateTeam(teamId, dto, accessToken ?? "");
            } else {
                const dto: CreateTeamRequestDTO = {
                    name: formData.name,
                    tag: formData.tag,
                    description: formData.description,
                    country_id: formData.country_id!,
                };
                if (formData.logo) dto.logo = formData.logo;
                if (formData.cover) dto.banner = formData.cover;

                const rostersDTO = buildRostersDTO();
                if (rostersDTO) dto.rosters = rostersDTO;

                const created = await createTeam(dto, accessToken ?? "");
                savedTeamId = created.id;
            }

            setSuccess("Equipo guardado correctamente");
            return savedTeamId;
        } catch {
            setError("Error al guardar el equipo");
            return null;
        } finally {
            setSubmitting(false);
        }
    }, [teamId, existingTeam, formData, accessToken, buildRostersDTO]);

    return {
        step,
        stepLabel: STEP_LABELS[step],
        formData,
        rosters,
        existingTeam,
        loading,
        submitting,
        error,
        success,
        isNew,
        canProceedFromStep1,
        loadTeam,
        reset,
        updateField,
        nextStep,
        prevStep,
        goToStep,
        addRoster,
        updateRoster,
        removeRoster,
        submitAll,
    };
}
