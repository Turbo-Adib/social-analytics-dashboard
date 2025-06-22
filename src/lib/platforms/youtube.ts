import { ChannelStats, Platform } from '@/types'

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3'

export class YouTubeService {
  private apiKey: string

  constructor() {
    this.apiKey = process.env.YOUTUBE_API_KEY || ''
  }

  async getChannelStats(username: string): Promise<ChannelStats | null> {
    try {
      console.log('YouTube API Key:', this.apiKey ? 'Set' : 'Missing')
      console.log('Looking up username:', username)
      
      let channelId = username
      
      if (!username.startsWith('UC')) {
        const searchUrl = `${YOUTUBE_API_BASE}/search?part=snippet&type=channel&q=${encodeURIComponent(username)}&key=${this.apiKey}`
        console.log('Search URL:', searchUrl.replace(this.apiKey, 'API_KEY'))
        
        const searchResponse = await fetch(searchUrl)
        const searchData = await searchResponse.json()
        
        console.log('Search response status:', searchResponse.status)
        console.log('Search data:', searchData)
        
        if (!searchData.items?.length) {
          console.log('No channels found in search')
          return null
        }
        channelId = searchData.items[0].id.channelId
      }

      const [channelResponse, statisticsResponse] = await Promise.all([
        fetch(`${YOUTUBE_API_BASE}/channels?part=snippet&id=${channelId}&key=${this.apiKey}`),
        fetch(`${YOUTUBE_API_BASE}/channels?part=statistics&id=${channelId}&key=${this.apiKey}`)
      ])

      const channelData = await channelResponse.json()
      const statisticsData = await statisticsResponse.json()

      if (!channelData.items?.length || !statisticsData.items?.length) {
        return null
      }

      const channel = channelData.items[0]
      const stats = statisticsData.items[0].statistics

      return {
        id: channelId,
        platform: 'youtube' as Platform,
        username: channel.snippet.customUrl || username,
        displayName: channel.snippet.title,
        avatarUrl: channel.snippet.thumbnails?.high?.url,
        description: channel.snippet.description,
        category: channel.snippet.country || 'Unknown',
        followers: parseInt(stats.subscriberCount || '0'),
        views: parseInt(stats.viewCount || '0'),
        videos: parseInt(stats.videoCount || '0'),
        engagement: 0,
        dailyChange: 0,
        weeklyChange: 0,
        monthlyChange: 0,
        lastUpdated: new Date()
      }
    } catch (error) {
      console.error('YouTube API Error:', error)
      return null
    }
  }
}