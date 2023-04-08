import Image from "next/image";

export default function PlayerBox({ image, name, shirtNumber, captain }) {
    return (
        <article className="flex flex-col items-center justify-start p-4 h-40 text-center">
            <div className="w-20 h-20 flex justify-center items-center">
                <Image src={image} alt={name} width="50" height="80" style={{ width: "auto", height: "auto", maxHeight: "100%" }} />
            </div>
            <p className="text-lg font-semibold">#{shirtNumber}</p>
            <p className="text-lg font-semibold">{name}{captain && " (C)"}</p>
        </article>
    )
}