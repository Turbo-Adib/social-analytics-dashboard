export type Platform = 'youtube' | 'twitch' | 'instagram' | 'tiktok'

export interface ChannelStats {
  id: string
  platform: Platform
  username: string
  displayName?: string
  avatarUrl?: string
  description?: string
  category?: string
  followers: number
  views: number
  videos: number
  engagement: number
  dailyChange: number
  weeklyChange: number
  monthlyChange: number
  lastUpdated: Date
}

export interface MetricHistory {
  timestamp: Date
  followers: number
  views: number
  videos: number
  engagement: number
}

export interface GrowthInsights {
  dailyChange: number
  weeklyChange: number
  monthlyChange: number
  dailyChangePercent: number
  weeklyChangePercent: number
  monthlyChangePercent: number
  projection: number
}

export interface SearchResult {
  platform: Platform
  username: string
  displayName?: string
  avatarUrl?: string
  verified?: boolean
}