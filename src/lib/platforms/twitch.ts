import { ChannelStats, Platform } from '@/types'

const TWITCH_API_BASE = 'https://api.twitch.tv/helix'

export class TwitchService {
  private clientId: string
  private clientSecret: string
  private accessToken: string | null = null

  constructor() {
    this.clientId = process.env.TWITCH_CLIENT_ID || ''
    this.clientSecret = process.env.TWITCH_CLIENT_SECRET || ''
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken) return this.accessToken

    const response = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'client_credentials'
      })
    })

    const data = await response.json()
    this.accessToken = data.access_token
    return this.accessToken
  }

  async getChannelStats(username: string): Promise<ChannelStats | null> {
    try {
      const accessToken = await this.getAccessToken()
      
      const userResponse = await fetch(
        `${TWITCH_API_BASE}/users?login=${username}`,
        {
          headers: {
            'Client-ID': this.clientId,
            'Authorization': `Bearer ${accessToken}`
          }
        }
      )

      const userData = await userResponse.json()
      if (!userData.data?.length) return null

      const user = userData.data[0]

      const followersResponse = await fetch(
        `${TWITCH_API_BASE}/channels/followers?broadcaster_id=${user.id}`,
        {
          headers: {
            'Client-ID': this.clientId,
            'Authorization': `Bearer ${accessToken}`
          }
        }
      )

      const followersData = await followersResponse.json()

      return {
        id: user.id,
        platform: 'twitch' as Platform,
        username: user.login,
        displayName: user.display_name,
        avatarUrl: user.profile_image_url,
        description: user.description,
        category: user.broadcaster_type || 'Streamer',
        followers: followersData.total || 0,
        views: parseInt(user.view_count || '0'),
        videos: 0,
        engagement: 0,
        dailyChange: 0,
        weeklyChange: 0,
        monthlyChange: 0,
        lastUpdated: new Date()
      }
    } catch (error) {
      console.error('Twitch API Error:', error)
      return null
    }
  }
}