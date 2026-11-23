"use client";

interface StepIndicatorProps {
    currentStep: number;
    steps: { label: string }[];
    onStepClick?: (step: number) => void;
}

export function StepIndicator({ currentStep, steps, onStepClick }: StepIndicatorProps) {
    return (
        <div className="flex items-center gap-2">
            {steps.map((s, i) => {
                const step = i + 1;
                const isActive = step === currentStep;
                const isCompleted = step < currentStep;

                return (
                    <div key={step} className="flex items-center gap-2">
                        {i > 0 && (
                            <div
                                className={`w-6 h-px ${
                                    isCompleted
                                        ? "bg-btn-primary"
                                        : "bg-zinc-300 dark:bg-zinc-700"
                                }`}
                            />
                        )}
                        <button
                            type="button"
                            onClick={() => onStepClick?.(step)}
                            disabled={!isCompleted}
                            className={`flex items-center gap-2 text-xs font-medium transition-colors ${
                                isActive
                                    ? "text-btn-primary"
                                    : isCompleted
                                      ? "text-zinc-900 dark:text-zinc-100 cursor-pointer hover:text-btn-primary"
                                      : "text-zinc-400 dark:text-zinc-600 cursor-not-allowed"
                            }`}
                        >
                            <span
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                    isActive
                                        ? "bg-btn-primary text-white"
                                        : isCompleted
                                          ? "bg-btn-primary/20 text-btn-primary"
                                          : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400"
                                }`}
                            >
                                {isCompleted ? "\u2713" : step}
                            </span>
                            <span className="hidden sm:inline">{s.label}</span>
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
