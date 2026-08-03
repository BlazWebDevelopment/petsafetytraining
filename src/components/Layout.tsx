import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div id="top" className="flex min-h-full flex-col">
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-shell flex-1 flex-col gap-10 px-4 pb-24 pt-10 lg:flex-row">
        <main className="min-w-0 flex-1 lg:w-[740px]">
          <div className="main-inner">{children}</div>
        </main>
        <Sidebar />
      </div>
      <SiteFooter />
    </div>
  )
}
