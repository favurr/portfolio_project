import { cn } from '@/lib/utils'
import { Inter, Lexend } from 'next/font/google'
import Providers from '@/components/providers'
import Footer from '@/components/footer'

import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-serif'
})

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
          <main className='grow'>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
