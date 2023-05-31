export interface AnalyticsEvent {
  id?: number
  type: string
  event: string
  guildId?: string
  channelId?: string
  memberId?: string
  timestamp?: Date
}

export interface Guild {
  id: string
  name: string
  description: string
  joinedAt: Date
  discordCreatedAt: Date
  memberCount: number
  cornScore: number
  goodBotCount: number
  badBotCount: number
  icon: string
  createdAt: Date
  updatedAt: Date
}
