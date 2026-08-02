"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { Team } from "../models/teams";
import {
    CreateTeamRequestDTO,
    UpdateTeamRequestDTO,
} from "../dto/teams.dto";
import {
    fetchTeamById,
    createTeam,
    updateTeam,
} from "../services/teams.service";

export type WizardStep = 1 | 2 | 3 | 4;

export interface TeamFormData {
    name: string;
    tag: string;
    description: string;
    country_id: number | undefined;
    country_name?: string;
    country_iso?: string;
    logo: File | null;
    banner: File | null;
}

const emptyForm: TeamFormData = {
    name: "",
    tag: "",
    description: "",
    country_id: undefined,
    logo: null,
    banner: null,
};

export function useTeamWizard(teamId: string | null, totalSteps: number = 3) {
    const { accessToken } = useAuth();

    const [step, setStep] = useState<WizardStep>(1);
    const [formData, setFormData] = useState<TeamFormData>(emptyForm);
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
                banner: null,
            });
        } catch {
            setError("Error al cargar el equipo");
        } finally {
            setLoading(false);
        }
    }, [accessToken]);

    const reset = useCallback(() => {
        setStep(1);
        setFormData(emptyForm);
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
        setStep((prev) => Math.min(prev + 1, totalSteps) as WizardStep);
    }, [totalSteps]);

    const prevStep = useCallback(() => {
        setStep((prev) => Math.max(prev - 1, 1) as WizardStep);
    }, []);

    const goToStep = useCallback((target: WizardStep) => {
        setStep(target);
    }, []);

    const canProceedFromStep1 = formData.name.trim() !== "" && formData.tag.trim() !== "" && formData.country_id !== undefined;

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
                if (formData.banner) dto.banner = formData.banner;

                await updateTeam(teamId, dto, accessToken ?? "");
            } else {
                const dto: CreateTeamRequestDTO = {
                    name: formData.name,
                    tag: formData.tag,
                    description: formData.description,
                    country_id: formData.country_id!,
                };
                if (formData.logo) dto.logo = formData.logo;
                if (formData.banner) dto.banner = formData.banner;

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
    }, [teamId, existingTeam, formData, accessToken]);

    return {
        step,
        formData,
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
        submitAll,
    };
}
