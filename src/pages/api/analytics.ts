import { AnalyticsEvent } from '@/utils/types'
import { NextApiRequest, NextApiResponse } from 'next'

export interface AnalyticsApiData {
  events: AnalyticsEvent[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<AnalyticsApiData>) {
  console.log('analytics api request')
  const api_domain = process.env.API_DOMAIN
  console.log(api_domain + '/analytics')
  const events_res = await fetch(api_domain + '/analytics')
  if (events_res.status != (200 || 201)) {
    console.log('Internal Server Error')
  } else {
    const events_data = await events_res.json()
    console.log(events_data)
    res.status(200).json({
      events: events_data,
    })
  }
}
