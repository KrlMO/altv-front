export interface LoginDTO {
    email: string;
    password: string;
}

export interface UserResponseDTO {
    id: number;
    nickname: string;
    provider_uid: string;
    profile_photo: string;
}

export interface LoginResponseDTO {
    access_token: string;
    user: UserResponseDTO;
}
