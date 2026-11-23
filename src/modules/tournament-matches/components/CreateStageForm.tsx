"use client";

import { useState } from "react";
import { MainButton } from "@/components/ui/buttom/MainButton";
import { SecondaryButton } from "@/components/ui/buttom/SecondaryButton";
import {
    commonConfigFields,
    CreateStagePayload,
    stageFormatConfigFields,
    StageFormatDTO,
} from "../dto/stage.dto";

interface CreateStageFormProps {
    formats: StageFormatDTO[];
    nextOrder: number;
    disabled: boolean;
    onCreate: (payload: CreateStagePayload) => void;
}

const inputClass =
    "rounded-lg border border-zinc-300 px-3 py-2 text-sm bg-white " +
    "dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 " +
    "focus:outline-none focus:ring-2 focus:ring-btn-primary/50";

export function CreateStageForm({
    formats,
    nextOrder,
    disabled,
    onCreate,
}: CreateStageFormProps) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [formatCode, setFormatCode] = useState<string>(formats[0]?.code ?? "");
    const [config, setConfig] = useState<Record<string, string>>({});

    const fields = [
        ...commonConfigFields,
        ...(stageFormatConfigFields[formatCode] ?? []),
    ];

    function submit() {
        const numericConfig: Record<string, number> = {};
        for (const [k, v] of Object.entries(config)) {
            if (v !== "") numericConfig[k] = Number(v);
        }
        onCreate({
            format_code: formatCode,
            name: name.trim(),
            stage_order: nextOrder,
            config: numericConfig,
        });
        setName("");
        setConfig({});
        setOpen(false);
    }

    if (!open) {
        return (
            <MainButton
                type="button"
                onClick={() => setOpen(true)}
                disabled={disabled}
            >
                Crear etapa
            </MainButton>
        );
    }

    return (
        <form
            className="flex flex-col gap-3 rounded-xl border border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-altv-bgcontent"
            onSubmit={(e) => {
                e.preventDefault();
                submit();
            }}
        >
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre de la etapa (ej: Fase de grupos)"
                className={inputClass}
                required
            />
            <select
                value={formatCode}
                onChange={(e) => setFormatCode(e.target.value)}
                className={inputClass}
            >
                {formats.map((f) => (
                    <option key={f.id} value={f.code}>
                        {f.name}
                    </option>
                ))}
            </select>

            <div className="grid grid-cols-2 gap-3">
                {fields.map((f) => (
                    <label
                        key={f.key}
                        className="flex flex-col gap-1 text-xs text-zinc-500 dark:text-zinc-400"
                    >
                        {f.label}
                        <input
                            type="number"
                            min={f.min}
                            value={config[f.key] ?? ""}
                            onChange={(e) =>
                                setConfig((c) => ({ ...c, [f.key]: e.target.value }))
                            }
                            className={inputClass}
                        />
                    </label>
                ))}
            </div>

            <div className="flex gap-2">
                <MainButton type="submit" disabled={disabled || !name.trim()}>
                    Crear etapa
                </MainButton>
                <SecondaryButton type="button" onClick={() => setOpen(false)}>
                    Cancelar
                </SecondaryButton>
            </div>
        </form>
    );
}
