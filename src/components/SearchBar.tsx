'use client'

import { useState } from 'react'
import { Search, Youtube } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string) => void
  loading?: boolean
}

export default function SearchBar({ onSearch, loading = false }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter YouTube channel name or URL (e.g., MrBeast, youtube.com/@MrBeast)"
              className="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-lg"
              disabled={loading}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition-colors flex items-center gap-2"
          >
            <Youtube className="w-5 h-5" />
            {loading ? 'Searching...' : 'Search YouTube'}
          </button>
        </div>
      </form>
      
      <div className="mt-4 flex flex-wrap gap-2 justify-center text-sm text-gray-700">
        <span className="font-medium">Try these popular channels:</span>
        {['MrBeast', 'PewDiePie', 'MKBHD', 'Dude Perfect'].map((example) => (
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