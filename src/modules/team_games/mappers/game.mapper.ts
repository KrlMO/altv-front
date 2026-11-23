import { Game } from "../models/game.models";

interface GameResponseDTO {
    id: number;
    name: string;
    color_hex: string;
    slug: string;
}

export function mapGameResponseToModel(dto: GameResponseDTO): Game {
    return {
        id: dto.id,
        name: dto.name,
        colorHex: dto.color_hex,
        slug: dto.slug,
    };
}
