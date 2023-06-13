import { AnalyticsEvent } from '@/utils/types'
import { NextApiRequest, NextApiResponse } from 'next'

export interface AnalyticsApiResponse {
  page: number
  pageSize: number
  pageCount: number
  recordCount: number
  events: AnalyticsEvent[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<AnalyticsApiResponse>) {
  console.log('analytics api request')
  const api_domain = process.env.API_DOMAIN
  console.log(api_domain + '/analytics')
  const events_res = await fetch(api_domain + '/analytics')
  if (events_res.status != (200 || 201)) {
    console.log('Internal Server Error')
  } else {
    const res_json = await events_res.json()
    console.log(res_json)
    res.status(200).json({
      page: res_json.page,
      pageSize: res_json.pageSize,
      pageCount: res_json.pageCount,
      recordCount: res_json.recordCount,
      events: res_json.data,
    })
  }
}
