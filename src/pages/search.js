import ClubBox from "@/components/ClubBox/ClubBox";
import axios from "axios";
import { useRouter } from "next/router";


export default function Search({ resultClubs, error }) {

    const router = useRouter()

    if (error) {
        return <div>An error occurred: {error}</div>
    }

    return (
        <main className="mt-16">
            <section>
                <ul className="flex flex-wrap justify-between items-center">
                    {
                        resultClubs.clubs ?
                            resultClubs.map(club => <ClubBox key={club.id} id={club.id} clubName={club.name} clubImage={club.logoImage} />)
                            : (
                                <div>
                                    <p>No matches for "{router.query.term}"" :(</p>
                                    <p>Please try searching for something else!</p>
                                </div>
                            )
                    }
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
            'X-RapidAPI-Key': process.env.TN_API_KEY,
            'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com'
        }
    };

    try {
        const { data } = await axios.request(options)
        return {
            props: {
                resultClubs: data
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