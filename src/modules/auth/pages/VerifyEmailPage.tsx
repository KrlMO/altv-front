"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { VerifyEmailCard } from "../components/VerifyEmailCard";
import { useEffect, useRef, useState } from "react";
import { useVerifyEmail } from "../hooks/useVerifyEmail";

export function VerifyEmailPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const [seconds, setSeconds] = useState(90);
    const hasRun = useRef(false);

    const { verifyEmail } = useVerifyEmail();
    const [isValid, setIsValid] = useState<boolean | null>(null);
    console.log("VerifyEmailPage render");
    useEffect(() => {
        if (!email) {
            router.replace("/auth/login");
            return;
        }
        if (hasRun.current) return;
        const check = async () => {
            try {
                const response = await verifyEmail(email);

                if (response.status === "VERIFIED") {
                    router.replace("/auth/login?verified=true");
                    return;
                }

                if (response.status === "NOT_FOUND") {
                    router.replace("/auth/login");
                    return;
                }

                if (response.status === "EXPIRED") {
                    setSeconds(0);
                }

                if (response.status === "PENDING") {
                    setSeconds(response.resend_cooldown??0);
                }

                setIsValid(true);

            } catch (error) {
                router.replace("/auth/login");
                setIsValid(false);
            }
        };
        hasRun.current = true;
        check();
    }, [email]);

    if (isValid === null) {
        return <div className="text-center mt-20">Validando...</div>;
    }

    return (
        <div className="px-4 w-full sm:px-6 flex items-start relative max-w-xl mx-auto">
            <VerifyEmailCard email={email ?? undefined} seconds={seconds} />
        </div>
    );
}