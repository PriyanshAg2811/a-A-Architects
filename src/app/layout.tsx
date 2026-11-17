import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { PerformanceObserver } from '@/components/performance-observer';
import './globals.css'
import { StructuredData } from '@/components/structured-data';
import { businessSchema, businessDescription } from '@/lib/business';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aplusa-architects.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'a+A Architects | a Plus A Architects | Aplusa Architects',
  description: businessDescription,
  keywords: ['a+A architects', 'a+a architects', 'a + a architects', 'a plus a architects', 'Aplusa Architects', 'aplusa architects', 'architecture studio', 'architectural firm'],
  generator: 'v0.app',
  openGraph: {
    title: 'a+A Architects | a Plus A Architects | Aplusa Architects',
    description: businessDescription,
    url: siteUrl,
    siteName: 'a+A Architects',
    type: 'website',
    images: [{ url: '/images/hero/hero-light-1672.webp', width: 1200, height: 630, alt: 'a+A Architects' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'a+A Architects | Aplusa Architects',
    description: businessDescription,
    images: ['/images/hero/hero-light-1672.webp'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'mask-icon',
        url: '/icon.svg',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning={true}>
        <StructuredData data={businessSchema} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:bg-background focus:p-3 focus:text-foreground">Skip to content</a>
          {children}
          <SonnerToaster />
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {process.env.NEXT_PUBLIC_ENABLE_ANALYTICS_EVENTS === 'true' && <PerformanceObserver />}
      </body>
    </html>
  )
}
