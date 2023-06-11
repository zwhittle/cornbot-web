import { Guild } from '@/utils/types'
import { NextApiRequest, NextApiResponse } from 'next'

export interface GuildResponse {
  guild: Guild
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<GuildResponse>) {
  console.log('guild api request')
  const api_domain = process.env.API_DOMAIN

  const { id } = req.query

  console.log(`${api_domain}/guilds/${id}`)
  const guild_res = await fetch(`${api_domain}/guilds/${id}`)

  if (guild_res.status != (200 || 201)) {
    console.log('Internal Server Error')
  } else {
    const guild_data = await guild_res.json()
    res.status(200).json({
      guild: guild_data,
    })
  }
}
