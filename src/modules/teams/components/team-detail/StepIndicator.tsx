import { WizardStep } from "../../hooks/useTeamWizard";

interface StepIndicatorProps {
    currentStep: WizardStep;
    steps: { label: string; step: WizardStep }[];
    onStepClick?: (step: WizardStep) => void;
}

export function StepIndicator({ currentStep, steps, onStepClick }: StepIndicatorProps) {
    return (
        <div className="flex items-center gap-2">
            {steps.map((s, i) => {
                const isActive = s.step === currentStep;
                const isCompleted = s.step < currentStep;

                return (
                    <div key={s.step} className="flex items-center gap-2">
                        {i > 0 && (
                            <div
                                className={`w-6 h-px ${
                                    isCompleted
                                        ? "bg-[#88008B]"
                                        : "bg-zinc-300 dark:bg-zinc-700"
                                }`}
                            />
                        )}
                        <button
                            type="button"
                            onClick={() => onStepClick?.(s.step)}
                            disabled={!isCompleted}
                            className={`flex items-center gap-2 text-xs font-medium transition-colors ${
                                isActive
                                    ? "text-[#88008B]"
                                    : isCompleted
                                      ? "text-zinc-900 dark:text-zinc-100 cursor-pointer hover:text-[#88008B]"
                                      : "text-zinc-400 dark:text-zinc-600 cursor-not-allowed"
                            }`}
                        >
                            <span
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                    isActive
                                        ? "bg-[#88008B] text-white"
                                        : isCompleted
                                          ? "bg-[#88008B]/20 text-[#88008B]"
                                          : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400"
                                }`}
                            >
                                {isCompleted ? "\u2713" : s.step}
                            </span>
                            <span className="hidden sm:inline">{s.label}</span>
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
