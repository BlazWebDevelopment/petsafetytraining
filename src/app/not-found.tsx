import Link from 'next/link'
import { Layout } from '../components/Layout'

export default function NotFound() {
  return (
    <Layout>
      <div className="article-box px-6 py-16 text-center">
        <p className="font-round text-[42px] font-bold text-rose-soft">404</p>
        <h1 className="mt-3 font-round text-[18px] font-bold text-ink">
          ページが見つかりませんでした
        </h1>
        <p className="mt-4 text-[13px] leading-[2] text-ink-soft">
          お探しの記事は移動または削除された可能性があります。
        </p>
        <div className="mt-8">
          <Link href="/" className="btn-more">
            記事一覧へもどる
          </Link>
        </div>
      </div>
    </Layout>
  )
}
