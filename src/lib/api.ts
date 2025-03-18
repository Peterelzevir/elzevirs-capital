import axios from 'axios'

// Cryptocurrency IDs for the portfolio
export const CRYPTO_IDS = {
  bitcoin: 'bitcoin',
  solana: 'solana',
  bnb: 'binancecoin',
  xrp: 'ripple',
}

// Types
export type TimeRange = '1d' | '7d' | '30d' | '90d' | '1y' | 'max'

export interface CryptoPrice {
  id: string
  symbol: string
  name: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  price_change_percentage_24h: number
  price_change_percentage_7d: number
  price_change_percentage_30d: number
  circulating_supply: number
  total_supply: number
  image: string
  last_updated: string
}

export interface ChartData {
  prices: [number, number][] // [timestamp, price]
}

// CoinGecko API base URL
const API_BASE_URL = 'https://api.coingecko.com/api/v3'

// Get current prices for all cryptocurrencies in the portfolio
export async function getCryptoPrices(): Promise<CryptoPrice[]> {
  try {
    const ids = Object.values(CRYPTO_IDS).join(',')
    const response = await axios.get(`${API_BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids,
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: false,
        price_change_percentage: '24h,7d,30d',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching crypto prices:', error)
    return []
  }
}

// Get historical chart data for a specific cryptocurrency
export async function getCryptoChartData(
  id: string,
  days: string = '30'
): Promise<ChartData> {
  try {
    const response = await axios.get(`${API_BASE_URL}/coins/${id}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days,
      },
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching chart data for ${id}:`, error)
    return { prices: [] }
  }
}

// Map time range to days parameter for the API
export function timeRangeToDays(timeRange: TimeRange): string {
  switch (timeRange) {
    case '1d':
      return '1'
    case '7d':
      return '7'
    case '30d':
      return '30'
    case '90d':
      return '90'
    case '1y':
      return '365'
    case 'max':
      return 'max'
    default:
      return '30'
  }
}

// Simplified portfolio data (without actual values as requested)
export const PORTFOLIO_DATA = {
  bitcoin: {
    name: 'Bitcoin',
    symbol: 'BTC',
    image: '/images/bitcoin.svg',
    color: '#F7931A',
  },
  solana: {
    name: 'Solana',
    symbol: 'SOL',
    image: '/images/solana.svg',
    color: '#00FFA3',
  },
  bnb: {
    name: 'BNB',
    symbol: 'BNB',
    image: '/images/bnb.svg',
    color: '#F3BA2F',
  },
  xrp: {
    name: 'XRP',
    symbol: 'XRP',
    image: '/images/xrp.svg',
    color: '#23292F',
  },
}