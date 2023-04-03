import Link from "next/link"

export default function Header() {
    return (
        <header className="bg-green py-3">
            <div className="container flex justify-center items-center">
                <h1 className="text-white text-xl font-bold">
                    <Link href="/">
                        TheDreamTeam
                    </Link>
                </h1>
            </div>
        </header>
    )
}