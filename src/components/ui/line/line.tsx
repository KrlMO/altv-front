interface LineProps {
    color?: string;
    width?: number;
}

export function Line({ color = "white", width = 100 }: LineProps) {
    return (
        <div
            className="h-[2px] rounded-full"
            style={{
                width: `${width}%`,
                backgroundColor: color,
            }}
        />
    );
}