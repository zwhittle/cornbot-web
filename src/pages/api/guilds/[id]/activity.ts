import { AnalyticsEvent, Member } from '@/utils/types'
import { NextApiRequest, NextApiResponse } from 'next'

export interface GuildActivityResponse {
  events: AnalyticsEvent[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<GuildActivityResponse>) {
  console.log('guild members api request')
  const api_domain = process.env.API_DOMAIN

  const { id } = req.query

  console.log(`${api_domain}/guilds/${id}/events`)
  const events_res = await fetch(`${api_domain}/guilds/${id}/events`)
  console.log(events_res)

  if (events_res.status != (200 || 201)) {
    console.log('Internal Server Error')
  } else {
    const events_data = await events_res.json()
    res.status(200).json({
      events: events_data,
    })
  }
}
