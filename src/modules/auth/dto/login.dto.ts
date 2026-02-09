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
    token: string;
    user: UserResponseDTO;
}
