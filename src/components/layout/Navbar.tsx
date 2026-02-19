import Link from "next/link";
import altv_logo from "../../../public/altv-logo.svg"
import { NavItem } from "../navigation/NavItem";
import { SearchBar } from "../navigation/SearchBar";
import { AuthSection } from "../navigation/AuthSection";
import Image from "next/image";

export function Navbar() {
    return (
        <nav className="w-full h-16 px-8 flex items-center bg-white dark:bg-altv-maindark relative z-50 navbar-elevated">
            <div className="flex items-center gap-10">
                <Link href="/" className="flex items-center h-full">
                    <Image src={altv_logo} alt="ALTV Logo" height={50} priority />
                </Link>

                <div className="flex gap-6">
                    <NavItem href="/">Inicio</NavItem>
                    <NavItem href="/tournaments">Torneos</NavItem>
                    <NavItem href="/teams">Equipos</NavItem>
                    <NavItem href="/ranking">Ranking</NavItem>
                    <NavItem href="/news">Noticias</NavItem>
                    <NavItem href="/about">Acerca de</NavItem>
                </div>
            </div>

            <div className="flex-1 justify-center">
                <SearchBar />
            </div>

            <div className="flex justify-end">
                <AuthSection />
            </div>

        </nav>
    )
}
