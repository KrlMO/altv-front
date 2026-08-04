import { useEffect, useState } from "react";
import { Country } from "../models/country.models";
import { getCachedCountries } from "../services/country.service";

export function useCountries() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getCachedCountries()
            .then(setCountries)
            .catch(() => setError("Error al cargar países"))
            .finally(() => setLoading(false));
    }, []);
    return { countries, loading, error };
}
