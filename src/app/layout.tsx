import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Source_Serif_4 } from 'next/font/google'
import './globals.css'

const display = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const serif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#f3ead4',
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
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    shortcut: [{ url: '/favicon.ico' }],
    apple: [
      { url: '/apple-touch-icon.png' },
      { url: '/apple-touch-icon-180x180.png', sizes: '180x180' },
    ],
  },
  openGraph: {
    title: 'Pet Safety Training · The Modern Old-School Edition',
    description:
      'Safer pets, better homes. Training, adoption listings, and editorial articles in a newspaper-style edition.',
    type: 'website',
    images: [
      {
        url: '/social-card.svg',
        width: 1200,
        height: 630,
        alt: 'Pet Safety Training — The Modern Old-School Edition',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pet Safety Training · The Modern Old-School Edition',
    description:
      'Safer pets, better homes. Training, adoption listings, and editorial articles.',
    images: ['/social-card.svg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  )
}
