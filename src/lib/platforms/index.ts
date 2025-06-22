import { YouTubeService } from './youtube'
import { Platform, ChannelStats } from '@/types'

export class PlatformService {
  private youtube: YouTubeService

  constructor() {
    this.youtube = new YouTubeService()
  }

  async getChannelStats(platform: Platform, username: string): Promise<ChannelStats | null> {
    if (platform === 'youtube') {
      return this.youtube.getChannelStats(username)
    }
    return null
  }

  isYouTubeUrl(query: string): boolean {
    return query.includes('youtube.com') || query.includes('youtu.be')
  }

  extractUsernameFromUrl(url: string): string {
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
  }
}