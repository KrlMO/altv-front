"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
}

export function NavItem({ href, children }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative px-1 py-2 transition-all duration-200 text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300
        ${isActive 
          ? "text-btn-secondary font-semibold" 
          : "hover:drop-shadow-[0_0_6px_rgba(21,255,235,0.5)]"
        }`}
    >
      {children}

      <span
        className={`absolute left-0 -bottom-1 h-[2px] w-full transition-all duration-300
          ${isActive ? "bg-btn-secondary scale-x-100" : "scale-x-0"}
        `}
      />
    </Link>
  );
}
