import axios from "axios";

export default async function gettopclubs(req, res) {
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
        return res.status(200).json({ teams: data.teams })
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
}