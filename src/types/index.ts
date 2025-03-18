// Common types used throughout the application

// Crypto Data Types
export interface CryptoAsset {
  id: string
  name: string
  symbol: string
  image: string
  color: string
  current_price?: number
  market_cap?: number
  market_cap_rank?: number
  price_change_percentage_24h?: number
  price_change_percentage_7d?: number
  price_change_percentage_30d?: number
  total_supply?: number
  circulating_supply?: number
}

export interface ChartDataPoint {
  timestamp: number
  price: number
}

export interface ChartConfig {
  timeRange: TimeRange
  color: string
  isPositive: boolean
}

export type TimeRange = '1d' | '7d' | '30d' | '90d' | '1y' | 'max'

// Animation Types
export interface AnimationProps {
  duration?: number
  delay?: number
  ease?: string
  once?: boolean
}

export interface MotionConfig {
  initial: any
  animate: any
  transition: any
  exit?: any
}

// Theme Types
export interface ThemeColors {
  primaryColor: string
  backgroundColor: string
  foregroundColor: string
  muted: string
}