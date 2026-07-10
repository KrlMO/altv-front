"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { Team, CreateTeamDTO, UpdateTeamDTO } from "../models/teams";
import {
    fetchTeamById,
    createTeam,
    updateTeam,
} from "../services/teams.service";

interface TeamFormData {
    name: string;
    tag: string;
    description: string;
    country_id: number | undefined;
    logo: File | null;
    cover: File | null;
}

const emptyForm: TeamFormData = {
    name: "",
    tag: "",
    description: "",
    country_id: undefined,
    logo: null,
    cover: null,
};

export function useTeamForm() {
    const { accessToken } = useAuth();
    const [teamId, setTeamId] = useState<string | null>(null);
    const [formData, setFormData] = useState<TeamFormData>(emptyForm);
    const [initialData, setInitialData] = useState<Team | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const loadTeam = useCallback(async (id: string) => {
        if (!accessToken) return;
        try {
            setLoading(true);
            setError(null);
            setSuccess(null);
            const team = await fetchTeamById(id, accessToken);
            if (!team) {
                setError("Equipo no encontrado");
                return;
            }
            setTeamId(id);
            setInitialData(team);
            setFormData({
                name: team.name,
                tag: team.tag,
                description: team.description,
                country_id: team.country_id,
                logo: null,
                cover: null,
            });
        } catch {
            setError("Error al cargar el equipo");
        } finally {
            setLoading(false);
        }
    }, [accessToken]);

    const reset = useCallback(() => {
        setTeamId(null);
        setFormData(emptyForm);
        setInitialData(null);
        setError(null);
        setSuccess(null);
    }, []);

    const updateField = useCallback(
        <K extends keyof TeamFormData>(field: K, value: TeamFormData[K]) => {
            setFormData((prev) => ({ ...prev, [field]: value }));
        },
        []
    );

    const isDirty = (() => {
        if (!initialData && !teamId) {
            return (
                formData.name !== "" ||
                formData.tag !== "" ||
                formData.description !== "" ||
                formData.country_id !== undefined ||
                formData.logo !== null ||
                formData.cover !== null
            );
        }
        if (!initialData) return false;
        return (
            formData.name !== initialData.name ||
            formData.tag !== initialData.tag ||
            formData.description !== initialData.description ||
            formData.country_id !== initialData.country_id ||
            formData.logo !== null ||
            formData.cover !== null
        );
    })();

    const submit = useCallback(async () => {
        try {
            setSubmitting(true);
            setError(null);
            setSuccess(null);

            if (teamId && initialData) {
                const dto: UpdateTeamDTO = {};
                if (formData.name !== initialData.name) dto.name = formData.name;
                if (formData.tag !== initialData.tag) dto.tag = formData.tag;
                if (formData.description !== initialData.description)
                    dto.description = formData.description;
                if (formData.country_id !== initialData.country_id)
                    dto.country_id = formData.country_id!;
                if (formData.logo) dto.logo = formData.logo;
                if (formData.cover) dto.cover = formData.cover;

                await updateTeam(teamId, dto, accessToken ?? "");
                setSuccess("Equipo actualizado correctamente");
            } else {
                const dto: CreateTeamDTO = {
                    name: formData.name,
                    tag: formData.tag,
                    description: formData.description,
                    country_id: formData.country_id!,
                };
                if (formData.logo) dto.logo = formData.logo;
                if (formData.cover) dto.cover = formData.cover;

                const created = await createTeam(dto, accessToken ?? "");
                setTeamId(created.id);
                setInitialData(created);
                setSuccess("Equipo creado correctamente");
            }
        } catch {
            setError(
                teamId
                    ? "Error al actualizar el equipo"
                    : "Error al crear el equipo"
            );
        } finally {
            setSubmitting(false);
        }
    }, [teamId, initialData, formData, accessToken]);

    return {
        teamId,
        formData,
        loading,
        submitting,
        error,
        success,
        isDirty,
        isNew: !teamId,
        loadTeam,
        reset,
        updateField,
        submit,
    };
}
