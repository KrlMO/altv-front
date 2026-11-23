"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { StepIndicator } from "@/components/ui/wizard/StepIndicator";
import { GeneralButton } from "@/components/ui/buttom/GeneralButton";
import { useTournamentWizard, TOTAL_STEPS } from "@/modules/tournaments/hooks/useTournamentWizard";
import { OrganizationItem } from "@/modules/organizations/models/organization.models";
import { TournamentInfoStep } from "./TournamentInfoStep";
import { TournamentDatesStep } from "./TournamentDatesStep";
import { TournamentCustomizeStep } from "./TournamentCustomizeStep";

const STEPS = [
    { label: "Información" },
    { label: "Fechas" },
    { label: "Personalización" },
];

export function CreateTournamentWizard({
    preselectedOrganization,
}: {
    preselectedOrganization: OrganizationItem | null;
}) {
    const { accessToken } = useAuth();
    const router = useRouter();
    const wizard = useTournamentWizard(preselectedOrganization);

    if (!accessToken) {
        return (
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-altv-bgcontent">
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    Iniciá sesión para crear un torneo.{" "}
                    <Link href="/login" className="font-medium text-btn-primary hover:underline">
                        Iniciar sesión
                    </Link>
                </p>
            </div>
        );
    }

    const stepError = wizard.stepErrors[wizard.step] ?? "";

    return (
        <div className="flex w-full max-w-xl flex-col gap-6">
            <StepIndicator
                currentStep={wizard.step}
                steps={STEPS}
                onStepClick={wizard.goToStep}
            />

            <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-altv-bgcontent">
                {wizard.step === 1 && (
                    <TournamentInfoStep
                        data={wizard.data}
                        error={stepError}
                        update={wizard.update}
                    />
                )}
                {wizard.step === 2 && (
                    <TournamentDatesStep
                        data={wizard.data}
                        error={stepError}
                        update={wizard.update}
                    />
                )}
                {wizard.step === 3 && (
                    <TournamentCustomizeStep
                        data={wizard.data}
                        error={stepError}
                        creating={wizard.creating}
                        update={wizard.update}
                        onBack={wizard.back}
                        onSubmit={() =>
                            wizard.submit((id) => router.push(`/tournaments/${id}`))
                        }
                    />
                )}

                {wizard.submitError && (
                    <p className="text-xs text-red-500">{wizard.submitError}</p>
                )}

                {wizard.step < TOTAL_STEPS && (
                    <div className="flex items-center justify-between">
                        <GeneralButton
                            variant="secondary"
                            type="button"
                            onClick={wizard.back}
                            disabled={wizard.step === 1}
                        >
                            Atrás
                        </GeneralButton>
                        <GeneralButton type="button" onClick={wizard.next}>
                            Continuar
                        </GeneralButton>
                    </div>
                )}
            </div>
        </div>
    );
}
