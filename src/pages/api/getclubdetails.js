import axios from "axios";

export default async function getclubdetails(req, res) {

    let id = req.body.id

    const clubOptions = {
        method: 'GET',
        url: 'https://transfermarket.p.rapidapi.com/clubs/get-header-info',
        params: { id: id, domain: 'com' },
        headers: {
            'X-RapidAPI-Key': process.env.TN_API_KEY,
            'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com'
        }
    };

    const squadOptions = {
        method: 'GET',
        url: 'https://transfermarket.p.rapidapi.com/clubs/get-squad',
        params: { id: id, saison_id: '2022', domain: 'com' },
        headers: {
            'X-RapidAPI-Key': process.env.TN_API_KEY,
            'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com'
        }
    };

    try {
        const clubResponse = await axios.request(clubOptions)
        const clubData = await clubResponse.data

        const squadResponse = await axios.request(squadOptions)
        const squadData = await squadResponse.data

        return res.status(200).json({ clubData, squadData  })
    } catch (error) {
        return res.status(500).json({errorMessage: error.message})
    }
}