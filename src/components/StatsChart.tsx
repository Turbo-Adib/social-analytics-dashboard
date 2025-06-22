'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { MetricHistory } from '@/types'
import { formatNumber } from '@/lib/utils'

interface StatsChartProps {
  data: MetricHistory[]
}

export default function StatsChart({ data }: StatsChartProps) {
  const chartData = data
    .slice()
    .reverse()
    .map(item => ({
      ...item,
      date: new Date(item.timestamp).toLocaleDateString()
    }))

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => formatNumber(value)}
          />
          <Tooltip 
            formatter={(value: number) => [formatNumber(value), 'Followers']}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Line 
            type="monotone" 
            dataKey="followers" 
            stroke="#ef4444" 
            strokeWidth={2}
            dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}