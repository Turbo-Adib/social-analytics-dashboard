'use client'

import { ChannelStats as ChannelStatsType, MetricHistory } from '@/types'
import { formatNumber, formatGrowth } from '@/lib/utils'
import { TrendingUp, TrendingDown, Users, Eye, Video, Activity } from 'lucide-react'
import StatsChart from './StatsChart'

interface ChannelStatsProps {
  stats: ChannelStatsType & { history?: MetricHistory[] }
}

export default function ChannelStats({ stats }: ChannelStatsProps) {
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'youtube': return 'border-red-500 bg-red-50'
      case 'twitch': return 'border-purple-500 bg-purple-50'
      case 'instagram': return 'border-pink-500 bg-pink-50'
      case 'tiktok': return 'border-black bg-gray-50'
      default: return 'border-gray-500 bg-gray-50'
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'youtube': return '🎥'
      case 'twitch': return '🎮'
      case 'instagram': return '📸'
      case 'tiktok': return '🎵'
      default: return '📊'
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className={`border-2 rounded-lg p-6 mb-8 ${getPlatformColor(stats.platform)}`}>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            {stats.avatarUrl && (
              <img
                src={stats.avatarUrl}
                alt={stats.displayName || stats.username}
                className="w-16 h-16 rounded-full"
              />
            )}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{getPlatformIcon(stats.platform)}</span>
                <h1 className="text-2xl font-bold">
                  {stats.displayName || stats.username}
                </h1>
              </div>
              <p className="text-gray-600 capitalize">
                {stats.platform} • {stats.category}
              </p>
            </div>
          </div>
        </div>
        
        {stats.description && (
          <p className="mt-4 text-gray-700 line-clamp-2">
            {stats.description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-600">Followers</span>
            </div>
            {stats.dailyChange !== 0 && (
              <div className={`flex items-center gap-1 text-sm ${
                stats.dailyChange > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stats.dailyChange > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {formatGrowth(stats.dailyChange)}
              </div>
            )}
          </div>
          <div className="text-2xl font-bold">{formatNumber(stats.followers)}</div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-gray-600">Total Views</span>
          </div>
          <div className="text-2xl font-bold">{formatNumber(stats.views)}</div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center gap-2 mb-2">
            <Video className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium text-gray-600">Videos</span>
          </div>
          <div className="text-2xl font-bold">{formatNumber(stats.videos)}</div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-medium text-gray-600">Engagement</span>
          </div>
          <div className="text-2xl font-bold">{stats.engagement.toFixed(1)}%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {stats.history && stats.history.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Follower Growth</h3>
              <StatsChart data={stats.history} />
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Growth Insights</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Daily Change</span>
                <div className={`font-semibold ${
                  stats.dailyChange > 0 ? 'text-green-600' : 
                  stats.dailyChange < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {formatGrowth(stats.dailyChange)}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Weekly Change</span>
                <div className={`font-semibold ${
                  stats.weeklyChange > 0 ? 'text-green-600' : 
                  stats.weeklyChange < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {formatGrowth(stats.weeklyChange)}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Monthly Change</span>
                <div className={`font-semibold ${
                  stats.monthlyChange > 0 ? 'text-green-600' : 
                  stats.monthlyChange < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {formatGrowth(stats.monthlyChange)}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Views per Video</span>
                <span className="font-medium">
                  {stats.videos > 0 ? formatNumber(Math.round(stats.views / stats.videos)) : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated</span>
                <span className="font-medium">
                  {new Date(stats.lastUpdated).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}