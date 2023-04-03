import axios from "axios";
import ClubBox from "@/components/ClubBox/ClubBox";
import Search from "@/components/Search/Search";

export default function Home({ clubs }) {

  return (
    <main className="mt-16">
      <section>
        <h1 className='text-3xl text-center'>Choose your favorite club!</h1>
        <Search />
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