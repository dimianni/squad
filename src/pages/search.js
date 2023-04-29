import { useRouter } from "next/router";
import SearchField from "@/components/SearchField/SearchField";
import Pagination from "@/Utils/Pagination";
import ClubCard from "@/components/ClubCard/ClubCard";
import { useEffect, useState } from "react";
import { Spinner } from "@/UI";

export default function Search() {

    const [resultClubs, setResultClubs] = useState(null)
    const [numOfPages, setNumOfPages] = useState(null)
    const [currentPage, setCurrentPage] = useState(null)

    const router = useRouter()
    let { term, page } = router.query;

    const getSearchedClubs = async (term, page) => {

        if(!term || !page){
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
        setResultClubs(data.teams)
    }

    // Cleanup function
    const clearSearch = () => {
        setResultClubs(null)
    }

    useEffect(() => {
        getSearchedClubs(term, page)

        return () => {
            clearSearch()
        }
    }, [term, page])

    useEffect(() => {
        let clubsCount = resultClubs?.count.clubs;
        let clubsPerPage = 10;

        setCurrentPage(parseInt(page))
        setNumOfPages(Math.ceil(clubsCount / clubsPerPage))
    }, [resultClubs])
    

    if (!resultClubs || !numOfPages){
        return (
            <Spinner />
        )
    }

    return (
        <main className="mt-16 min-h-screen">
            <section>
                <SearchField />
                <div className="flex items-center mb-4 text-lg font-semibold">
                    <p>Results for &nbsp;</p> <h2>"{term}"</h2> 
                </div>
                <ul className="flex flex-wrap justify-start items-center">
                    {
                        resultClubs.clubs ?
                            resultClubs.clubs.map(club => {
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
                <Pagination numOfPages={numOfPages} routeTerm={term} currentPage={currentPage} />
            </section>
        </main>
    )
}