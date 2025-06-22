'use client'

import { useState } from 'react'
import { Search, Youtube, Twitch, Instagram } from 'lucide-react'
import { Platform } from '@/types'

interface SearchBarProps {
  onSearch: (query: string, platform?: Platform) => void
  loading?: boolean
}

export default function SearchBar({ onSearch, loading = false }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim(), selectedPlatform === 'all' ? undefined : selectedPlatform)
    }
  }

  const platforms = [
    { id: 'all', name: 'All Platforms', icon: Search },
    { id: 'youtube', name: 'YouTube', icon: Youtube },
    { id: 'twitch', name: 'Twitch', icon: Twitch },
    { id: 'instagram', name: 'Instagram', icon: Instagram },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter channel name or URL (e.g., @MrBeast, pewdiepie, youtube.com/c/mkbhd)"
              className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-lg"
              disabled={loading}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value as Platform | 'all')}
            className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none bg-white"
            disabled={loading}
          >
            {platforms.map((platform) => (
              <option key={platform.id} value={platform.id}>
                {platform.name}
              </option>
            ))}
          </select>
          
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition-colors"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      
      <div className="mt-4 flex flex-wrap gap-2 justify-center text-sm text-gray-600">
        <span>Popular:</span>
        {['MrBeast', 'PewDiePie', 'Ninja', 'TheEllenShow'].map((example) => (
          <button
            key={example}
            onClick={() => setQuery(example)}
            className="hover:text-red-600 hover:underline"
            disabled={loading}
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  )
}