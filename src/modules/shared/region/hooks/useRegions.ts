import { useEffect, useState } from "react";
import { Region, fetchRegions } from "../services/region.service";

export function useRegions() {
    const [regions, setRegions] = useState<Region[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchRegions()
            .then(setRegions)
            .catch(() => setError("Error al cargar regiones"))
            .finally(() => setLoading(false));
    }, []);
    return { regions, loading, error };
}
