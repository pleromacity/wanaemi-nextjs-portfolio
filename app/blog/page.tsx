import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import BlogSearch from '@/components/BlogSearch'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles on cloud engineering, DevOps, platform architecture, and site reliability.',
}

export default function BlogPage() {
  const posts  = getAllPosts()
  const allTags = Array.from(new Set(posts.flatMap(p => p.tags))).sort()

  return (
    <div className="max-w-3xl mx-auto px-5 py-16 sm:py-24">
      <div className="mb-10 animate-fade-up">
        <p className="section-label">Blog</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
          Writing
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Thoughts on cloud infrastructure, DevOps culture, platform engineering, and reliability.
          {posts.length > 0 && (
            <span className="ml-1 text-zinc-400 dark:text-zinc-500">
              — {posts.length} post{posts.length !== 1 ? 's' : ''}
            </span>
          )}
        </p>
      </div>

      <div className="animate-fade-up" style={{ animationDelay: '0.08s' }}>
        {posts.length > 0 ? (
          <BlogSearch posts={posts} allTags={allTags} />
        ) : (
          <div className="py-24 text-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
            <p className="text-2xl mb-2">✍️</p>
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              First post coming soon
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
              Add <code className="font-mono bg-zinc-100 dark:bg-zinc-800 px-1 rounded">
                .mdx
              </code> files inside <code className="font-mono bg-zinc-100 dark:bg-zinc-800 px-1 rounded">
                content/posts/
              </code> to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
