"use client";
import { NavItem } from "../navigation/NavItem";
import { SearchBar } from "../navigation/SearchBar";
import { AuthSection } from "../navigation/AuthSection";
import { HamburgerButton } from "../ui/buttom/HamburgerButton";
import { AltvButton } from "../ui/buttom/AltvButtom";
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
                <div className="flex items-center gap-10">
                    <div className="flex items-center gap-4">
                        <HamburgerButton
                            onClick={() => {
                                setIsMenuOpen(prev => !prev);
                                setIsSearchOpen(false);
                            }}
                            className="lg:hidden"
                        />
                        <AltvButton height={70}></AltvButton>
                    </div>

                    <div className="hidden lg:flex gap-6">
                        <NavItem href="/">Inicio</NavItem>
                        <NavItem href="/tournaments">Torneos</NavItem>
                        <NavItem href="/teams">Equipos</NavItem>
                        <NavItem href="/ranking">Ranking</NavItem>
                        <NavItem href="/news">Noticias</NavItem>
                        <NavItem href="/about">Acerca de</NavItem>
                    </div>
                </div>

                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
                    <SearchBar className="w-140" />
                </div>

                <div className="flex items-center gap-4">
                    <SearchButton
                        onClick={() => {
                            setIsSearchOpen(prev => !prev);
                            setIsMenuOpen(false);
                        }}
                        className="lg:hidden"
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
                            <NavItem href="/">Inicio</NavItem>
                            <NavItem href="/tournaments">Torneos</NavItem>
                            <NavItem href="/teams">Equipos</NavItem>
                            <NavItem href="/ranking">Ranking</NavItem>
                            <NavItem href="/news">Noticias</NavItem>
                            <NavItem href="/about">Acerca de</NavItem>
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
