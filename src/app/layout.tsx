import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { AuthProvider } from '@/contexts/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LinguaSchool - Online Language Learning Platform',
  description: 'Professional online language courses with personalized approach and proven results',
  keywords: 'language learning, online courses, English, Polish, Ukrainian, Russian',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  authors: [{ name: 'LinguaSchool Team' }],
  openGraph: {
    title: 'LinguaSchool - Online Language Learning Platform',
    description: 'Professional online language courses with personalized approach and proven results',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}