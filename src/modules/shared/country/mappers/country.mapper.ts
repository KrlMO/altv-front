import { Country } from "../models/country.models";
import { CountryResponseDTO } from "../dto/country.dto";

export function mapCountryResponseToModel(dto: CountryResponseDTO): Country {
    return {
        id: dto.id,
        name: dto.name,
        isoCode: dto.iso_code,
        flagPath: dto.flag_path,
    };
}
