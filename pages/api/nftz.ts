import type { NextApiRequest, NextApiResponse } from 'next'
import {queryAPI} from '../../utls/useFetch';


export default async function handler (req:NextApiRequest, res:NextApiResponse) {
    if(req.method=='GET'){

        let {address} = req.query

        console.log({address})

        let resp = await queryAPI(`https://deep-index.moralis.io/api/v2/${address}/nft?chain=eth&format=decimal`,
                                    null,
                                    "GET",
                                    {'X-API-Key': process.env.MORALIS_KEY })

        return res.send({address,data:resp})
    }
  }