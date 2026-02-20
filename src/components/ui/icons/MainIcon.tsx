import Image from "next/image";
import Link from "next/link";
import altv_logo from "../../../../public/altv-logo.svg"

export function MainIcon({height = 50}: {height?: number}) {
    return (
        <Link href="/" className="flex items-center h-full">
            <Image src={altv_logo} alt="ALTV Logo" height={height} priority />
        </Link>
    );
}