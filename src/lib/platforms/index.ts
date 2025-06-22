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
    console.log('extractUsernameFromUrl called with:', url, platform)
    switch (platform) {
      case 'youtube':
        // Handle @username format
        if (url.includes('/@')) {
          const atMatch = url.match(/\/@([a-zA-Z0-9_-]+)/)
          console.log('YouTube @ match:', atMatch)
          return atMatch ? atMatch[1] : url
        }
        // Handle other YouTube URL formats
        const ytMatch = url.match(/(?:youtube\.com\/(?:c\/|channel\/|user\/)?|youtu\.be\/)([a-zA-Z0-9_-]+)/)
        console.log('YouTube other match:', ytMatch)
        return ytMatch ? ytMatch[1] : url
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