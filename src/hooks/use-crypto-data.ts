import { useState, useEffect } from 'react'
import { 
  getCryptoPrices, 
  getCryptoChartData, 
  CryptoPrice, 
  ChartData, 
  TimeRange, 
  timeRangeToDays,
  CRYPTO_IDS
} from '@/lib/api'

export interface CryptoData {
  prices: CryptoPrice[] | null
  loading: boolean
  error: string | null
}

export interface ChartDataState {
  [key: string]: {
    data: ChartData | null
    loading: boolean
    error: string | null
  }
}

export function useCryptoData() {
  const [cryptoData, setCryptoData] = useState<CryptoData>({
    prices: null,
    loading: true,
    error: null,
  })
  
  const [chartData, setChartData] = useState<ChartDataState>({})
  
  // Fetch current prices for all cryptocurrencies
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const data = await getCryptoPrices()
        setCryptoData({
          prices: data,
          loading: false,
          error: null,
        })
      } catch (error) {
        setCryptoData({
          prices: null,
          loading: false,
          error: 'Failed to fetch cryptocurrency prices',
        })
      }
    }
    
    fetchPrices()
    
    // Refresh prices every 60 seconds
    const intervalId = setInterval(fetchPrices, 60000)
    
    return () => clearInterval(intervalId)
  }, [])
  
  // Function to fetch chart data for a specific cryptocurrency and time range
  const fetchChartData = async (id: string, timeRange: TimeRange = '30d') => {
    const days = timeRangeToDays(timeRange)
    
    // Update loading state for this specific chart
    setChartData(prev => ({
      ...prev,
      [id]: {
        data: prev[id]?.data || null,
        loading: true,
        error: null
      }
    }))
    
    try {
      const data = await getCryptoChartData(id, days)
      setChartData(prev => ({
        ...prev,
        [id]: {
          data,
          loading: false,
          error: null
        }
      }))
    } catch (error) {
      setChartData(prev => ({
        ...prev,
        [id]: {
          data: null,
          loading: false,
          error: 'Failed to fetch chart data'
        }
      }))
    }
  }
  
  // Initial fetch of chart data for all cryptocurrencies
  useEffect(() => {
    Object.values(CRYPTO_IDS).forEach(id => {
      fetchChartData(id)
    })
  }, [])
  
  return {
    cryptoData,
    chartData,
    fetchChartData,
  }
}