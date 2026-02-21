import { IconProps } from "./types";

export function UserIcon({ className, strokeWidth = 1.8 }: IconProps) {
    return (
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M57.6205 62.062C57.9228 61.8205 58.2202 61.5728 58.5123 61.3191" strokeWidth={strokeWidth} stroke="currentColor" strokeLinecap="round" />
            <path d="M60.5592 59.3528C60.8665 59.0263 61.1659 58.6926 61.4573 58.3519" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
            <path d="M55.4478 63.6346C49.7301 67.3718 42.8514 68.9096 36.0866 67.9628C29.3218 67.0161 23.1296 63.6491 18.6575 58.4858C14.1855 53.3225 11.7368 46.713 11.7654 39.8823C11.794 33.0517 14.2979 26.4629 18.813 21.3373" strokeWidth={strokeWidth} stroke="currentColor" strokeLinecap="round" />
            <path d="M24.5386 16.375C23.4089 17.1143 22.3338 17.9336 21.3214 18.8268" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
            <path d="M63.1735 56.1306C66.7484 50.9948 68.516 44.8169 68.1984 38.5674C67.8809 32.318 65.4963 26.351 61.4193 21.604C57.3422 16.857 51.8038 13.5988 45.6739 12.3413C39.544 11.0839 33.1701 11.8983 27.5534 14.6568" strokeWidth={strokeWidth} stroke="currentColor" strokeLinecap="round" />
            <circle cx="39.8875" cy="31.4773" r="7.91066" stroke="currentColor" strokeWidth={strokeWidth} />
            <path d="M56.0618 56.386C56.0618 52.0105 54.3577 47.8142 51.3245 44.7203C48.2912 41.6263 44.1772 39.8882 39.8875 39.8882C35.5978 39.8882 31.4838 41.6263 28.4505 44.7203C25.4172 47.8142 23.7131 52.0105 23.7131 56.386L39.8875 56.386H56.0618Z" stroke="currentColor" strokeWidth={strokeWidth} mask="url(#path-7-inside-1_2082_35)" />
        </svg>
    );
}