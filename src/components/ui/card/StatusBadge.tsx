interface StatusBadgeProps {
    status: string;
}

const STATUS_STYLES: Record<string, { label: string; className: string }> = {
    active: {
        label: "Activo",
        className: "bg-ciangreen/15 text-ciangreen border-ciangreen/30",
    },
    upcoming: {
        label: "Próximo",
        className: "bg-btn-primary/15 text-btn-primary border-btn-primary/30",
    },
    finished: {
        label: "Finalizado",
        className:
            "bg-zinc-200 text-zinc-500 border-zinc-300 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700",
    },
};

export function StatusBadge({ status }: StatusBadgeProps) {
    const style = STATUS_STYLES[status] ?? {
        label: status,
        className:
            "bg-zinc-200 text-zinc-500 border-zinc-300 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700",
    };

    return (
        <span
            className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${style.className}`}
        >
            {style.label}
        </span>
    );
}
