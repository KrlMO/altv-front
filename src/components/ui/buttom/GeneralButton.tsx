export interface GeneralButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    variant?: "primary" | "secondary";
}

export function GeneralButton({
    children,
    className,
    variant = "primary",
    ...props
}: GeneralButtonProps) {

    const baseStyles = `
    inline-flex items-center justify-center
    rounded-[20px]
    px-4 py-2
    text-sm font-medium
    transition-colors
    focus:outline-none focus:ring-2
    disabled:cursor-not-allowed disabled:opacity-50
  `;

    const variants = {
        primary: `
      bg-[#88008B] text-white
      hover:bg-[#6f0072]
      focus:ring-[#88008B]/50
    `,
        secondary: `
      bg-zinc-700 text-white
      hover:bg-zinc-600
      focus:ring-zinc-500/50
    `
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className ?? ""}`}
            {...props}
        >
            {children}
        </button>
    );
}