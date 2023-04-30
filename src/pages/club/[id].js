import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PlayerCard } from "@/components";
import { Spinner } from "@/UI";


export default function ClubDetails() {

    const router = useRouter()
    let { id } = router.query;

    const [clubData, setClubData] = useState(null)
    const [squadData, setSquadData] = useState(null)

    const getClubDetails = async (id) => {

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
        setClubData(data.clubData)
        setSquadData(data.squadData)
    }

    useEffect(() => {
        getClubDetails(id)
    }, [id])

    if (!clubData || !squadData) {
        return (
            <Spinner />
        )
    }

    return (
        <main className="mt-24">
            <section className="flex flex-col justify-center items-center">
                <Image src={clubData.club.image} alt={clubData.club.name} width="30" height="30" />
                <h1>{clubData.club.name}</h1>
            </section>
            <section className="mt-6">
                <ul className="flex flex-wrap justify-start items-center">
                    {squadData.squad.map(player => {
                        return (
                            <li key={player.id} className="single-player shadow bg-white rounded-xl mb-4">
                                <PlayerCard
                                    key={player.id}
                                    id={player.id}
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
