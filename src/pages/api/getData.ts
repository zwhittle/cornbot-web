import { AnalyticsEvent, Guild } from '@/utils/types'
import { NextApiRequest, NextApiResponse } from 'next'

export interface ApiData {
  guilds: Guild[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiData>) {
  console.log('data api request')
  const api_domain = process.env.API_DOMAIN
  
  console.log(api_domain + '/guilds')
  const guilds_res = await fetch(api_domain + '/guilds')

  if (guilds_res.status != (200 || 201)) {
    console.log('Internal Server Error')
  } else {
    const guilds_data = await guilds_res.json()
    res.status(200).json({
      guilds: guilds_data,
    })
  }
}
