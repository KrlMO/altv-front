import { useState } from "react";
import { verifyEmailRequest } from "../services/auth.service";
import { VerifyEmailResponseDTO } from "../dto/verifyEmail.dto";

export function useVerifyEmail() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const verifyEmail = async (email: string): Promise<VerifyEmailResponseDTO> => {
        try {
            setLoading(true);
            setError(null);
            const response = await verifyEmailRequest(email);
            return response.data;
        } catch (err: any) {
            setError(err.message || "Error inesperado");
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return { verifyEmail, loading, error };
}