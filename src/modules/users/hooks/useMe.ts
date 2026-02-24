"use client";
import { useEffect, useState } from "react";
import { getMeRequest } from "../services/users.service";
import { User } from "@/types/user";
import { useAuth } from "@/context/AuthContext";

export function useMe() {
    const [data, setData] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const { accessToken } = useAuth();

    useEffect(() => {
        const fetchMe = async () => {
            if (!accessToken) return;

            try {
                const response = await getMeRequest(accessToken);
                setData(response.data);
            } finally {
                setLoading(false);
            }
        };

        fetchMe();
    }, [accessToken]);

    return { data, loading };
}