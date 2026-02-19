"use client";

import React from "react";

interface InputDateProps
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        "type"
    > {
    label: string;
    error?: string;
}

export function InputDate({
    label,
    error,
    className,
    ...props
}: InputDateProps) {
    return (
        <div className="flex w-full flex-col gap-1">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {label}
            </label>

            <input
                type="date"
                className={`
          w-full
          h-10
          mt-1
          rounded-lg border px-3 py-2 text-sm
          bg-white dark:bg-zinc-900
          border-zinc-300 dark:border-zinc-700
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          ${error ? "border-red-500 focus:ring-red-500" : ""}
          ${className ?? ""}
        `}
                {...props}
            />

            {error && (
                <span className="text-xs text-red-500">{error}</span>
            )}
        </div>
    );
}
