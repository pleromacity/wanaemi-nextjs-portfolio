export interface GithubRepo {
  id:          number
  name:        string
  description: string | null
  html_url:    string
  homepage:    string | null
  language:    string | null
  stargazers_count: number
  forks_count: number
  topics:      string[]
  updated_at:  string
  fork:        boolean
  archived:    boolean
}

export async function getGithubRepos(username: string): Promise<GithubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=30&type=owner`,
      {
        next: { revalidate: 3600 }, // cache for 1 hour
        headers: {
          Accept: 'application/vnd.github+json',
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
      }
    )

    if (!res.ok) return []
    const data: GithubRepo[] = await res.json()
    return data
      .filter(r => !r.fork && !r.archived)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
  } catch {
    return []
  }
}

export const LANG_COLORS: Record<string, string> = {
  TypeScript:  '#3178c6',
  JavaScript:  '#f7df1e',
  Python:      '#3572A5',
  Go:          '#00ADD8',
  Rust:        '#dea584',
  Shell:       '#89e051',
  Dockerfile:  '#384d54',
  HCL:         '#844FBA',
  YAML:        '#cb171e',
  HTML:        '#e34c26',
  CSS:         '#563d7c',
  default:     '#6366f1',
}
