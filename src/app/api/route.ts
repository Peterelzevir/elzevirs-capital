import { NextResponse } from 'next/server'

// Mark this route as dynamic
export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    name: "Elzevir's Capital API",
    version: "1.0.0",
    endpoints: [
      {
        path: "/api/crypto",
        description: "Cryptocurrency data endpoints",
        params: [
          { name: "action", values: ["prices", "chart"] },
          { name: "id", description: "Crypto ID (required for chart action)" },
          { name: "days", description: "Number of days for chart data (default: 30)" }
        ]
      }
    ]
  })
}
