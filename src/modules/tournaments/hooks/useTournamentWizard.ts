"use client";

import { useCallback, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { createTournament } from "../services/tournaments-create.service";
import { Game } from "@/modules/team_games/models/game.models";
import { OrganizationItem } from "@/modules/organizations/models/organization.models";

export const TOTAL_STEPS = 3;

export interface TournamentFormData {
    organization: OrganizationItem | null;
    game: Game | null;
    name: string;
    description: string;
    startAt: string;
    endAt: string;
    colorHex: string;
}

const initialData: TournamentFormData = {
    organization: null,
    game: null,
    name: "",
    description: "",
    startAt: "",
    endAt: "",
    colorHex: "#88008B",
};

export function useTournamentWizard(
    initialOrganization: OrganizationItem | null = null
) {
    const { accessToken } = useAuth();
    const [step, setStep] = useState(1);
    const [data, setData] = useState<TournamentFormData>({
        ...initialData,
        organization: initialOrganization,
    });
    const [stepErrors, setStepErrors] = useState<Record<number, string>>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [creating, setCreating] = useState(false);

    function update<K extends keyof TournamentFormData>(
        key: K,
        value: TournamentFormData[K]
    ) {
        setData((prev) => ({ ...prev, [key]: value }));
        setStepErrors((prev) => ({ ...prev, [step]: "" }));
    }

    function validateStep(current: number, d: TournamentFormData): string {
        if (current === 1) {
            if (!d.organization) return "Seleccioná una organización.";
            if (!d.game) return "Seleccioná un juego.";
            if (!d.name.trim()) return "El nombre del torneo es obligatorio.";
        }
        if (current === 2) {
            if (!d.startAt) return "La fecha de inicio es obligatoria.";
            if (d.endAt && new Date(d.endAt) <= new Date(d.startAt)) {
                return "La fecha de fin debe ser posterior a la de inicio.";
            }
        }
        return "";
    }

    const next = useCallback(() => {
        const error = validateStep(step, data);
        if (error) {
            setStepErrors((prev) => ({ ...prev, [step]: error }));
            return;
        }
        setStepErrors((prev) => ({ ...prev, [step]: "" }));
        setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    }, [step, data]);

    const back = useCallback(() => {
        setStep((prev) => Math.max(prev - 1, 1));
    }, []);

    const goToStep = useCallback(
        (target: number) => {
            // Allow jumping back freely; forward requires validating every step up to target.
            if (target < step) {
                setStep(target);
                return;
            }
            for (let s = step; s < target; s++) {
                const error = validateStep(s, data);
                if (error) {
                    setStep(s);
                    setStepErrors((prev) => ({ ...prev, [s]: error }));
                    return;
                }
            }
            setStep(target);
        },
        [step, data]
    );

    const submit = useCallback(
        async (onCreated: (id: number) => void) => {
            for (let s = 1; s < TOTAL_STEPS; s++) {
                const error = validateStep(s, data);
                if (error) {
                    setStep(s);
                    setStepErrors((prev) => ({ ...prev, [s]: error }));
                    return;
                }
            }
            if (!accessToken) return;
            setCreating(true);
            setSubmitError(null);
            try {
                const id = await createTournament(accessToken, {
                    organization_id: data.organization!.id,
                    game_id: data.game!.id,
                    name: data.name.trim(),
                    description: data.description.trim() || undefined,
                    start_at: new Date(data.startAt).toISOString(),
                    end_at: data.endAt
                        ? new Date(data.endAt).toISOString()
                        : undefined,
                    color_hex: data.colorHex || undefined,
                    organizer_type: "COMMUNITY",
                });
                onCreated(id);
            } catch (err) {
                setSubmitError(
                    err instanceof Error
                        ? err.message
                        : "Error al crear el torneo"
                );
            } finally {
                setCreating(false);
            }
        },
        [accessToken, data]
    );

    return {
        step,
        data,
        stepErrors,
        submitError,
        creating,
        update,
        next,
        back,
        goToStep,
        submit,
    };
}
