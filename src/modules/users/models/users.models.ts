import { Country } from "@/modules/shared/country/models/country.models";

export interface User {
    id: string;
    username: string;
    email: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
}

export interface RosterMember {
    id: string;
    userId: string;
    teamId: string;
    role: string;
    teamRole: string;
    jerseyPhoto?: string;
}

export interface PlayerSearchResult {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    avatar: string;
    country: Country;
    countryCode: string;
    birthDate: string;
}
