"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

import { loginRequest, refreshRequest, logoutRequest } from "@/modules/auth/services/auth.service";
import { LoginDTO } from "@/modules/auth/dto/login.dto";
import { User } from "@/types/user";

type AuthState = {
    user: User | null;
    accessToken: string | null;
    loading: boolean;
    error: string | null;
    login: (data: LoginDTO) => Promise<boolean>;
    logout: () => void;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (data: LoginDTO): Promise<boolean> => {
        try {
            setLoading(true);
            setError(null);
            //
            const result = await loginRequest(data);
            setUser(result.data.user);
            setAccessToken(result.data.access_token);
            return true;
        } catch (err: any) {
            switch (err.status) {
                case 400:
                    setError("Datos de entrada inválidos");
                    break;
                case 401:
                    setError("Credenciales incorrectas");
                    break;
                case 403:
                    setError("No tienes permiso para acceder");
                    break;
                case 404:
                    setError("Usuario no encontrado");
                    break;
                case 500:
                    setError("Error del servidor, intenta más tarde");
                    break;
                default:
                    setError(err.message || "Error inesperado");
            }

            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("AuthProvider mounted");
    }, []);

    const logout = async () => {
        try {
            //
            await logoutRequest();
        } catch (err) {
            console.error("Error during logout:", err);
        } finally {
            setUser(null);
            setAccessToken(null);
        }
    };


    useEffect(() => {
        const initAuth = async () => {
            try {
                //
                const response = await refreshRequest();
                setUser(response.data.user);
                setAccessToken(response.data.access_token);
            } catch {
                setUser(null);
                setAccessToken(null);
            }
        };

        initAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                loading,
                error,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}