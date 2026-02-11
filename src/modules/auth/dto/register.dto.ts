export interface RegisterRequestDTO {
    birth_date: string,
    country_id: number | undefined,
    email: string,
    first_name: string,
    last_name: string,
    nickname: string,
    password: string
}