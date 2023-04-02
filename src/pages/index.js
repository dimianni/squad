import { useEffect, useState } from 'react';
import { getPlayers, getRecepies } from '@/api/hello';

export default function Home() {

  const [recepies, setRecepies] = useState(null)

  const fetchData = async () => {
    let data = await getRecepies()
    setRecepies(data.recipes)
  };

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <>
      <main>
        <h1 className='text-3xl'>Home</h1>
        <div>
          <ul>
            {
              recepies?.map((recepy, i) => {
                return (
                  <li key={i}>{recepy.title}</li>
                )
              })
            }
          </ul>
        </div>
      </main>
    </>
  )
}
