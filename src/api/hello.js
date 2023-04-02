const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.TM_API_KEY,
    'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com'
  }
};

export async function getPlayers() {
  let response = await fetch('https://transfermarket.p.rapidapi.com/search?query=chelsea&domain=de', options)
  let data = await response.json()

  return data
}

// export async function getRecipes(fapi) {
//   let response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${fapi}&number=9`)
//   let data = await response.json()
//   return data
// }