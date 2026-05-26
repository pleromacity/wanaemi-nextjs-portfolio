import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

export interface PostMeta {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
  readingTime: string
  published: boolean
}

export interface Post extends PostMeta {
  content: string
}

function ensureDir() {
  if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true })
}

export function getAllPosts(): PostMeta[] {
  ensureDir()
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.mdx') || f.endsWith('.md'))

  return files
    .map(file => {
      const slug = file.replace(/\.(mdx|md)$/, '')
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8')
      const { data, content } = matter(raw)
      return {
        slug,
        title: data.title ?? 'Untitled',
        date: data.date ?? new Date().toISOString(),
        summary: data.summary ?? '',
        tags: data.tags ?? [],
        readingTime: readingTime(content).text,
        published: data.published ?? true,
      } as PostMeta
    })
    .filter(p => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | null {
  ensureDir()
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
  const fallback = path.join(POSTS_DIR, `${slug}.md`)
  const target = fs.existsSync(filePath) ? filePath : fs.existsSync(fallback) ? fallback : null
  if (!target) return null

  const raw = fs.readFileSync(target, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? 'Untitled',
    date: data.date ?? new Date().toISOString(),
    summary: data.summary ?? '',
    tags: data.tags ?? [],
    readingTime: readingTime(content).text,
    published: data.published ?? true,
    content,
  }
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
