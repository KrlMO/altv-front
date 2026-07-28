import { apiFetch } from "@/lib/api";
import { Country } from "../models/country.models";
import { CountryResponseDTO } from "../dto/country.dto";
import { mapCountryResponseToModel } from "../mappers/country.mapper";

let countriesCache: Country[] | null = null;

export async function fetchCountries(): Promise<Country[]> {
    const response = await apiFetch<CountryResponseDTO[]>("/v1/countries/", {
        method: "GET",
    });
    return response.map(mapCountryResponseToModel);
}

export async function getCachedCountries(): Promise<Country[]> {
    if (countriesCache) return countriesCache;
    countriesCache = await fetchCountries();
    return countriesCache;
}

export function clearCountriesCache(): void {
    countriesCache = null;
}
