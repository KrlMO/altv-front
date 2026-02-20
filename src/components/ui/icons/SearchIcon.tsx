import { IconProps } from "./types";

export function SearchIcon({ className, strokeWidth = 1.8 }: IconProps) {
    return (
        <svg viewBox="0 0 84 88" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <circle cx="32" cy="32" r="29.5" stroke="currentColor" strokeWidth={strokeWidth} />
            <line x1="80.4645" y1="85" x2="55" y2="59.5355" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
        </svg>
    );
}