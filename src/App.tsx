import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ArticlePage } from './pages/ArticlePage'
import { AdoptPage } from './pages/AdoptPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'

const ARTICLE_SLUG = 'when-wealth-isnt-enough'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="adopt" element={<AdoptPage />} />
        <Route
          path="article"
          element={<Navigate to={`/article/${ARTICLE_SLUG}`} replace />}
        />
        <Route path="article/:slug" element={<ArticlePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
