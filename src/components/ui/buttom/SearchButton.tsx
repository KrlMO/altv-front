import { SearchIcon } from "../icons/SearchIcon";
import { ButtonProps } from "./types";

export function SearchButton({ onClick, className }: ButtonProps) {
    return (
        <button onClick={onClick} className={className}>
            <SearchIcon strokeWidth={3} className="h-8 w-8 text-gray-700 dark:text-ciangreen"/>
        </button>
    );
}