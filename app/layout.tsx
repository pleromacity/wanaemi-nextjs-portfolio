import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: {
    default:  siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title:       siteConfig.title,
    description: siteConfig.description,
    url:         siteConfig.url,
    siteName:    siteConfig.name,
    locale:      'en_US',
    type:        'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index:  true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Header />
          <main className="flex-1 pt-14">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
