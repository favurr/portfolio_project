import type { Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'

import { cn } from '@/lib/utils'

import '@/app/globals.css'
import Providers from '@/components/providers'
import Header from '@/components/header'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-serif'
})

export const metadata: Metadata = {
  title: "Favurr. | Full-Stack Developer's Portfolio",
  description:
    'A modern, responsive portfolio website built with Next.js, MDX, and Tailwind CSS. Showcasing projects, blog posts, and contact features for developers and creatives.',
  keywords: [
    'Favurr',
    'Portfolio',
    'Next.js',
    'MDX',
    'Tailwind CSS',
    'React',
    'Full-Stack Developer',
    'Web Development',
    'Projects',
    'Blog',
    'JavaScript',
    'Frontend',
    'Backend',
    'TypeScript',
    'Dark Mode',
    'Newsletter',
    'SEO'
  ],
  authors: [{ name: 'Favurr', url: 'https://github.com/favurr' }],
  creator: 'Favurr',
  openGraph: {
    title: "Favurr. | Full-Stack Developer's Portfolio",
    description:
      'A modern, responsive portfolio website built with Next.js, MDX, and Tailwind CSS. Showcasing projects, blog posts, and contact features for developers and creatives.',
    url: 'https://portfolio-five-tan-29.vercel.app/',
    siteName: 'Favurr. Portfolio',
    images: [
      {
        url: 'https://portfolio-five-tan-29.vercel.app/images/favicon.png',
        width: 800,
        height: 800,
        alt: 'Favurr Profile Picture'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Favurr. Portfolio',
    description:
      'A modern, responsive portfolio website built with Next.js, MDX, and Tailwind CSS.',
    images: ['https://portfolio-five-tan-29.vercel.app/images/favicon.png'],
    creator: '@emekafavi2019'
  },
  metadataBase: new URL('https://portfolio-five-tan-29.vercel.app/')
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='icon' href='/favicon.png' type='image/x-icon' />
      </head>
      <body
        className={cn(
          'flex min-h-screen flex-col font-sans antialiased',
          inter.variable,
          lexend.variable
        )}
      >
        <Providers>
          <Header />
          <main className='grow'>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
