import { YouTubeService } from './youtube'
import { TwitchService } from './twitch'
import { Platform, ChannelStats } from '@/types'

export class PlatformService {
  private youtube: YouTubeService
  private twitch: TwitchService

  constructor() {
    this.youtube = new YouTubeService()
    this.twitch = new TwitchService()
  }

  async getChannelStats(platform: Platform, username: string): Promise<ChannelStats | null> {
    switch (platform) {
      case 'youtube':
        return this.youtube.getChannelStats(username)
      case 'twitch':
        return this.twitch.getChannelStats(username)
      case 'instagram':
        return null
      case 'tiktok':
        return null
      default:
        return null
    }
  }

  detectPlatform(query: string): Platform | null {
    if (query.includes('youtube.com') || query.includes('youtu.be')) {
      return 'youtube'
    }
    if (query.includes('twitch.tv')) {
      return 'twitch'
    }
    if (query.includes('instagram.com')) {
      return 'instagram'
    }
    if (query.includes('tiktok.com')) {
      return 'tiktok'
    }
    return null
  }

  extractUsernameFromUrl(url: string, platform: Platform): string {
    switch (platform) {
      case 'youtube':
        // Handle @username format (e.g., youtube.com/@MrBeast)
        if (url.includes('/@')) {
          const atMatch = url.match(/\/@([a-zA-Z0-9_.-]+)/)
          return atMatch ? atMatch[1] : url
        }
        // Handle channel URLs (e.g., youtube.com/c/MrBeast)
        if (url.includes('/c/')) {
          const cMatch = url.match(/\/c\/([a-zA-Z0-9_.-]+)/)
          return cMatch ? cMatch[1] : url
        }
        // Handle user URLs (e.g., youtube.com/user/MrBeast)
        if (url.includes('/user/')) {
          const userMatch = url.match(/\/user\/([a-zA-Z0-9_.-]+)/)
          return userMatch ? userMatch[1] : url
        }
        // Handle channel ID URLs (e.g., youtube.com/channel/UC...)
        if (url.includes('/channel/')) {
          const channelMatch = url.match(/\/channel\/([a-zA-Z0-9_-]+)/)
          return channelMatch ? channelMatch[1] : url
        }
        // If no pattern matches, return the original
        return url
      case 'twitch':
        const twitchMatch = url.match(/twitch\.tv\/([a-zA-Z0-9_]+)/)
        return twitchMatch ? twitchMatch[1] : url
      case 'instagram':
        const igMatch = url.match(/instagram\.com\/([a-zA-Z0-9_.]+)/)
        return igMatch ? igMatch[1] : url
      case 'tiktok':
        const ttMatch = url.match(/tiktok\.com\/@([a-zA-Z0-9_.]+)/)
        return ttMatch ? ttMatch[1] : url
      default:
        return url
    }
  }
}