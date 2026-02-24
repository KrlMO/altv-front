export interface LoginDTO {
    email: string;
    password: string;
}

export interface UserResponseDTO {
    id: number;
    nickname: string;
    auth: AuthResponseDTO[];
    profile_photo: string;
}

export interface LoginResponseDTO {
    access_token: string;
    user: UserResponseDTO;
}

export interface AuthResponseDTO {
    provider_uid: string;
    provider: string;
    id: number;
}