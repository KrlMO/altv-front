"use client";

import { useRef, useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal/Modal";
import { MainButton } from "@/components/ui/buttom/MainButton";
import { useGames } from "@/modules/team_games/hooks/useGames";
import { usePlayerSearch } from "@/modules/users/hooks/usePlayerSearch";
import { Game } from "@/modules/team_games/models/game.models";
import { PlayerSearchResult } from "@/modules/users/models/users.models";
import { RosterEntry, RosterPlayer, TeamRole } from "../../types/roster";

type SearchSection = "players" | "coach" | "others";

interface AddRosterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave?: (entry: RosterEntry, index?: number) => void;
    existingGameIds?: string[];
    editingEntry?: { index: number; entry: RosterEntry };
    gameOnly?: boolean;
    onSelectGame?: (game: Game) => void;
}

function calculateAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

export function AddRosterModal({
    isOpen,
    onClose,
    onSave,
    existingGameIds = [],
    editingEntry,
    gameOnly = false,
    onSelectGame,
}: AddRosterModalProps) {
    const {
        query: gameQuery,
        setQuery: setGameQuery,
        games,
        loading: gamesLoading,
    } = useGames();

    const {
        query: playerQuery,
        setQuery: setPlayerQuery,
        players,
        loading: playersLoading,
    } = usePlayerSearch();

    const initialGame: Game | null = editingEntry
        ? {
              id: Number(editingEntry.entry.gameId),
              name: editingEntry.entry.gameName,
              colorHex: "",
              slug: "",
          }
        : null;

    const [selectedGame, setSelectedGame] = useState<Game | null>(initialGame);
    const [rosterPlayers, setRosterPlayers] = useState<RosterPlayer[]>(
        editingEntry ? editingEntry.entry.players : []
    );
    const [activeSection, setActiveSection] = useState<SearchSection | null>(null);
    const [othersSubRole, setOthersSubRole] = useState<"ANALYST" | "STAFF">("ANALYST");

    useEffect(() => {
        if (editingEntry) {
            setGameQuery(editingEntry.entry.gameName);
        }
    }, [editingEntry, setGameQuery]);

    const isEditing = editingEntry !== undefined;

    const isDuplicate = selectedGame
        ? existingGameIds.includes(String(selectedGame.id)) &&
          (!isEditing || String(selectedGame.id) !== editingEntry.entry.gameId)
        : false;

    const playersList = rosterPlayers.filter(
        (rp) => rp.teamRole === "PLAYER" || rp.teamRole === "TEAM_CAPTAIN"
    );
    const coachList = rosterPlayers.filter((rp) => rp.teamRole === "COACH");
    const othersList = rosterPlayers.filter(
        (rp) => rp.teamRole === "ANALYST" || rp.teamRole === "STAFF"
    );

    const hasCaptain = playersList.some((rp) => rp.teamRole === "TEAM_CAPTAIN");
    const hasCoach = coachList.length > 0;

    const canSave =
        selectedGame !== null && !isDuplicate && (gameOnly || playersList.length > 0);

    const handleSelectGame = (game: Game) => {
        setSelectedGame(game);
        setGameQuery(game.name);
    };

    const handleSelectPlayer = (player: PlayerSearchResult) => {
        if (rosterPlayers.some((rp) => rp.player.id === player.id)) return;

        let teamRole: TeamRole = "PLAYER";
        if (activeSection === "coach") {
            teamRole = "COACH";
        } else if (activeSection === "others") {
            teamRole = othersSubRole;
        }

        setRosterPlayers((prev) => [
            ...prev,
            { player, jerseyPhoto: null, roleId: null, teamRole },
        ]);
        setPlayerQuery("");
        setActiveSection(null);
    };

    const handleRemoveByGlobalIndex = (globalIndex: number) => {
        setRosterPlayers((prev) => prev.filter((_, i) => i !== globalIndex));
    };

    const handleSetCaptain = (playerId: string) => {
        setRosterPlayers((prev) =>
            prev.map((rp) => {
                if (rp.player.id === playerId) {
                    return { ...rp, teamRole: "TEAM_CAPTAIN" as TeamRole };
                }
                if (rp.teamRole === "TEAM_CAPTAIN") {
                    return { ...rp, teamRole: "PLAYER" as TeamRole };
                }
                return rp;
            })
        );
    };

    const handleJerseyChange = (globalIndex: number, file: File | null) => {
        setRosterPlayers((prev) =>
            prev.map((p, i) => (i === globalIndex ? { ...p, jerseyPhoto: file } : p))
        );
    };

    const handleRoleChange = (globalIndex: number, roleId: string) => {
        setRosterPlayers((prev) =>
            prev.map((p, i) =>
                i === globalIndex ? { ...p, roleId: roleId || null } : p
            )
        );
    };

    const handleTeamRoleToggle = (globalIndex: number, newRole: "ANALYST" | "STAFF") => {
        setRosterPlayers((prev) =>
            prev.map((p, i) =>
                i === globalIndex ? { ...p, teamRole: newRole } : p
            )
        );
    };

    const openSearch = (section: SearchSection) => {
        setActiveSection(section);
        setPlayerQuery("");
    };

    const closeSearch = () => {
        setActiveSection(null);
        setPlayerQuery("");
    };

    const handleSave = () => {
        if (!selectedGame || isDuplicate) return;
        if (gameOnly) {
            onSelectGame?.(selectedGame);
            resetAndClose();
            return;
        }
        if (playersList.length === 0) return;
        const entry: RosterEntry = {
            gameName: selectedGame.name,
            gameId: String(selectedGame.id),
            players: rosterPlayers,
        };
        onSave?.(entry, isEditing ? editingEntry.index : undefined);
        resetAndClose();
    };

    const resetAndClose = () => {
        setSelectedGame(null);
        setRosterPlayers([]);
        setActiveSection(null);
        setOthersSubRole("ANALYST");
        setGameQuery("");
        setPlayerQuery("");
        onClose();
    };

    const getGlobalIndex = (rp: RosterPlayer) =>
        rosterPlayers.findIndex((r) => r.player.id === rp.player.id);

    return (
        <Modal
            isOpen={isOpen}
            onClose={resetAndClose}
            title={
                gameOnly
                    ? "Añadir videojuego"
                    : isEditing
                      ? "Editar Roster"
                      : "Añadir Roster"
            }
            size="lg"
            footer={
                <div className="flex justify-end gap-3">
                    <MainButton
                        type="button"
                        variant="secondary"
                        onClick={resetAndClose}
                    >
                        Cancelar
                    </MainButton>
                    <MainButton
                        type="button"
                        onClick={handleSave}
                        disabled={!canSave}
                    >
                        Guardar
                    </MainButton>
                </div>
            }
        >
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Buscar juego *
                    </label>
                    <input
                        type="text"
                        value={gameQuery}
                        onChange={(e) => {
                            setGameQuery(e.target.value);
                            if (selectedGame) setSelectedGame(null);
                        }}
                        placeholder="Buscar juego..."
                        className="w-full h-10 rounded-lg border px-3 text-sm bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {gamesLoading && (
                        <p className="text-xs text-zinc-400">Buscando...</p>
                    )}
                    {!gamesLoading && gameQuery.trim() && games.length > 0 && !selectedGame && (
                        <div className="flex flex-col border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
                            {games.map((game) => (
                                <button
                                    key={game.id}
                                    type="button"
                                    onClick={() => handleSelectGame(game)}
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                                >
                                    {game.name}
                                </button>
                            ))}
                        </div>
                    )}
                    {isDuplicate && (
                        <p className="text-xs text-red-400">
                            Ya existe un roster para este juego.
                        </p>
                    )}
                </div>

                {!gameOnly && (
                    <>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                            Jugadores ({playersList.length})
                        </h3>
                        {!hasCaptain && playersList.length > 0 && (
                            <span className="text-xs text-amber-500">
                                Selecciona un capitán
                            </span>
                        )}
                    </div>

                    {playersList.map((rp) => {
                        const gIdx = getGlobalIndex(rp);
                        return (
                            <PlayerCard
                                key={rp.player.id}
                                rp={rp}
                                globalIndex={gIdx}
                                isCaptain={rp.teamRole === "TEAM_CAPTAIN"}
                                showCaptainButton
                                onRemove={handleRemoveByGlobalIndex}
                                onJerseyChange={handleJerseyChange}
                                onRoleChange={handleRoleChange}
                                onSetCaptain={handleSetCaptain}
                            />
                        );
                    })}

                    {activeSection === "players"
                        ? renderSearch()
                        : (
                            <button
                                type="button"
                                onClick={() => openSearch("players")}
                                className="w-full p-3 rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center gap-2 text-sm text-zinc-500 hover:border-[#88008B] hover:text-[#88008B] transition-colors"
                            >
                                <span className="text-lg">+</span>
                                Añadir jugador
                            </button>
                        )}
                </div>

                <hr className="border-zinc-200 dark:border-zinc-700" />

                <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                        Coach {hasCoach ? "(1)" : "(0 / 1)"}
                    </h3>

                    {coachList.map((rp) => {
                        const gIdx = getGlobalIndex(rp);
                        return (
                            <PlayerCard
                                key={rp.player.id}
                                rp={rp}
                                globalIndex={gIdx}
                                isCaptain={false}
                                showCaptainButton={false}
                                onRemove={handleRemoveByGlobalIndex}
                                onJerseyChange={handleJerseyChange}
                                onRoleChange={handleRoleChange}
                            />
                        );
                    })}

                    {activeSection === "coach"
                        ? renderSearch()
                        : (
                            <button
                                type="button"
                                onClick={() => openSearch("coach")}
                                disabled={hasCoach}
                                className={`w-full p-3 rounded-lg border-2 border-dashed flex items-center justify-center gap-2 text-sm transition-colors ${
                                    hasCoach
                                        ? "border-zinc-200 dark:border-zinc-800 text-zinc-300 dark:text-zinc-600 cursor-not-allowed"
                                        : "border-zinc-300 dark:border-zinc-700 text-zinc-500 hover:border-[#88008B] hover:text-[#88008B]"
                                }`}
                            >
                                <span className="text-lg">+</span>
                                {hasCoach ? "Coach asignado" : "Añadir coach"}
                            </button>
                        )}
                </div>

                <hr className="border-zinc-200 dark:border-zinc-700" />

                <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                        Otros ({othersList.length})
                    </h3>

                    {othersList.map((rp) => {
                        const gIdx = getGlobalIndex(rp);
                        return (
                            <PlayerCard
                                key={rp.player.id}
                                rp={rp}
                                globalIndex={gIdx}
                                isCaptain={false}
                                showCaptainButton={false}
                                showTeamRoleToggle
                                onRemove={handleRemoveByGlobalIndex}
                                onJerseyChange={handleJerseyChange}
                                onRoleChange={handleRoleChange}
                                onTeamRoleToggle={handleTeamRoleToggle}
                            />
                        );
                    })}

                    {activeSection === "others" ? (
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setOthersSubRole("ANALYST")}
                                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                        othersSubRole === "ANALYST"
                                            ? "bg-[#88008B] text-white"
                                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                    }`}
                                >
                                    Analyst
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setOthersSubRole("STAFF")}
                                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                        othersSubRole === "STAFF"
                                            ? "bg-[#88008B] text-white"
                                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                    }`}
                                >
                                    Staff
                                </button>
                            </div>
                            {renderSearch()}
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() => openSearch("others")}
                            className="w-full p-3 rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center gap-2 text-sm text-zinc-500 hover:border-[#88008B] hover:text-[#88008B] transition-colors"
                        >
                            <span className="text-lg">+</span>
                            Añadir analyst / staff
                        </button>
                    )}
                </div>
                    </>
                )}
            </div>
        </Modal>
    );

    function renderSearch() {
        return (
            <div className="flex flex-col gap-2 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <input
                    type="text"
                    value={playerQuery}
                    onChange={(e) => setPlayerQuery(e.target.value)}
                    placeholder="Buscar por nombre o código..."
                    autoFocus
                    className="w-full h-9 rounded-lg border px-3 text-sm bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {playersLoading && (
                    <p className="text-xs text-zinc-400">Buscando...</p>
                )}
                {!playersLoading && playerQuery.trim() && players.length > 0 && (
                    <div className="flex flex-col border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden max-h-48 overflow-y-auto">
                        {players.map((player) => {
                            const isAdded = rosterPlayers.some(
                                (rp) => rp.player.id === player.id
                            );
                            return (
                                <button
                                    key={player.id}
                                    type="button"
                                    disabled={isAdded}
                                    onClick={() => handleSelectPlayer(player)}
                                    className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center gap-2 ${
                                        isAdded
                                            ? "opacity-40 cursor-not-allowed"
                                            : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                    }`}
                                >
                                    <img
                                        src={player.avatar}
                                        alt={player.username}
                                        className="w-8 h-8 rounded-full object-cover bg-zinc-200 dark:bg-zinc-700"
                                    />
                                    <div className="flex flex-col min-w-0">
                                        <span className="font-medium truncate">
                                            {player.firstName} {player.lastName}
                                        </span>
                                        <span className="text-xs text-zinc-400 truncate">
                                            @{player.username}
                                        </span>
                                    </div>
                                    {player.countryCode && (
                                        <div className="flex items-center gap-1 ml-auto shrink-0">
                                            <img
                                                src={`https://flagcdn.com/24x18/${player.countryCode.toLowerCase()}.png`}
                                                alt={player.country.name}
                                                className="h-3"
                                            />
                                            <span className="text-xs text-zinc-400">
                                                {player.countryCode.toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                    {isAdded && (
                                        <span className="ml-auto text-xs text-zinc-400 font-medium">
                                            Añadido
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                )}
                <button
                    type="button"
                    onClick={closeSearch}
                    className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 text-left"
                >
                    Cancelar
                </button>
            </div>
        );
    }
}

interface PlayerCardProps {
    rp: RosterPlayer;
    globalIndex: number;
    isCaptain: boolean;
    showCaptainButton: boolean;
    showTeamRoleToggle?: boolean;
    onRemove: (globalIndex: number) => void;
    onJerseyChange: (globalIndex: number, file: File | null) => void;
    onRoleChange: (globalIndex: number, roleId: string) => void;
    onSetCaptain?: (playerId: string) => void;
    onTeamRoleToggle?: (globalIndex: number, role: "ANALYST" | "STAFF") => void;
}

function PlayerCard({
    rp,
    globalIndex,
    isCaptain,
    showCaptainButton,
    showTeamRoleToggle = false,
    onRemove,
    onJerseyChange,
    onRoleChange,
    onSetCaptain,
    onTeamRoleToggle,
}: PlayerCardProps) {
    const jerseyInputRef = useRef<HTMLInputElement>(null);
    const { player } = rp;
    const age = player.birthDate ? calculateAge(player.birthDate) : null;

    return (
        <div
            className={`flex flex-col gap-3 p-4 rounded-lg border bg-zinc-50 dark:bg-zinc-800/50 ${
                isCaptain
                    ? "border-amber-400 dark:border-amber-500/50"
                    : "border-zinc-200 dark:border-zinc-700"
            }`}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src={player.avatar || "/default-avatar.png"}
                        alt={player.username}
                        className="w-10 h-10 rounded-full object-cover bg-zinc-200 dark:bg-zinc-700"
                    />
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {player.username}
                            </span>
                            {isCaptain && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    Capitán
                                </span>
                            )}
                            {rp.teamRole === "COACH" && (
                                <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">
                                    Coach
                                </span>
                            )}
                            {rp.teamRole === "ANALYST" && (
                                <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400">
                                    Analyst
                                </span>
                            )}
                            {rp.teamRole === "STAFF" && (
                                <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-400">
                                    Staff
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                            {age !== null && <span>{age} años</span>}
                            {player.countryCode && (
                                <div className="flex items-center gap-1">
                                    <img
                                        src={`https://flagcdn.com/24x18/${player.countryCode.toLowerCase()}.png`}
                                        alt={player.country.name}
                                        className="h-3"
                                    />
                                    <span>{player.country.name}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    {showCaptainButton && !isCaptain && onSetCaptain && (
                        <button
                            type="button"
                            onClick={() => onSetCaptain(player.id)}
                            className="text-zinc-300 hover:text-amber-400 transition-colors"
                            title="Hacer capitán"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => onRemove(globalIndex)}
                        className="text-zinc-400 hover:text-red-400 transition-colors"
                        aria-label="Eliminar"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
            </div>

            {showTeamRoleToggle && onTeamRoleToggle && (
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => onTeamRoleToggle(globalIndex, "ANALYST")}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            rp.teamRole === "ANALYST"
                                ? "bg-[#88008B] text-white"
                                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                        }`}
                    >
                        Analyst
                    </button>
                    <button
                        type="button"
                        onClick={() => onTeamRoleToggle(globalIndex, "STAFF")}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            rp.teamRole === "STAFF"
                                ? "bg-[#88008B] text-white"
                                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                        }`}
                    >
                        Staff
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        Foto jersey
                    </label>
                    <input
                        ref={jerseyInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                            onJerseyChange(globalIndex, e.target.files?.[0] ?? null)
                        }
                    />
                    <button
                        type="button"
                        onClick={() => jerseyInputRef.current?.click()}
                        className="w-full h-9 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-xs text-zinc-500 hover:border-[#88008B] hover:text-[#88008B] transition-colors"
                    >
                        {rp.jerseyPhoto ? rp.jerseyPhoto.name : "Subir jersey"}
                    </button>
                </div>

                {(rp.teamRole === "PLAYER" || rp.teamRole === "TEAM_CAPTAIN") && (
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                            Rol (juego)
                        </label>
                        <select
                            value={rp.roleId ?? ""}
                            onChange={(e) => onRoleChange(globalIndex, e.target.value)}
                            className="w-full h-9 rounded-lg border px-2 text-xs bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Sin rol</option>
                        </select>
                    </div>
                )}
            </div>
        </div>
    );
}
