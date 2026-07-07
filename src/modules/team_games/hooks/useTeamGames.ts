"use client";

import { useEffect, useReducer } from "react";
import { PaginatedTeamGames, TeamGameFilters } from "../dto/team-game.dto";
import { fetchTeamGames } from "../services/team-games.service";

interface State {
    name: string;
    debouncedName: string;
    regionId: number | undefined;
    countryId: number | undefined;
    sortBy: "name_asc" | "name_desc" | "newest" | "oldest";
    page: number;
    result: PaginatedTeamGames;
    loading: boolean;
    error: string | null;
}

type Action =
    | { type: "SET_NAME"; name: string }
    | { type: "DEBOUNCE_NAME"; name: string }
    | { type: "SET_REGION"; regionId: number | undefined }
    | { type: "SET_COUNTRY"; countryId: number | undefined }
    | { type: "SET_SORT"; sortBy: State["sortBy"] }
    | { type: "SET_PAGE"; page: number }
    | { type: "FETCH_START" }
    | { type: "FETCH_SUCCESS"; data: PaginatedTeamGames }
    | { type: "FETCH_ERROR"; error: string };

const initialState: State = {
    name: "",
    debouncedName: "",
    regionId: undefined,
    countryId: undefined,
    sortBy: "newest",
    page: 1,
    result: {
        data: [],
        total: 0,
        page: 1,
        limit: 10,
        total_pages: 0,
    },
    loading: false,
    error: null,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_NAME":
            return { ...state, name: action.name };
        case "DEBOUNCE_NAME":
            if (action.name === state.debouncedName) return state;
            return { ...state, debouncedName: action.name, page: 1 };
        case "SET_REGION":
            if (action.regionId === state.regionId) return state;
            return { ...state, regionId: action.regionId, page: 1 };
        case "SET_COUNTRY":
            if (action.countryId === state.countryId) return state;
            return { ...state, countryId: action.countryId, page: 1 };
        case "SET_SORT":
            if (action.sortBy === state.sortBy) return state;
            return { ...state, sortBy: action.sortBy, page: 1 };
        case "SET_PAGE":
            return { ...state, page: action.page };
        case "FETCH_START":
            return { ...state, loading: true, error: null };
        case "FETCH_SUCCESS":
            return { ...state, result: action.data, loading: false, error: null };
        case "FETCH_ERROR":
            return { ...state, loading: false, error: action.error };
    }
}

export function useTeamGames(externalFilters: {
    game_id?: number | null;
}) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch({ type: "DEBOUNCE_NAME", name: state.name });
        }, 300);
        return () => clearTimeout(timer);
    }, [state.name]);

    useEffect(() => {
        dispatch({ type: "SET_PAGE", page: 1 });
    }, [externalFilters.game_id]);

    useEffect(() => {
        const filters: TeamGameFilters = { page: state.page };
        if (state.debouncedName.trim())
            filters.name = state.debouncedName.trim();
        if (externalFilters.game_id) filters.game_id = externalFilters.game_id;
        if (state.regionId) filters.region_id = state.regionId;
        if (state.countryId) filters.country_id = state.countryId;
        if (state.sortBy) filters.sort_by = state.sortBy;

        let cancelled = false;
        dispatch({ type: "FETCH_START" });

        fetchTeamGames(filters)
            .then((data) => {
                if (!cancelled) dispatch({ type: "FETCH_SUCCESS", data });
            })
            .catch(() => {
                if (!cancelled)
                    dispatch({
                        type: "FETCH_ERROR",
                        error: "Error al cargar equipos",
                    });
            });

        return () => {
            cancelled = true;
        };
    }, [
        state.debouncedName,
        externalFilters.game_id,
        state.regionId,
        state.countryId,
        state.sortBy,
        state.page,
    ]);

    return {
        name: state.name,
        setName: (name: string) => dispatch({ type: "SET_NAME", name }),
        regionId: state.regionId,
        setRegionId: (regionId: number | undefined) =>
            dispatch({ type: "SET_REGION", regionId }),
        countryId: state.countryId,
        setCountryId: (countryId: number | undefined) =>
            dispatch({ type: "SET_COUNTRY", countryId }),
        sortBy: state.sortBy,
        setSortBy: (sortBy: State["sortBy"]) =>
            dispatch({ type: "SET_SORT", sortBy }),
        page: state.page,
        setPage: (page: number) => dispatch({ type: "SET_PAGE", page }),
        result: state.result,
        loading: state.loading,
        error: state.error,
    };
}
