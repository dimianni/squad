const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_TN_API_KEY,
    'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com'
  }
};

export async function getPlayers() {
  let response = await fetch('https://transfermarket.p.rapidapi.com/search?query=chelsea&domain=de', options)
  let data = await response.json()
  return data
}

export async function getRecepies(){
  const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.NEXT_PUBLIC_RECIPE_API_KEY}&number=9`)
  const data = await response.json()
  return data
}
