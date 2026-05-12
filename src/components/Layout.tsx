import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-paper text-ink">
      <Navbar />
      <main className="flex-1 py-8 sm:py-12">{children}</main>
      <Footer />
    </div>
  )
}
