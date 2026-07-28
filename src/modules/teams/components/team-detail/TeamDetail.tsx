"use client";

import { useEffect } from "react";
import { useTeamWizard } from "../../hooks/useTeamWizard";
import { StepIndicator } from "./StepIndicator";
import { TeamInfoStep } from "./TeamInfoStep";
import { RosterStep } from "./RosterStep";
import { SummaryStep } from "./SummaryStep";

interface TeamDetailProps {
    teamId: string | null;
    onSaved?: () => void;
}

export function TeamDetail({ teamId, onSaved }: TeamDetailProps) {
    const {
        step,
        formData,
        rosters,
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
        removeRoster,
        updateRoster,
        addRoster,
        submitAll,
    } = useTeamWizard(teamId);

    useEffect(() => {
        if (teamId) {
            loadTeam(teamId);
        } else {
            reset();
        }
    }, [teamId, loadTeam, reset]);

    const handleSubmit = async () => {
        const result = await submitAll();
        if (result) onSaved?.();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-sm text-zinc-400">Cargando equipo...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <StepIndicator
                currentStep={step}
                steps={[
                    { label: "Datos", step: 1 },
                    { label: "Roster", step: 2 },
                    { label: "Resumen", step: 3 },
                    { label: "Guardar", step: 4 },
                ]}
            />

            {step === 1 && (
                <TeamInfoStep
                    formData={formData}
                    isNew={isNew}
                    canProceed={canProceedFromStep1}
                    onUpdateField={updateField}
                    onNext={nextStep}
                />
            )}

            {step === 2 && (
                <RosterStep
                    rosters={rosters}
                    onAddRoster={addRoster}
                    onUpdateRoster={updateRoster}
                    onRemoveRoster={removeRoster}
                    onPrev={prevStep}
                    onNext={nextStep}
                />
            )}

            {step === 3 && (
                <SummaryStep
                    formData={formData}
                    rosters={rosters}
                    isNew={isNew}
                    submitting={submitting}
                    onPrev={prevStep}
                    onsubmit={handleSubmit}
                />
            )}

            {step === 4 && (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                    {submitting ? (
                        <p className="text-sm text-zinc-400">Guardando...</p>
                    ) : success ? (
                        <>
                            <p className="text-sm text-green-400">{success}</p>
                            <button
                                type="button"
                                onClick={reset}
                                className="text-sm text-[#88008B] hover:underline"
                            >
                                Crear otro equipo
                            </button>
                        </>
                    ) : error ? (
                        <>
                            <p className="text-sm text-red-400">{error}</p>
                            <button
                                type="button"
                                onClick={prevStep}
                                className="text-sm text-[#88008B] hover:underline"
                            >
                                Volver
                            </button>
                        </>
                    ) : null}
                </div>
            )}
        </div>
    );
}
