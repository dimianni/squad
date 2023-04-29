import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SquareLoader } from "react-spinners";
import { SearchField, ClubCard } from "@/components";

export default function Home() {

  const [topClubs, setTopClubs] = useState(null)

  const getTopClubs = async () => {
    let response = await fetch('/api/gettopclubs')
    let data = await response.json()
    setTopClubs(data.teams)
  }

  useEffect(() => {
    getTopClubs()
  }, [])
  
  if (!topClubs){
    return (
      <main className="min-h-screen">
        <div className="min-h-screen flex justify-center items-center">
          <SquareLoader color="#2081e2" />
        </div>
      </main>
    )
  }

  return (
    <main className="mt-16">
      <Head>
        <title>TheDreamTeam</title>
        <meta name="description" content="At TheDreamTeam you can see the most up to date squad of your favorite football team!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <h1 className='text-3xl text-center'>Choose your favorite club!</h1>
        <SearchField />
        <ul className="flex flex-wrap justify-between items-center">
          {topClubs.map(club => {
            return (
              <li key={club.id} className="single-club shadow bg-white mb-4 cursor-pointer rounded-xl sm:hover:scale-105 transition">
                <Link href={`/club/${club.id}`}>
                  <ClubCard
                    clubName={club.clubName}
                    clubImage={club.clubImage}
                    countryName={club.countryName}
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}