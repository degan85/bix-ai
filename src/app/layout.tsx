import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BIX AI - BIX5 코드 생성기',
  description: '자연어로 설명하면 BIX5 전용 코드를 생성해주는 AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}
