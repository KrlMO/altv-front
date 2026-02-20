import { NavItem } from "../navigation/NavItem";
import { SearchBar } from "../navigation/SearchBar";
import { AuthSection } from "../navigation/AuthSection";
import { MainIcon } from "../ui/icons/MainIcon";

export function Navbar() {
    return (
        <nav className="w-full h-16 px-4 flex items-center justify-between bg-white dark:bg-altv-maindark relative z-50 navbar-elevated">
            <div className="flex items-center gap-10">
                <div className="flex items-center gap-4">
                    <button className="lg:hidden">☰</button>
                    <MainIcon></MainIcon>
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

            <div className="hidden lg:flex flex-1 justify-center">
                <SearchBar />
            </div>

            <div className="flex items-center gap-4">
                <button className="lg:hidden">🔍</button>
                <AuthSection />
            </div>

        </nav>
    )
}
