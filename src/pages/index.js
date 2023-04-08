import axios from "axios";
import ClubBox from "@/components/ClubBox/ClubBox";
import SearchField from "@/components/SearchField/SearchField";
import Head from "next/head";
import { useRouter } from "next/router";


export default function Home({ clubs, error }) {

  if (error) {
    return <div>An error occurred: {error}</div>
  }

  const router = useRouter()

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
          {clubs.map(club => {
            return (
              <li onClick={() => router.push(`/club/${club.id}`)} className="single-club shadow bg-white mb-4 cursor-pointer rounded-xl sm:hover:scale-105 transition">
                <ClubBox
                  key={club.id}
                  clubName={club.clubName}
                  clubImage={club.clubImage}
                  countryName={club.countryName}
                />
              </li>
            )
          })}
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

  try {
    let { data } = await axios.request(options)
    return {
      props: {
        clubs: data.teams
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
