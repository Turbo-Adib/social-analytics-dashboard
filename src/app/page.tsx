'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SearchBar from '@/components/SearchBar'
import { Platform } from '@/types'
import { PlatformService } from '@/lib/platforms'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSearch = async (query: string) => {
    setLoading(true)
    
    try {
      const platformService = new PlatformService()
      let username = query.trim()
      
      // If it's a YouTube URL, extract the username
      if (platformService.isYouTubeUrl(query)) {
        username = platformService.extractUsernameFromUrl(query)
      }
      
      if (username) {
        router.push(`/channel/youtube/${encodeURIComponent(username)}`)
      } else {
        alert('Please enter a valid YouTube channel name or URL')
      }
    } catch (error) {
      console.error('Search error:', error)
      alert('An error occurred during search. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Social<span className="text-red-600">Analytics</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Track real-time YouTube channel statistics, subscriber growth, and engagement metrics
          </p>
        </div>
        
        <SearchBar onSearch={handleSearch} loading={loading} />
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-red-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-red-600 text-xl font-bold">📊</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-time Stats</h3>
            <p className="text-gray-600">Get up-to-date follower counts, views, and engagement metrics</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-red-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-red-600 text-xl font-bold">📈</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Growth Insights</h3>
            <p className="text-gray-600">Track daily, weekly, and monthly growth with projections</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-red-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-red-600 text-xl font-bold">🏆</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Rankings</h3>
            <p className="text-gray-600">See where channels rank within their categories</p>
          </div>
        </div>
      </div>
    </div>
  )
}
