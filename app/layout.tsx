import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HR IP Tracker',
  description: 'Track and display IP information',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
