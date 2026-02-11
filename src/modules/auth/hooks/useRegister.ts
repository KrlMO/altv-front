import { useState } from "react";
import { RegisterRequestDTO } from "../dto/register.dto";
import { registerRequest } from "../services/auth.service";

export function useRegister() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (data: RegisterRequestDTO) => {
        try {
            setLoading(true);
            setError(null);
            const result = await registerRequest(data);
            
            console.log("Register OK:", result);

            return result;
        } catch (err: any) {
            setError(err.message || "Error inesperado");
        } finally {
            setLoading(false);
        }
    }

    return { register, loading, error };
}