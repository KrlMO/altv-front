"use client";
import { NavItem } from "../navigation/NavItem";
import { SearchBar } from "../navigation/SearchBar";
import { AuthSection } from "../navigation/AuthSection";
import { HamburgerButton } from "../ui/buttom/HamburgerButton";
import { AltvButton } from "../ui/buttom/AltvButton";
import { SearchButton } from "../ui/buttom/SearchButton";
import { useEffect, useState } from "react";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    }, [isMenuOpen]);
    return (
        <>
            <nav className="w-full h-16 px-4 flex items-center justify-between bg-white dark:bg-altv-maindark relative navbar-elevated">
                <div className="flex items-center gap-3 md:gap-6 lg:gap-10">
                    <div className="flex items-center gap-3 lg:gap-4">
                        <HamburgerButton
                            onClick={() => {
                                setIsMenuOpen(prev => !prev);
                                setIsSearchOpen(false);
                            }}
                            className="sm:hidden"
                        />
                        <AltvButton height={70}></AltvButton>
                    </div>

                    <div className="hidden sm:flex gap-2 md:gap-4 lg:gap-6">
                        <NavItem href="/">Inicio</NavItem>
                        <NavItem href="/app/tournaments">Torneos</NavItem>
                        <NavItem href="/app/teams">Equipos</NavItem>
                        <NavItem href="/app/ranking">Ranking</NavItem>
                        <NavItem href="/app/news">Noticias</NavItem>
                        <NavItem href="/app/about">Nosotros</NavItem>
                    </div>
                </div>

                <div className="hidden md:flex items-center">
                    <SearchBar className="w-40 lg:w-80 xl:w-130" />
                </div>

                <div className="flex items-center gap-4">
                    <SearchButton
                        onClick={() => {
                            setIsSearchOpen(prev => !prev);
                            setIsMenuOpen(false);
                        }}
                        className="md:hidden"
                    />
                    <AuthSection />
                </div>
            </nav>

            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-[100] lg:hidden"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <div
                        className="absolute left-0 top-0 h-full w-72 bg-white dark:bg-altv-maindark p-6 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col gap-4">
                            <NavItem href="/app">Inicio</NavItem>
                            <NavItem href="/app/tournaments">Torneos</NavItem>
                            <NavItem href="/app/teams">Equipos</NavItem>
                            <NavItem href="/app/ranking">Ranking</NavItem>
                            <NavItem href="/app/news">Noticias</NavItem>
                            <NavItem href="/app/about">Nosotros</NavItem>
                        </div>
                    </div>
                </div>
            )}
            {isSearchOpen && (
                <div className="fixed top-16 left-0 w-full bg-white dark:bg-altv-maindark p-4 shadow-md z-[100] lg:hidden">
                    <SearchBar />
                </div>
            )}
        </>
    )
}
