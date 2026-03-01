import { useState, useCallback } from "react";
import { verifyEmailRequest } from "../services/auth.service";
import { ApiException } from "@/types/api";

export function useVerifyEmail() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const verifyEmail = useCallback(async (email: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await verifyEmailRequest(email);
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

    return { verifyEmail, loading, error };
}