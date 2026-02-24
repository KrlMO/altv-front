"use client";
import { ProfileCard } from "../components/ProfileCard";
import { useMe } from "../hooks/useMe";

export function ProfilePage() {
    const { data, loading } = useMe();

    if (loading) return <p>Cargando...</p>;
    if (!data) return <p>Error cargando perfil</p>;

    return (
        <div className="p-4">
            <ProfileCard user={data} />
        </div>
    );
}