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
            switch (err.status) {
                case 400:
                    console.error("Bad Request:", err);
                    break;
                case 401:
                    console.error("Credenciales inválidas:", err);
                    break;
                case 403:
                    console.error("Acceso prohibido:", err);
                    break;
                case 404:
                    console.error("Endpoint no encontrado:", err);
                    break;
                case 500:
                    console.error("Internal Server Error:", err);
                    break;
                default:
                    console.error("Error desconocido:", err);
            }
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
}
