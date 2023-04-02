import axios from "axios";

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.TN_API_KEY,
    'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com'
  }
};

export default async (req, res) => {
  const response = await axios.get('https://transfermarket.p.rapidapi.com/search?query=chelsea&domain=de', options);
  res.status(200).json({ data: response.data })
}


