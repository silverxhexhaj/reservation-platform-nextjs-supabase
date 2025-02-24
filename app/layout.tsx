import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, Nunito_Sans } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/app/components/ui/toaster'
import { sharedMetadata, sharedViewport } from './config/shared-metadata'

const inter = Inter({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})
const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-nunito-sans',
})

export const metadata: Metadata = {
  ...sharedMetadata,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Noorlife',
  },
}

export const viewport: Viewport = sharedViewport

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${inter.className} ${spaceGrotesk.variable} ${nunitoSans.variable}`} suppressHydrationWarning>
        <Toaster />
        <div className="min-h-screen">
          <div className="flex-grow">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
