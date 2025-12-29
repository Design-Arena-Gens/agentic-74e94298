'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [ipData, setIpData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/ip')
      .then(res => res.json())
      .then(data => {
        setIpData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        maxWidth: '600px',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: '2.5em',
          margin: '0 0 10px 0',
          color: '#333',
          textAlign: 'center'
        }}>
          HR IP Tracker
        </h1>
        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '30px'
        }}>
          Your Network Information
        </p>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #667eea',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }}></div>
          </div>
        ) : ipData ? (
          <div>
            <div style={{
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: '10px',
              marginBottom: '15px'
            }}>
              <div style={{ fontSize: '0.9em', color: '#666', marginBottom: '5px' }}>Your IP Address</div>
              <div style={{ fontSize: '1.8em', fontWeight: 'bold', color: '#667eea' }}>
                {ipData.ip}
              </div>
            </div>

            {ipData.location && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '15px'
              }}>
                <InfoCard label="Country" value={ipData.location.country || 'N/A'} />
                <InfoCard label="Region" value={ipData.location.region || 'N/A'} />
                <InfoCard label="City" value={ipData.location.city || 'N/A'} />
                <InfoCard label="Timezone" value={ipData.location.timezone || 'N/A'} />
              </div>
            )}

            {ipData.userAgent && (
              <div style={{
                marginTop: '20px',
                padding: '15px',
                background: '#f8f9fa',
                borderRadius: '10px',
                fontSize: '0.85em',
                color: '#666'
              }}>
                <strong>User Agent:</strong><br />
                {ipData.userAgent}
              </div>
            )}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
            Unable to fetch IP information
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      background: '#f8f9fa',
      padding: '15px',
      borderRadius: '10px',
      border: '1px solid #e9ecef'
    }}>
      <div style={{ fontSize: '0.85em', color: '#666', marginBottom: '5px' }}>{label}</div>
      <div style={{ fontSize: '1.1em', fontWeight: '600', color: '#333' }}>{value}</div>
    </div>
  )
}
