import { NextResponse } from 'next/server'
import { CRYPTO_IDS } from '@/lib/api'

// CoinGecko API base URL
const API_BASE_URL = 'https://api.coingecko.com/api/v3'

// API handler for getting crypto prices
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    
    if (action === 'prices') {
      // Get current prices for all cryptocurrencies in the portfolio
      const ids = Object.values(CRYPTO_IDS).join(',')
      const response = await fetch(`${API_BASE_URL}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h,7d,30d`, {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 60 } // Revalidate every 60 seconds
      })
      
      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`)
      }
      
      const data = await response.json()
      return NextResponse.json(data)
    } 
    else if (action === 'chart') {
      // Get chart data for a specific cryptocurrency
      const id = searchParams.get('id')
      const days = searchParams.get('days') || '30'
      
      if (!id) {
        return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 })
      }
      
      const response = await fetch(`${API_BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`, {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 300 } // Revalidate every 5 minutes
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