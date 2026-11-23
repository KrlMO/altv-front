export interface OrganizationDTO {
    role: string;
    organizations: OrganizationItemDTO[];
}

export interface OrganizationItemDTO {
    id: number;
    name: string;
    description: string | null;
    logo: string | null;
    banner: string | null;
    active: boolean;
    roles: string[];
    permissions: string[];
}
