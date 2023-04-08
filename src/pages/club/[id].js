import PlayerBox from "@/components/PlayerBox/PlayerBox";
import axios from "axios"
import Image from "next/image";


export default function ClubDetails({ squad, clubDetails: { name, image }, error }) {

    if (error) {
        return <div>An error occurred: {error}</div>
    }

    return (
        <main className="mt-16">
            <section className="flex flex-col justify-center items-center">
                <Image src={image} alt={name} width="30" height="30" />
                <h1>{name}</h1>
            </section>
            <section className="mt-6">
                <ul className="flex flex-wrap justify-start items-center">
                    {squad.map(player => {
                        return (
                            <li key={player.id} className="single-player shadow bg-white rounded-xl mb-4">
                                <PlayerBox 
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

export async function getServerSideProps({ params: { id } }) {

    const clubOptions = {
        method: 'GET',
        url: 'https://transfermarket.p.rapidapi.com/clubs/get-header-info',
        params: { id: id, domain: 'com' },
        headers: {
            'X-RapidAPI-Key': process.env.TN_API_KEY,
            'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com'
        }
    };

    const squadOptions = {
        method: 'GET',
        url: 'https://transfermarket.p.rapidapi.com/clubs/get-squad',
        params: { id: id, saison_id: '2022', domain: 'com' },
        headers: {
            'X-RapidAPI-Key': process.env.TN_API_KEY,
            'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com'
        }
    };

    try {
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
    } catch (error) {
        return {
            props: {
                error: error
            }
        }
    }


}