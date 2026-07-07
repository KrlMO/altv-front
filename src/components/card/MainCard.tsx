export function MainCard({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div
                className="
                    absolute
                    top-0 bottom-0
                    left-2 right-2
                    sm:-inset-1
                    rounded-xl
                    blur-lg
                    sm:blur-xl
                    opacity-20
                    bg-gradient-to-b sm:bg-gradient-to-br
                    from-[#15FFEB]
                    to-[#D300D8]
                    pointer-events-none
                "
            />
            <div
                className="
                    relative
                    z-10
                    w-full
                    px-8
                    py-12
                    sm:px-12
                    min-h-[520px]
                    rounded-2xl
                    bg-white dark:bg-altv-maindark
                "
            >
                {children}
            </div>
        </>
    );
}