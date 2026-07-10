"use client";

import { useState } from "react";
import { SearchTeamResult } from "../components/search-team-result/SearchTeamsResult";
import { FilterByGame } from "../components/filter-by-game/FilterByGame";

export function TeamsPage() {
    const [gameId, setGameId] = useState<number | null>(null);
    const [gameName, setGameName] = useState<string | null>(null);

    const handleGameSelect = (id: number | null, name: string | null) => {
        setGameId(id);
        setGameName(name);
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 max-w-7xl mx-auto min-h-screen">
            <div className="w-full md:w-64 md:shrink-0 bg-white dark:bg-altv-bgcontent rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 h-fit">
                <FilterByGame onGameSelect={handleGameSelect} />
            </div>
            <div className="flex-1 bg-white dark:bg-altv-bgcontent rounded-xl border border-zinc-200 dark:border-zinc-700 p-4">
                <SearchTeamResult gameId={gameId} gameName={gameName} />
            </div>
        </div>
    );
}
