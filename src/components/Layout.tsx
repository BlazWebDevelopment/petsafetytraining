import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-32 -top-44 h-[520px] w-[520px] rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute -right-32 -top-44 h-[520px] w-[520px] rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute left-1/2 top-[20vh] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <Navbar />
      <main className="py-10">{children}</main>
      <Footer />
    </div>
  )
}

