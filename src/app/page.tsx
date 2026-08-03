import { Layout } from '../components/Layout'
import { PostSummary } from '../components/PostSummary'
import { getAllPosts } from '../lib/posts'

export const dynamic = 'force-static'

export default function Page() {
  const posts = getAllPosts()

  return (
    <Layout>
      {posts.map((post, i) => (
        <PostSummary
          key={post.id}
          post={post}
          featured={i === 0}
          last={i === posts.length - 1}
        />
      ))}
    </Layout>
  )
}
