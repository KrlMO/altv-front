import { TournamentManagePage } from "@/modules/tournaments/views/TournamentManagePage";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const tournamentId = Number(id);
    if (!Number.isInteger(tournamentId)) {
        return <p className="text-sm text-red-400">Torneo inválido</p>;
    }
    return <TournamentManagePage key={tournamentId} id={tournamentId} />;
}
