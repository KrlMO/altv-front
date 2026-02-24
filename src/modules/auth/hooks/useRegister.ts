import { useState } from "react";
import { RegisterRequestDTO } from "../dto/register.dto";
import { registerRequest } from "../services/auth.service";

export function useRegister() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (data: RegisterRequestDTO): Promise<Boolean> => {
        try {
            setLoading(true);
            setError(null);
            await registerRequest(data);

            return true;
        } catch (err: any) {
            setError(err.message || "Error inesperado");
            return false;
        } finally {
            setLoading(false);
        }
    }

    return { register, loading, error };
}