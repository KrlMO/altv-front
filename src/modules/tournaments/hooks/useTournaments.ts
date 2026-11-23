"use client";

import { useEffect, useReducer } from "react";
import { TournamentFilters } from "../dto/tournament.dto";
import {
    TournamentListResult,
    TournamentSortBy,
    TournamentStatus,
} from "../models/tournament.models";
import { mapTournamentResponseToModel } from "../mappers/tournament.mapper";
import { fetchTournaments } from "../services/tournaments.service";

interface State {
    name: string;
    debouncedName: string;
    regionId: number | undefined;
    countryId: number | undefined;
    organizerType: "OFFICIAL" | "COMMUNITY" | "INDEPENDENT" | undefined;
    typeId: number | undefined;
    status: TournamentStatus | undefined;
    sortBy: TournamentSortBy;
    page: number;
    result: TournamentListResult;
    loading: boolean;
    error: string | null;
}

type Action =
    | { type: "SET_NAME"; name: string }
    | { type: "DEBOUNCE_NAME"; name: string }
    | { type: "SET_REGION"; regionId: number | undefined }
    | { type: "SET_COUNTRY"; countryId: number | undefined }
    | { type: "SET_ORGANIZER"; organizerType: State["organizerType"] }
    | { type: "SET_TYPE"; typeId: number | undefined }
    | { type: "SET_STATUS"; status: TournamentStatus | undefined }
    | { type: "SET_SORT"; sortBy: TournamentSortBy }
    | { type: "SET_PAGE"; page: number }
    | { type: "FETCH_START" }
    | { type: "FETCH_SUCCESS"; data: TournamentListResult }
    | { type: "FETCH_ERROR"; error: string };

const emptyResult: TournamentListResult = {
    data: [],
    meta: { total: 0, limit: 10, offset: 0 },
};

const initialState: State = {
    name: "",
    debouncedName: "",
    regionId: undefined,
    countryId: undefined,
    organizerType: undefined,
    typeId: undefined,
    status: undefined,
    sortBy: "start_date_asc",
    page: 1,
    result: emptyResult,
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
        case "SET_ORGANIZER":
            if (action.organizerType === state.organizerType) return state;
            return { ...state, organizerType: action.organizerType, page: 1 };
        case "SET_TYPE":
            if (action.typeId === state.typeId) return state;
            return { ...state, typeId: action.typeId, page: 1 };
        case "SET_STATUS":
            if (action.status === state.status) return state;
            return { ...state, status: action.status, page: 1 };
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

export function useTournaments(externalFilters: {
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
        const filters: TournamentFilters = { page: state.page };
        if (state.debouncedName.trim())
            filters.name = state.debouncedName.trim();
        if (externalFilters.game_id) filters.game_id = externalFilters.game_id;
        if (state.regionId) filters.region_id = state.regionId;
        if (state.countryId) filters.country_id = state.countryId;
        if (state.organizerType) filters.organizer_type = state.organizerType;
        if (state.typeId) filters.type_id = state.typeId;
        if (state.status) filters.status = state.status;
        if (state.sortBy) filters.sort_by = state.sortBy;

        let cancelled = false;
        dispatch({ type: "FETCH_START" });

        fetchTournaments(filters)
            .then((data) => {
                if (!cancelled)
                    dispatch({
                        type: "FETCH_SUCCESS",
                        data: {
                            ...data,
                            data: data.data.map(mapTournamentResponseToModel),
                        },
                    });
            })
            .catch(() => {
                if (!cancelled)
                    dispatch({
                        type: "FETCH_ERROR",
                        error: "Error al cargar torneos",
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
        state.organizerType,
        state.typeId,
        state.status,
        state.sortBy,
        state.page,
    ]);

    const total = state.result.meta?.total ?? 0;
    const limit = state.result.meta?.limit ?? 10;
    const totalPages = limit > 0 ? Math.ceil(total / limit) : 0;

    return {
        name: state.name,
        setName: (name: string) => dispatch({ type: "SET_NAME", name }),
        regionId: state.regionId,
        setRegionId: (regionId: number | undefined) =>
            dispatch({ type: "SET_REGION", regionId }),
        countryId: state.countryId,
        setCountryId: (countryId: number | undefined) =>
            dispatch({ type: "SET_COUNTRY", countryId }),
        organizerType: state.organizerType,
        setOrganizerType: (organizerType: State["organizerType"]) =>
            dispatch({ type: "SET_ORGANIZER", organizerType }),
        typeId: state.typeId,
        setTypeId: (typeId: number | undefined) =>
            dispatch({ type: "SET_TYPE", typeId }),
        status: state.status,
        setStatus: (status: TournamentStatus | undefined) =>
            dispatch({ type: "SET_STATUS", status }),
        sortBy: state.sortBy,
        setSortBy: (sortBy: TournamentSortBy) =>
            dispatch({ type: "SET_SORT", sortBy }),
        page: state.page,
        setPage: (page: number) => dispatch({ type: "SET_PAGE", page }),
        result: state.result,
        totalPages,
        loading: state.loading,
        error: state.error,
    };
}
