import ClubBox from "@/components/ClubBox/ClubBox";
import axios from "axios";


export default function Search({ resultClubs, error }) {

    console.log(resultClubs);

    if (error) {
        return <div>Error {error}</div>
    }

    return (
        <main className="mt-16">
            <section>
                <ul className="flex flex-wrap justify-between items-center">
                    {resultClubs.map(club => <ClubBox key={club.id} id={club.id} clubName={club.name} clubImage={club.logoImage} />)}
                </ul>
            </section>
        </main>
    )
}

export async function getServerSideProps({ query }) {

    const options = {
        method: 'GET',
        url: 'https://transfermarket.p.rapidapi.com/search',
        params: { query: query.term, domain: 'com' },
        headers: {
            'X-RapidAPI-Key': '78b5c3074dmsh67b83898e5b52e7p1d8743jsncb3d889c5e8e',
            'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com'
        }
    };

    try {
        const { data } = await axios.request(options)
        console.log(data);
        return {
            props: {
                resultClubs: data.clubs
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