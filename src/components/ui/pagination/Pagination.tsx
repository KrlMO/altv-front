interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-4">
            <button
                type="button"
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
                className="px-3 py-1 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 
                    disabled:opacity-40 disabled:cursor-not-allowed
                    hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
            >
                Anterior
            </button>

            <span className="text-sm text-zinc-600 dark:text-zinc-400 px-2">
                {page} / {totalPages}
            </span>

            <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => onPageChange(page + 1)}
                className="px-3 py-1 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 
                    disabled:opacity-40 disabled:cursor-not-allowed
                    hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
            >
                Siguiente
            </button>
        </div>
    );
}
