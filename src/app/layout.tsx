import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#0b1220',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.petsafetytraining.com'),
  title: {
    default: 'Pet Safety Training',
    template: '%s · Pet Safety Training',
  },
  description:
    'Pet Safety Training — safer pets, better homes. Learn pet safety, browse pets for adoption, and support responsible ownership.',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon-180x180.png', sizes: '180x180' }],
  },
  openGraph: {
    title: 'Pet Safety Training',
    description: 'Safer pets, better homes. Training, adoption listings, and educational articles.',
    type: 'website',
    images: ['/social-card.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/social-card.svg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

