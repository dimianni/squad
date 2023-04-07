import ClubBox from "@/components/ClubBox/ClubBox";
import axios from "axios";
import { useRouter } from "next/router";
import SearchField from "@/components/SearchField/SearchField";
import Pagination from "@/Utils/Pagination";

export default function Search({ resultClubs, error }) {

    const router = useRouter()
    let clubsCount = resultClubs.count.clubs;
    let clubsPerPage = 10;
    let numOfPages = Math.ceil(clubsCount / clubsPerPage)
    let currentPage = parseInt(router.query.page)

    if (error) {
        return <div>An error occurred: {error}</div>
    }
    return (
        <main className="mt-16">
            <section>
                <SearchField />
                <h2>Results for "{router.query.term}"</h2>
                <ul className="flex flex-wrap justify-start items-center">
                    {
                        resultClubs.clubs ?
                            resultClubs.clubs.map(club => <ClubBox key={club.id} id={club.id} clubName={club.name} clubImage={club.logoImage} />)
                            : (
                                <div>
                                    <p>No matches for "{router.query.term}" :(</p>
                                    <p>Please try searching for something else!</p>
                                </div>
                            )
                    }
                </ul>
                <Pagination numOfPages={numOfPages} routeTerm={router.query.term} currentPage={currentPage} />
            </section>
        </main>
    )
}

export async function getServerSideProps({ query }) {

    const options = {
        method: 'GET',
        url: 'https://transfermarket.p.rapidapi.com/search',
        params: { query: query.term, page: query.page, domain: 'com' },
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