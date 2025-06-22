import { createClient } from 'redis'

let redis: any = null
let redisConnected = false

try {
  redis = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  })

  redis.on('error', (err: any) => {
    console.log('Redis not available, running without cache:', err.message)
    redisConnected = false
  })

  redis.on('connect', () => {
    redisConnected = true
    console.log('Redis connected')
  })

  // Connect to Redis
  redis.connect().catch(() => {
    console.log('Redis connection failed, running without cache')
    redisConnected = false
  })
} catch (error) {
  console.log('Redis setup failed, running without cache')
  redisConnected = false
}

// Safe Redis wrapper
export const redisCache = {
  async get(key: string) {
    if (!redisConnected || !redis) return null
    try {
      return await redis.get(key)
    } catch {
      return null
    }
  },
  
  async setEx(key: string, seconds: number, value: string) {
    if (!redisConnected || !redis) return false
    try {
      await redis.setEx(key, seconds, value)
      return true
    } catch {
      return false
    }
  }
}