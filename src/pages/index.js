import { useEffect, useState } from 'react';
import { getPlayers, getRecepies } from '@/api/hello';

export default function Home() {

  const [players, setPlayers] = useState(null)

  const fetchData = async () => {
    let data = await getPlayers()
    console.log(data);
    setPlayers(data.players)
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
              players?.map((player, i) => {
                return (
                  <li key={i}>{player.playerName}</li>
                )
              })
            }
          </ul>
        </div>
      </main>
    </>
  )
}
