import { TournamentDetailPage } from "@/modules/tournaments/views/TournamentDetailPage";

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
    return <TournamentDetailPage key={tournamentId} id={tournamentId} />;
}
