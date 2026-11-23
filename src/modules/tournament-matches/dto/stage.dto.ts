export interface CreateStagePayload {
    format_code: string;
    name: string;
    stage_order: number;
    config: Record<string, number>;
}

export interface StageFormatDTO {
    id: number;
    code: string;
    name: string;
    description: string | null;
}

export interface StageFormatConfigField {
    key: string;
    label: string;
    min: number;
}

// Client-side mirror of the backend stage format config specs so the form
// can render the right fields per format.
export const stageFormatConfigFields: Record<string, StageFormatConfigField[]> = {
    SWISS: [
        { key: "rounds", label: "Rondas", min: 1 },
        { key: "qualification_wins", label: "Victorias para clasificar", min: 1 },
        { key: "elimination_losses", label: "Derrotas para eliminar", min: 1 },
    ],
    GROUP_STAGE: [
        { key: "groups", label: "Cantidad de grupos", min: 1 },
        { key: "qualify_per_group", label: "Clasifican por grupo", min: 1 },
    ],
    SINGLE_ELIMINATION: [{ key: "byes", label: "Byes", min: 0 }],
    DOUBLE_ELIMINATION: [{ key: "byes", label: "Byes", min: 0 }],
};

export const commonConfigFields: StageFormatConfigField[] = [
    { key: "best_of", label: "Best of (1, 3, 5…)", min: 1 },
    { key: "teams_count", label: "Cantidad de equipos", min: 2 },
    { key: "advancing", label: "Clasifican", min: 1 },
];
