interface MainButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function MainButton({
  children,
  className,
  ...props
}: MainButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center
        rounded-[20px]
        bg-[#88008B] px-4 py-2
        text-sm font-medium text-white
        transition-colors
        hover:bg-[#6f0072]
        focus:outline-none focus:ring-2 focus:ring-[#88008B]/50
        disabled:cursor-not-allowed disabled:opacity-50
        ${className ?? ""}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
