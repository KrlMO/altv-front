export interface OrganizationItem {
    id: number;
    name: string;
    description?: string;
    logo?: string;
    roles: string[];
    permissions: string[];
}
