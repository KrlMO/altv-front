import { apiFetch } from "@/lib/api";

export interface Country {
  id: number;
  name: string;
  iso_code: string;
  flag_path: string;
}

export async function fetchCountries(): Promise<Country[]> {
  return apiFetch<Country[]>("/v1/countries/",{
        method: "GET"
    }
  );
}
