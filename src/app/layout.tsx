import type { Metadata, Viewport } from 'next'
import { DM_Sans, Outfit } from 'next/font/google'
import './globals.css'

const display = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const sans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#f6f4ef',
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
    title: 'Pet Safety Training · Modern pet safety & adoption',
    description:
      'Safer pets, better homes. Training resources, adoption listings, and articles for thoughtful pet owners.',
    type: 'website',
    images: [
      {
        url: '/social-card.svg',
        width: 1200,
        height: 630,
        alt: 'Pet Safety Training',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pet Safety Training · Modern pet safety & adoption',
    description:
      'Safer pets, better homes. Training resources and adoption listings.',
    images: ['/social-card.svg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
