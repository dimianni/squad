import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getsearchedclubs(req: NextApiRequest, res: NextApiResponse) {

    let term = req.body.term
    let page = req.body.page

    const options = {
        method: 'GET',
        url: 'https://transfermarket.p.rapidapi.com/search',
        params: { query: term, page: page, domain: 'com' },
        headers: {
            'X-RapidAPI-Key': process.env.TN_API_KEY,
            'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com'
        }
    };

    try {
        const { data } = await axios.request(options)
        return res.status(200).json({ teams: data })
    } catch (error) {
        // Type Assertion. Asserting that the variable error should be treated as an object of type Error.
        const errorMessage = (error as Error).message
        return res.status(500).json({ errorMessage })
    }
}