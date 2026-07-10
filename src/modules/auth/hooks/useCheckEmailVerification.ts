import { useState, useCallback } from "react";
import { checkEmailVerificationRequest } from "../services/auth.service";
import { ApiException } from "@/types/api";

export function useCheckEmailVerification() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const checkEmailVerification = useCallback(async (email: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await checkEmailVerificationRequest(email);
            return response.data;

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

    return { checkEmailVerification, loading, error };
}