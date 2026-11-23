"use client";

import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
}

export function Textarea({ label, error, className, ...props }: TextareaProps) {
    return (
        <div className="flex w-full flex-col gap-1">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {label}
            </label>

            <textarea
                className={`
                    w-full
                    mt-1
                    rounded-lg border px-3 py-2 text-sm
                    bg-white dark:bg-zinc-900
                    border-zinc-300 dark:border-zinc-700
                    dark:text-zinc-100
                    focus:outline-none focus:ring-2 focus:ring-btn-primary/60
                    ${error ? "border-red-500 focus:ring-red-500" : ""}
                    ${className ?? ""}
                `}
                {...props}
            />

            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
}
