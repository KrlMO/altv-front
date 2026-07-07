import { useState, useCallback } from "react";
import { resendVerificationRequest } from "../services/auth.service";
import { ApiException } from "@/types/api";

export function useResendVerification() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const resend = useCallback(async (email: string) => {
        try {
            setLoading(true);
            setError(null);
            await resendVerificationRequest(email);

        } catch (err) {
            if (err instanceof ApiException) {
                setError(err.message);
            } else {
                setError("Error inesperado");
            }
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { resend, loading, error };
}