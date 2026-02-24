import { Auth } from "./auth";
import { Country } from "./country";

export type User = {
    id: number;
    nickname: string;
    auth: Auth[];
    profile_photo: string;

    first_name?: string;
    last_name?: string;
    birth_date?: string;
    country?: Country;
    banner_photo?: string;
}