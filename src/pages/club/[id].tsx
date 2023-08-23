import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PlayerCard } from "../../components";
import { Spinner } from "../../UI";
import { IClubData } from "@/models/clubData";
import { ensureString } from "@/Utils/ensureString";
import { IPlayer } from "@/models/squadData";


export default function ClubDetails() {

    const router = useRouter()
    let { id } = router.query;   
    const stringId = ensureString(id) 

    const [clubData, setClubData] = useState<IClubData | null>(null)
    const [squadData, setSquadData] = useState<IPlayer[]>([])

    const getClubDetails = async (id: string) => {

        // id is still 'undefined' on page load
        if (!id) {
            return;
        }

        let response = await fetch('/api/getclubdetails', {
            method: "POST",
            body: JSON.stringify({ id }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        let data = await response.json()
        setClubData(data.clubData.club)
        setSquadData(data.squadData.squad)
    }

    useEffect(() => {
        getClubDetails(stringId)
    }, [id])

    if (!clubData || !squadData) {
        return (
            <Spinner />
        )
    }

    return (
        <main className="mt-24">
            <section className="flex flex-col justify-center items-center">
                <Image src={clubData.image} alt={clubData.name} width="30" height="30" />
                <h1>{clubData.name}</h1>
            </section>
            <section className="mt-6">
                <ul className="flex flex-wrap justify-start items-center">
                    {squadData.map(player => {
                        return (
                            <li key={player.id} className="single-player shadow bg-white rounded-xl mb-4">
                                <PlayerCard
                                    key={player.id}
                                    name={player.name}
                                    image={player.image}
                                    shirtNumber={player.shirtNumber}
                                    captain={player.captain}
                                />
                            </li>
                        )
                    })}
                </ul>
            </section>
        </main>
    )
}
