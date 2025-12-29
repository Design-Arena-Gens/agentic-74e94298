import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0] || realIp || 'Unknown'

  const userAgent = request.headers.get('user-agent') || 'Unknown'

  let location = null

  try {
    const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`)
    if (geoResponse.ok) {
      const geoData = await geoResponse.json()
      location = {
        country: geoData.country_name,
        region: geoData.region,
        city: geoData.city,
        timezone: geoData.timezone
      }
    }
  } catch (error) {
    console.error('Error fetching geo data:', error)
  }

  return NextResponse.json({
    ip,
    userAgent,
    location,
    timestamp: new Date().toISOString()
  })
}
