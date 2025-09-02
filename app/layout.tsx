import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard BMN',
  description: 'Dashboard monitoring BMN',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-100">
        {children}
      </body>
    </html>
  )
}
