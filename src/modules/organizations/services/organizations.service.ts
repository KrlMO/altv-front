import { apiFetch } from "@/lib/api";
import { SuccessResponse } from "@/types/api";
import {
    OrganizationDTO,
    OrganizationItemDTO,
} from "../dto/organization.dto";

export interface OrganizationItem {
    id: number;
    name: string;
    description?: string;
    logo?: string;
    roles: string[];
    permissions: string[];
}

export async function fetchMyOrganizations(
    accessToken: string
): Promise<OrganizationItem[]> {
    const response = await apiFetch<SuccessResponse<OrganizationDTO[]>>(
        "/v1/organizations/my",
        { method: "GET" },
        accessToken
    );
    const items: OrganizationItem[] = [];
    for (const group of response.data) {
        for (const org of group.organizations) {
            items.push(toItem(org));
        }
    }
    // Deduplicate: the same org can appear in several role groups.
    const byId = new Map<number, OrganizationItem>();
    for (const item of items) {
        const existing = byId.get(item.id);
        if (existing) {
            existing.roles.push(...item.roles);
        } else {
            byId.set(item.id, item);
        }
    }
    return [...byId.values()];
}

function toItem(dto: OrganizationItemDTO): OrganizationItem {
    return {
        id: dto.id,
        name: dto.name,
        description: dto.description ?? undefined,
        logo: dto.logo ?? undefined,
        roles: dto.roles,
        permissions: dto.permissions,
    };
}

export async function createOrganization(
    accessToken: string,
    name: string,
    description?: string
): Promise<number> {
    const response = await apiFetch<SuccessResponse<{ id: number }>>(
        "/v1/organizations",
        {
            method: "POST",
            body: JSON.stringify({
                name,
                description: description || undefined,
            }),
        },
        accessToken
    );
    return response.data.id;
}
