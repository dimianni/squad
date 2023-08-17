import Image from "next/image"

interface ClubCardProps {
    clubName: string
    clubImage: string
    countryName: string
}

export default function ClubCard({ clubName, clubImage, countryName }: ClubCardProps) {

    return (
        <article className="flex flex-col items-center justify-center p-4 h-40 text-center">
            <div className="w-12 h-12 flex justify-center items-center">
                <Image src={clubImage} width="30" height="30" alt={clubName} style={{ width: "auto", height: "auto", maxHeight: "100%" }} />
            </div>
            <p className="text-lg font-semibold">{clubName}</p>
            <p className="text-base opacity-50">{countryName}</p>
        </article>
    )
}