interface GameOptionProps {
    id: number;
    name: string;
    colorHex: string;
    isSelected: boolean;
    onSelect: (id: number) => void;
}

export function GameOption({ id, name, colorHex, isSelected, onSelect }: GameOptionProps) {
    return (
        <button
            type="button"
            onClick={() => onSelect(id)}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"
            style={{
                border: `2px solid ${colorHex}`,
                backgroundColor: isSelected ? `${colorHex}22` : "transparent",
            }}
        >
            <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: colorHex }}
            />
            <span className="text-sm truncate">{name}</span>
        </button>
    );
}
