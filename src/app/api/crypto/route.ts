import { NextResponse } from 'next/server'
import { CRYPTO_IDS } from '@/lib/api'

// CoinGecko API base URL
const API_BASE_URL = 'https://api.coingecko.com/api/v3'

// Mark this route as dynamic
export const dynamic = 'force-dynamic'

// API handler for getting crypto prices
export async function GET(request: Request) {
  try {
    // Use searchParams from URL object in a way that supports both static and dynamic rendering
    const url = new URL(request.url)
    const action = url.searchParams.get('action')
    
    if (action === 'prices') {
      // Get current prices for all cryptocurrencies in the portfolio
      const ids = Object.values(CRYPTO_IDS).join(',')
      const response = await fetch(`${API_BASE_URL}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h,7d,30d`, {
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-store'
      })
      
      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`)
      }
      
      const data = await response.json()
      return NextResponse.json(data)
    } 
    else if (action === 'chart') {
      // Get chart data for a specific cryptocurrency
      const id = url.searchParams.get('id')
      const days = url.searchParams.get('days') || '30'
      
      if (!id) {
        return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 })
      }
      
      const response = await fetch(`${API_BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`, {
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-store'
      })
      
      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`)
      }
      
      const data = await response.json()
      return NextResponse.json(data)
    }
    
    return NextResponse.json({ error: 'Invalid action parameter' }, { status: 400 })
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json({ error: 'Failed to fetch data from CoinGecko' }, { status: 500 })
  }
}
