import { useState } from "react";
import { LoginDTO } from "../dto/login.dto";
import { loginRequest } from "../services/auth.service";

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (data: LoginDTO) => {
        try {
            setLoading(true);
            setError(null);
            const result = await loginRequest(data);

            console.log("Login OK:", result);

            return result;
        } catch (err: any) {
            if (err.status === 401) {
                setError("Credenciales inválidas");
            } else {
                setError(err.message || "Error inesperado");
            }
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
}
