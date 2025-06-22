import { ChannelStats, Platform } from '@/types'

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3'

export class YouTubeService {
  private apiKey: string

  constructor() {
    this.apiKey = process.env.YOUTUBE_API_KEY || ''
  }

  async getChannelStats(username: string): Promise<ChannelStats | null> {
    try {
      
      let channelId = username
      
      // If not a channel ID, search for the channel
      if (!username.startsWith('UC')) {
        // Try different search methods
        let searchData = null
        
        let searchUrl = `${YOUTUBE_API_BASE}/search?part=snippet&type=channel&q=${encodeURIComponent(username)}&key=${this.apiKey}&maxResults=50`
        
        let searchResponse = await fetch(searchUrl)
        searchData = await searchResponse.json()
        
        if (searchData.error) {
          console.error('YouTube API Error:', searchData.error)
          return null
        }
        
        if (!searchData.items?.length) {
          return null
        }
        
        // Find exact match or closest match
        let channelItem = searchData.items.find((item: any) => 
          item.snippet.title.toLowerCase() === username.toLowerCase() ||
          item.snippet.customUrl?.toLowerCase() === username.toLowerCase() ||
          item.snippet.channelTitle.toLowerCase().includes(username.toLowerCase())
        ) || searchData.items[0]
        
        channelId = channelItem.id.channelId
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
        followers: Number(stats.subscriberCount || '0'),
        views: Number(stats.viewCount || '0'),
        videos: Number(stats.videoCount || '0'),
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