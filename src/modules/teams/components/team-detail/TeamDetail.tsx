"use client";

import { useEffect } from "react";
import { useTeamWizard } from "../../hooks/useTeamWizard";
import { useTeamPermission } from "../../hooks/useTeamPermission";
import { useTeamRosters } from "../../hooks/useTeamRosters";
import { StepIndicator } from "./StepIndicator";
import { TeamInfoStep } from "./TeamInfoStep";
import { RosterStep } from "./RosterStep";
import { SummaryStep } from "./SummaryStep";

interface TeamDetailProps {
    teamId: string | null;
    onSaved?: () => void;
}

export function TeamDetail({ teamId, onSaved }: TeamDetailProps) {
    const { canAdminRosters } = useTeamPermission(teamId);
    const {
        rosters,
        loading: rostersLoading,
        saving,
        deactivatingId,
        activatingId,
        error: rostersError,
        fetchMembers,
        addRoster,
        updateRoster,
        deactivateGame,
        activateGame,
    } = useTeamRosters(teamId);

    const showRostersStep = !!teamId && canAdminRosters;
    const totalSteps = showRostersStep ? 4 : 3;

    const {
        step,
        formData,
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
        submitAll,
    } = useTeamWizard(teamId, totalSteps);

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

    const steps = showRostersStep
        ? [
              { label: "Datos", step: 1 as const },
              { label: "Rosters", step: 2 as const },
              { label: "Resumen", step: 3 as const },
              { label: "Guardar", step: 4 as const },
          ]
        : [
              { label: "Datos", step: 1 as const },
              { label: "Resumen", step: 2 as const },
              { label: "Guardar", step: 3 as const },
          ];

    return (
        <div className="flex flex-col gap-6">
            <StepIndicator currentStep={step} steps={steps} />

            {step === 1 && (
                <TeamInfoStep
                    formData={formData}
                    isNew={isNew}
                    canProceed={canProceedFromStep1}
                    onUpdateField={updateField}
                    onNext={nextStep}
                />
            )}

            {step === 2 &&
                (showRostersStep ? (
                    <RosterStep
                        rosters={rosters}
                        loading={rostersLoading}
                        canManage={canAdminRosters}
                        saving={saving}
                        deactivatingId={deactivatingId}
                        activatingId={activatingId}
                        error={rostersError}
                        onFetchMembers={fetchMembers}
                        onAddRoster={addRoster}
                        onUpdateRoster={updateRoster}
                        onDeactivate={deactivateGame}
                        onActivate={activateGame}
                        onPrev={prevStep}
                        onNext={nextStep}
                    />
                ) : (
                    <SummaryStep
                        formData={formData}
                        isNew={isNew}
                        submitting={submitting}
                        onPrev={prevStep}
                        onsubmit={handleSubmit}
                    />
                ))}

            {showRostersStep && step === 3 && (
                <SummaryStep
                    formData={formData}
                    isNew={isNew}
                    submitting={submitting}
                    onPrev={prevStep}
                    onsubmit={handleSubmit}
                />
            )}

            {((showRostersStep && step === 4) || (!showRostersStep && step === 3)) && (
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
