import { useEffect, useState } from "react";
import { TournamentType } from "../dto/tournament.dto";
import { fetchTournamentTypes } from "../services/tournament-types.service";

export function useTournamentTypes() {
    const [types, setTypes] = useState<TournamentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTournamentTypes()
            .then(setTypes)
            .catch(() => setError("Error al cargar tipos de torneo"))
            .finally(() => setLoading(false));
    }, []);

    return { types, loading, error };
}
