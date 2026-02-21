import { HamburgerIcon } from "../icons/HamburgerIcon";
import { ButtonProps } from "./types";

export function HamburgerButton({ onClick, className }: ButtonProps) {
    return (
        <button onClick={onClick} className={className}>
            <HamburgerIcon strokeWidth={1.4} className="h-10 w-10 text-gray-700 dark:text-ciangreen" />
        </button>
    );
}