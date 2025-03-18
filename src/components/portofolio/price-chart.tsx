"use client"

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts'
import { TimeRange } from '@/lib/api'
import { formatCurrency } from '@/lib/utils'

interface PriceChartProps {
  data: [number, number][]
  color: string
  timeRange: TimeRange
  isPositive: boolean
}

interface ChartDataPoint {
  timestamp: number
  price: number
}

export function PriceChart({
  data,
  color,
  timeRange,
  isPositive,
}: PriceChartProps) {
  const [isAnimating, setIsAnimating] = useState(true)
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const svgRef = useRef<SVGSVGElement>(null)
  
  // Format data for the chart
  useEffect(() => {
    if (!data || data.length === 0) {
      setChartData([])
      return
    }
    
    // Process data for chart
    const formattedData = data.map(([timestamp, price]) => ({
      timestamp,
      price,
    }))
    
    // Ensure we have a reasonable number of points for smoother chart
    const step = Math.max(1, Math.floor(formattedData.length / 100))
    const sampledData = formattedData.filter((_, i) => i % step === 0)
    
    setChartData(sampledData)
    setIsAnimating(true)
    
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [data])
  
  // No data available
  if (chartData.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        No data available
      </div>
    )
  }
  
  // Format date for tooltip and x-axis
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    
    switch (timeRange) {
      case '1d':
        return date.toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      case '7d':
        return date.toLocaleDateString([], { 
          weekday: 'short', 
          month: 'numeric', 
          day: 'numeric' 
        })
      default:
        return date.toLocaleDateString([], { 
          month: 'short', 
          day: 'numeric' 
        })
    }
  }
  
  // Custom Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border p-2 rounded-md shadow-sm text-sm">
          <p className="font-medium">{formatCurrency(payload[0].value)}</p>
          <p className="text-xs text-muted-foreground">
            {formatDate(payload[0].payload.timestamp)}
          </p>
        </div>
      )
    }
    
    return null
  }
  
  // Calculate min and max values with padding
  const prices = chartData.map(d => d.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const padding = (maxPrice - minPrice) * 0.1
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        
        <XAxis 
          dataKey="timestamp" 
          tickFormatter={formatDate}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10 }}
          minTickGap={30}
          hide
        />
        
        <YAxis 
          domain={[minPrice - padding, maxPrice + padding]}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10 }}
          width={40}
          hide
        />
        
        <Tooltip content={<CustomTooltip />} />
        
        <Area
          type="monotone"
          dataKey="price"
          stroke={color}
          strokeWidth={2}
          fillOpacity={1}
          fill={`url(#gradient-${color.replace('#', '')})`}
          isAnimationActive={isAnimating}
          animationDuration={1000}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}