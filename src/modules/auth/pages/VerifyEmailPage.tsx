"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { VerifyEmailCard } from "../components/VerifyEmailCard";
import { useEffect, useState } from "react";
import { useVerifyEmail } from "../hooks/useVerifyEmail";

export function VerifyEmailPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const [seconds, setSeconds] = useState(90);

    const { verifyEmail } = useVerifyEmail();
    const [isValid, setIsValid] = useState<boolean | null>(null);

    useEffect(() => {
        if (!email) {
            router.replace("/auth/login");
            return;
        }

        const check = async () => {
            const response = await verifyEmail(email);
            if (response.email_exists) {
                if (response.already_verified) {
                    router.replace("/auth/login?verified=true");
                } else {
                    setIsValid(true);
                    setSeconds(response.time_left);
                }
            }else{
                router.replace("/auth/login?email_not_found=true");
            }
        };

        check();
    }, [email, router, verifyEmail]);

    if (isValid === null) {
        return <div className="text-center mt-20">Validando...</div>;
    }

    return (
        <div className="px-4 w-full sm:px-6 flex items-start relative max-w-xl mx-auto">
            <VerifyEmailCard email={email ?? undefined} seconds={seconds} />
        </div>
    );
}