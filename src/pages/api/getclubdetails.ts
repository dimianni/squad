import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getclubdetails(req: NextApiRequest, res: NextApiResponse) {

    let id: string = req.body.id;

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

        return res.status(200).json({ clubData, squadData })
    } catch (error) {
        const errorMessage = (error as Error).message
        return res.status(500).json({ errorMessage })
    }
}