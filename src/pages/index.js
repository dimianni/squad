import axios from "axios";
import ClubBox from "@/components/ClubBox/ClubBox";
import Link from "next/link";
import { useState } from "react";

export default function Home({ clubs }) {

  const [searchTerm, setSearchTerm] = useState('')

  return (
    <main>
      <section>
        <h1 className='text-3xl text-center'>Choose your favorite team!</h1>

        {/* Search */}
        <div className="my-6">
          <input className="bg-grey" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button>
            <Link href={`/search?term=${searchTerm}`}>Search</Link>
          </button>
        </div>

        <ul className="flex flex-wrap justify-between items-center">
          {clubs.map(club => <ClubBox key={club.id} id={club.id} clubName={club.clubName} clubImage={club.clubImage} countryName={club.countryName} />)}
        </ul>

      </section>
    </main>
  )
}

// getStaticProps runs at build time 
// so there is no need for the loading screen since the data will always be available (statically generated).
export async function getStaticProps() {
  // Top clubs
  const options = {
    method: 'GET',
    url: 'https://transfermarket.p.rapidapi.com/statistic/list-most-valuable-clubs',
    params: { domain: 'com' },
    headers: {
      'X-RapidAPI-Key': process.env.TN_API_KEY,
      'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com'
    }
  };

  let { data } = await axios.request(options)
  // let data = await response.data

  return {
    props: {
      clubs: data.teams
    }
  }
}