import PlayerBox from "@/components/PlayerBox/PlayerBox";
import axios from "axios"
import Image from "next/image";


export default function ClubDetails({ squad, clubDetails: { name, image  } }) {
    return (
        <main>
            <section className="flex flex-col justify-center items-center">
                <Image src={image} alt={name} width="30" height="30" />
                <h1>{name}</h1>
            </section>
            <section className="mt-6">
                <ul className="flex flex-wrap justify-between">{squad.map(player => <PlayerBox id={player.id} name={player.name} image={player.image} shirtNumber={player.shirtNumber} captain={player.captain} />)}</ul>
            </section>
        </main>
    )
}

export async function getServerSideProps({ params: { id } }) {

    const clubOptions = {
        method: 'GET',
        url: 'https://transfermarket.p.rapidapi.com/clubs/get-header-info',
        params: { id: id, domain: 'com' },
        headers: {
            'X-RapidAPI-Key': '78b5c3074dmsh67b83898e5b52e7p1d8743jsncb3d889c5e8e',
            'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com'
        }
    };

    const squadOptions = {
        method: 'GET',
        url: 'https://transfermarket.p.rapidapi.com/clubs/get-squad',
        params: { id: id, saison_id: '2022', domain: 'com' },
        headers: {
            'X-RapidAPI-Key': '78b5c3074dmsh67b83898e5b52e7p1d8743jsncb3d889c5e8e',
            'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com'
        }
    };

    const clubResponse = await axios.request(clubOptions)
    const clubData = await clubResponse.data

    const squadResponse = await axios.request(squadOptions)
    const squadData = await squadResponse.data

    return {
        props: {
            clubDetails: clubData.club,
            squad: squadData.squad
        }
    }
}