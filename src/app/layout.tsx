import type { Metadata, Viewport } from 'next'
import { Zen_Maru_Gothic, Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import { SITE } from '../lib/site'

const round = Zen_Maru_Gothic({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-round',
  display: 'swap',
})

const jp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jp',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#fff7f7',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s : ${SITE.title}`,
  },
  description: SITE.description,
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: [{ url: '/favicon.ico' }],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    type: 'website',
    locale: 'ja_JP',
  },
  alternates: {
    types: { 'application/rss+xml': '/index.rdf' },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`${round.variable} ${jp.variable}`}>
      <body>{children}</body>
    </html>
  )
}
