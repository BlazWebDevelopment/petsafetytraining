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
    default: 'Pets Safety Training',
    template: '%s · Pets Safety Training',
  },
  description:
    'Professional pet safety training for safer pets and better homes. Learn pet safety, browse pets for adoption, and support responsible ownership.',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
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
    title: 'Pets Safety Training · Pet safety & adoption',
    description:
      'Professional pet safety training — safer pets, better homes. Training resources, adoption listings, and articles for thoughtful pet owners.',
    type: 'website',
    images: [
      {
        url: '/Logo.jpg',
        width: 400,
        height: 400,
        alt:
          'Pets Safety Training logo featuring a cartoon puppy with a safety shield and paw prints',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pets Safety Training · Pet safety & adoption',
    description:
      'Professional pet safety training — safer pets, better homes.',
    images: ['/Logo.jpg'],
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
