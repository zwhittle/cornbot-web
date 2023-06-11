import { Member } from '@/utils/types'
import { NextApiRequest, NextApiResponse } from 'next'

export interface GuildMembersResponse {
  members: Member[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<GuildMembersResponse>) {
  console.log('guild members api request')
  const api_domain = process.env.API_DOMAIN

  const { id } = req.query

  console.log(`${api_domain}/guilds/${id}/members`)
  const members_res = await fetch(`${api_domain}/guilds/${id}/members`)
  console.log(members_res)

  if (members_res.status != (200 || 201)) {
    console.log('Internal Server Error')
  } else {
    const members_data = await members_res.json()
    res.status(200).json({
      members: members_data,
    })
  }
}
