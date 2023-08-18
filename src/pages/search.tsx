import { useRouter } from "next/router";
import { SearchField, ClubCard } from "../components";
import Pagination from "@/Utils/Pagination";
import { useEffect, useState } from "react";
import { Spinner } from "../UI";
import { IClub } from "@/models/club";
import { ensureString } from "@/Utils/ensureString";

export default function Search() {

    const [resultClubs, setResultClubs] = useState<IClub[]>([])
    const [numOfPages, setNumOfPages] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [clubsCount, setClubsCount] = useState<number>(0)

    const router = useRouter()
    let { term, page } = router.query;
    const termString = ensureString(term);
    const pageString = ensureString(page);


    const getSearchedClubs = async (term: string, page: string) => {

        if (!term || !page) {
            return;
        }

        let response = await fetch('/api/getsearchedclubs', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ term: term, page: page })
        })
        let data = await response.json()
        setResultClubs(data.teams.clubs)
        setClubsCount(data.count.clubs)
    }

    // Cleanup function
    const clearSearch = () => {
        setResultClubs([])
    }

    useEffect(() => {
        getSearchedClubs(termString, pageString);

        return () => {
            clearSearch()
        }
    }, [term, page])

    useEffect(() => {
        let numOfClubs = clubsCount;
        let clubsPerPage = 10;

        setCurrentPage(parseInt(pageString))

        setNumOfPages(Math.ceil(numOfClubs / clubsPerPage))
    }, [resultClubs])


    if (!resultClubs || !numOfPages) {
        return (
            <Spinner />
        )
    }

    return (
        <main className="mt-24 min-h-screen">
            <section>
                <SearchField />
                <div className="flex items-center mb-4 text-lg font-semibold">
                    <p>Results for &nbsp;</p> <h2>"{term}"</h2>
                </div>
                <ul className="flex flex-wrap justify-start items-center">
                    {
                        resultClubs ?
                            resultClubs.map(club => {
                                return (
                                    <li key={club.id} onClick={() => router.push(`/club/${club.id}`)} className="single-club shadow bg-white mb-4 cursor-pointer rounded-xl sm:hover:scale-105 transition">
                                        <ClubCard clubName={club.name} clubImage={club.logoImage} />
                                    </li>
                                )
                            })
                            : (
                                <div>
                                    <p>No matches for "{term}" :(</p>
                                    <p>Please try searching for something else!</p>
                                </div>
                            )
                    }
                </ul>
                <Pagination numOfPages={numOfPages} routeTerm={termString} currentPage={currentPage} />
            </section>
        </main>
    )
}