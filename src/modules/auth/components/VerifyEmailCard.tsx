"use client";
import { AltvButton } from "@/components/ui/buttom/AltvButton";
import { MainButton } from "@/components/ui/buttom/MainButton";
import { SecondaryButton } from "@/components/ui/buttom/SecondaryButton";
import { useEffect, useState } from "react";

function maskEmail(email: string): string {
    const [name, domain] = email.split("@");

    if (!name || !domain) return email;

    if (name.length <= 2) {
        return name + "@" + domain;
    }

    const visible = name.slice(0, 2);
    const masked = "*".repeat(name.length - 2);

    return `${visible}${masked}@${domain}`;
}

export function VerifyEmailCard({ email, seconds: initialSeconds }: { email?: string, seconds?: number }) {
    const [seconds, setSeconds] = useState(initialSeconds || 90);

    useEffect(() => {
        if (initialSeconds !== undefined) {
            setSeconds(initialSeconds);
        }
    }, [initialSeconds]);

    useEffect(() => {
        if (seconds <= 0) return;

        const timer = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [seconds]);

    const maskedEmail = email ? maskEmail(email) : "";

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}:${sec.toString().padStart(2, "0")}`;
    };

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
                <div className="items-center justify-center flex">
                    <AltvButton height={100}></AltvButton>
                </div>
                <h2
                    className="
                    text-2xl
                    font-semibold
                    mb-8
                    text-center
                    text-zinc-800 dark:text-zinc-200
                    "
                >
                    Verificar Email
                </h2>

                <p className="text-justify text-zinc-600 dark:text-zinc-400">
                    Hemos enviado un correo electrónico a {maskedEmail}. Por favor, revisa tu bandeja de entrada y haz clic en el enlace de verificación para completar el proceso de registro.
                </p>
                <p className="text-justify text-zinc-600 dark:text-zinc-400">
                    Si no has recibido el correo electrónico, asegúrate de revisar tu carpeta de spam o correo no deseado. Si aún no lo encuentras, puedes solicitar que se reenvíe el correo de verificación.
                </p>
                <div className="mt-4 flex flex-col items-center gap-4">
                    <SecondaryButton className="w-[80%]" onClick={() => window.location.href = "/auth/login"}>Volver a Iniciar Sesión</SecondaryButton>
                    <MainButton
                        disabled={seconds > 0}
                        className="w-[80%]"
                    >
                        {seconds > 0
                            ? `Reenviar disponible en ${formatTime(seconds)}`
                            : "Reenviar correo de verificación"}
                    </MainButton>

                    {seconds > 0 && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Espera {formatTime(seconds)} para volver a enviar.
                        </p>
                    )}
                    {seconds == 0 && (
                        <p className="text-xs text-emerald-500">
                            Puedes reenviar el correo ahora.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}