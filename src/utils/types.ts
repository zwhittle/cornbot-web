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

export interface Member {
  id: string
  name: string
  avatar: string
  displayHexColor: string
  displayName: string
  nickname: string
  pending: boolean
  premiumSince: Date
  guildId: string
  pronouns: string
  birthdayMonth: number
  birthdayDay: number
  birthdayPublic: boolean
  joinedAt: Date
  corns: number
  createdAt: Date
  updatedAt: Date
}
