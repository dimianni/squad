import Image from "next/image"
import Link from "next/link"


export default function ClubBox({ clubName, clubImage, countryName, id }) {
    return (
        <li className="single-club bg-grey flex flex-col items-center justify-center mb-4 cursor-pointer">
            <Image src={clubImage} width="30" height="30" alt={clubName} />
            <Link href={`/club/${id}`}>{clubName}</Link>
            <p>{countryName}</p>
        </li>
    )
}