import { useEffect } from 'react';
// import { getPlayers, getRecipes } from '@/api/hello';

// const key = process.env.TM_API_KEY
// console.log(key);


export default function Home() {


  const fetchData = async () => {
    let response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=082510dd42c9428398b5c74503181b7e&number=9`)
    let data = await response.json()
    console.log(data);
  };

  useEffect(() => {

    fetchData();
  }, []);



  return (
    <>
      <main>
        <h1 className='text-3xl'>Home</h1>
      </main>
    </>
  )
}
