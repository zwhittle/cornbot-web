import { AnalyticsEvent, Guild, Member } from '@/utils/types'
import { NextApiRequest, NextApiResponse } from 'next'

export interface MembersResponse {
  members: Member[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<MembersResponse>) {
  console.log('members api request')
  const api_domain = process.env.API_DOMAIN

  console.log(api_domain + '/members')
  const members_res = await fetch(api_domain + '/members')

  if (members_res.status != (200 || 201)) {
    console.log('Internal Server Error')
  } else {
    const members_data = await members_res.json()
    res.status(200).json({
      members: members_data,
    })
  }
}
