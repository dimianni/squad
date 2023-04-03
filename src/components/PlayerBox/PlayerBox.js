import Image from "next/image";

export default function PlayerBox({ id, image, name, shirtNumber, captain }) {
    return (
        <li key={id} className="single-player bg-grey flex flex-col justify-center items-center mb-4">
            <Image src={image} alt={name} width="50" height="80" />
            <p>#{shirtNumber}</p>
            <p>{name}{captain && " (C)"}</p>
        </li>
    )
}