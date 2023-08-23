import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function gettopclubs(req: NextApiRequest, res: NextApiResponse) {
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
        // Type Assertion. Asserting that the variable error should be treated as an object of type Error.
        const errorMessage = (error as Error).message; // Type assertion here
        return res.status(500).json({ errorMessage })
    }
}