import { useEffect, useState } from 'react';
// import { getPlayers } from './api/hello';
// import axios from 'axios';

export default function Home() {

  const [players, setPlayers] = useState(null)

  useEffect(() => {
    const fetchHello = async () => {
      let response = await fetch('/api/hello')
      let data = await response.json()
      setPlayers(data.data.players);
    }

    fetchHello()
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
