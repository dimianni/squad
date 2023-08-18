import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SearchField, ClubCard } from "../components";
import { Spinner } from "../UI";
import { ITeam } from "@/models/team";

export default function Home() {

  const [topClubs, setTopClubs] = useState<ITeam[]>([])

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
      <Spinner />
    )
  }

  return (
    <main className="mt-24">
      <Head>
        <title>Squad</title>
        <meta name="description" content="In the Squad app you can see the most up to date line-up of your favorite football team!" />
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