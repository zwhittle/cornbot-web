export interface AnalyticsEvent {
  id?: number
  type: string
  event: string
  guildId?: string
  guild: Guild
  channelId?: string
  memberId?: string
  member?: Member
  timestamp: string
  messageId?: string
  message?: Message
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

export interface Message {
  id: string
  authorId: string
  author?: Member
  guildId: string
  guild?: Guild
  channelId: string
  content: string
  discordCreatedAt: Date
  editable: boolean
  url: string
}
