import { NextRequest, NextResponse } from 'next/server'
import { PlatformService } from '@/lib/platforms'
import { prisma } from '@/lib/prisma'
import { redisCache } from '@/lib/redis'
import { Platform } from '@/types'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ platform: Platform; username: string }> }
) {
  try {
    const { platform, username } = await params
    const cacheKey = `channel:${platform}:${username}`
    
    // Try to get from cache
    const cachedData = await redisCache.get(cacheKey)
    if (cachedData) {
      return NextResponse.json(JSON.parse(cachedData))
    }

    const platformService = new PlatformService()
    const stats = await platformService.getChannelStats(platform, username)
    
    if (!stats) {
      return NextResponse.json(
        { error: 'Channel not found' },
        { status: 404 }
      )
    }

    let platformRecord = await prisma.platform.findUnique({
      where: { name: platform }
    })

    if (!platformRecord) {
      platformRecord = await prisma.platform.create({
        data: { name: platform }
      })
    }

    let channel = await prisma.channel.findUnique({
      where: {
        platformId_username: {
          platformId: platformRecord.id,
          username: stats.username
        }
      },
      include: {
        metrics: {
          orderBy: { timestamp: 'desc' },
          take: 30
        }
      }
    })

    if (!channel) {
      channel = await prisma.channel.create({
        data: {
          platformId: platformRecord.id,
          username: stats.username,
          displayName: stats.displayName,
          avatarUrl: stats.avatarUrl,
          description: stats.description,
          category: stats.category
        },
        include: {
          metrics: true
        }
      })
    } else {
      await prisma.channel.update({
        where: { id: channel.id },
        data: {
          displayName: stats.displayName,
          avatarUrl: stats.avatarUrl,
          description: stats.description,
          category: stats.category
        }
      })
    }

    const lastMetric = channel.metrics[0]
    let dailyChange = 0
    let weeklyChange = 0
    let monthlyChange = 0

    if (lastMetric) {
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

      const dayMetric = channel.metrics.find(m => m.timestamp >= dayAgo)
      const weekMetric = channel.metrics.find(m => m.timestamp >= weekAgo)
      const monthMetric = channel.metrics.find(m => m.timestamp >= monthAgo)

      if (dayMetric) dailyChange = stats.followers - Number(dayMetric.followers)
      if (weekMetric) weeklyChange = stats.followers - Number(weekMetric.followers)
      if (monthMetric) monthlyChange = stats.followers - Number(monthMetric.followers)
    }

    await prisma.metric.create({
      data: {
        channelId: channel.id,
        followers: BigInt(stats.followers),
        views: BigInt(stats.views),
        videos: stats.videos,
        engagement: stats.engagement,
        dailyChange: BigInt(dailyChange),
        weeklyChange: BigInt(weeklyChange),
        monthlyChange: BigInt(monthlyChange)
      }
    })

    const responseData = {
      ...stats,
      dailyChange,
      weeklyChange,
      monthlyChange,
      history: channel.metrics.map(m => ({
        timestamp: m.timestamp,
        followers: Number(m.followers),
        views: Number(m.views),
        videos: m.videos,
        engagement: m.engagement
      }))
    }

    // Cache the response
    await redisCache.setEx(cacheKey, 3600, JSON.stringify(responseData))

    return NextResponse.json(responseData)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}