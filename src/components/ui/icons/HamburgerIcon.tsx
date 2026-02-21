import { IconProps } from "./types";

export function HamburgerIcon({ className, strokeWidth = 1.8 }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 57 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 18.5H10.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
            <path d="M16.5 18.5H25.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
            <path d="M31.5 18.5H55.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
            <path d="M21.5 1.5L55.5 1.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
            <path d="M1.5 35.5L35.5 35.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
            <path d="M1.5 1.5L15.5 1.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
            <path d="M42.5 35.5L55.5 35.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
        </svg>
    );
}