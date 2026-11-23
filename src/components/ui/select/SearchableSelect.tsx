"use client";

import { useEffect, useRef, useState } from "react";

interface SearchableSelectProps<T> {
    label: string;
    placeholder?: string;
    /** Search function called debounced with the current query. */
    search: (query: string) => Promise<T[]>;
    getLabel: (option: T) => string;
    getId: (option: T) => string | number;
    renderOption?: (option: T) => React.ReactNode;
    value: T | null;
    onChange: (option: T | null) => void;
    error?: string;
    emptyMessage?: string;
    debounceMs?: number;
}

const resultsLimit = 5;

export function SearchableSelect<T>({
    label,
    placeholder = "Buscar…",
    search,
    getLabel,
    getId,
    renderOption,
    value,
    onChange,
    error,
    emptyMessage = "Sin resultados",
    debounceMs = 300,
}: SearchableSelectProps<T>) {
    const [draft, setDraft] = useState<string | null>(null);
    const [results, setResults] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const query = draft ?? (value ? getLabel(value) : "");

    useEffect(() => {
        if (draft === null || !draft.trim()) return;

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(async () => {
            try {
                const found = await search(draft.trim());
                setResults(found.slice(0, resultsLimit));
            } catch {
                setSearchError("Error al buscar");
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, debounceMs);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [draft, search, debounceMs]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function select(option: T) {
        onChange(option);
        setDraft(null);
        setResults([]);
        setSearchError(null);
        setOpen(false);
    }

    function clear() {
        onChange(null);
        setDraft("");
        setResults([]);
        setLoading(false);
        setSearchError(null);
    }

    function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
        const next = e.target.value;
        setDraft(next);
        setSearchError(null);
        if (value) onChange(null);
        if (!next.trim()) {
            setLoading(false);
            setResults([]);
            return;
        }
        setLoading(true);
    }

    function handleFocus() {
        setOpen(true);
        if (value) setDraft("");
    }

    const showDropdown =
        open &&
        (loading ||
            searchError !== null ||
            results.length > 0 ||
            (draft !== null && draft.trim().length > 0));

    return (
        <div className="relative flex w-full flex-col gap-1" ref={containerRef}>
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {label}
                </label>
                {value && (
                    <button
                        type="button"
                        onClick={clear}
                        className="text-xs text-zinc-400 hover:text-btn-primary"
                    >
                        Limpiar
                    </button>
                )}
            </div>

            <input
                value={query}
                onFocus={handleFocus}
                onChange={handleQueryChange}
                placeholder={placeholder}
                role="combobox"
                aria-expanded={showDropdown}
                aria-controls="searchable-select-listbox"
                className={`
                    w-full
                    h-10
                    mt-1
                    rounded-lg border px-3 py-2 text-sm
                    bg-white dark:bg-zinc-900
                    border-zinc-300 dark:border-zinc-700
                    dark:text-zinc-100
                    focus:outline-none focus:ring-2 focus:ring-btn-primary/60
                    ${error || searchError ? "border-red-500 focus:ring-red-500" : ""}
                `}
            />

            {error && <span className="text-xs text-red-500">{error}</span>}

            {showDropdown && (
                <div
                    id="searchable-select-listbox"
                    className="absolute top-full z-30 mt-1 w-full overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-altv-bgcontent"
                >
                    {loading && (
                        <p className="px-3 py-2 text-xs text-zinc-400 dark:text-zinc-500">
                            Buscando…
                        </p>
                    )}
                    {searchError && !loading && (
                        <p className="px-3 py-2 text-xs text-red-400">{searchError}</p>
                    )}
                    {!loading && !searchError && results.length === 0 && (
                        <p className="px-3 py-2 text-xs text-zinc-400 dark:text-zinc-500">
                            {emptyMessage}
                        </p>
                    )}
                    {!loading &&
                        !searchError &&
                        results.map((option) => (
                            <button
                                key={getId(option)}
                                type="button"
                                onClick={() => select(option)}
                                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-zinc-800 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-altv-maindark"
                            >
                                {renderOption ? (
                                    renderOption(option)
                                ) : (
                                    <span>{getLabel(option)}</span>
                                )}
                            </button>
                        ))}
                </div>
            )}
        </div>
    );
}
