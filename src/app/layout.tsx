import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
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
    images: [{ url: '/placeholder.jpg', width: 1200, height: 630, alt: 'a+A Architects' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'a+A Architects | Aplusa Architects',
    description: businessDescription,
    images: ['/placeholder.jpg'],
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
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased" suppressHydrationWarning={true}>
        <StructuredData data={businessSchema} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const darkMode = storedTheme === 'dark' || (!storedTheme && prefersDark);
                document.documentElement.classList.toggle('dark', darkMode);
              } catch (error) {}
            `,
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <SonnerToaster />
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
