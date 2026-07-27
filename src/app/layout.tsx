import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aplusa-architects.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'a+A Architects | a Plus A Architects',
  description: 'Award-winning architecture studio specializing in modern residential and commercial design, also known as a + a architects and a plus a architects.',
  keywords: ['a+a architects', 'a plus a architects', 'a + a architects', 'architecture studio', 'architectural firm'],
  generator: 'v0.app',
  openGraph: {
    title: 'a+A Architects | a Plus A Architects',
    description: 'Award-winning architecture studio specializing in modern residential and commercial design, also known as a + a architects and a plus a architects.',
    url: siteUrl,
    siteName: 'a+A Architects',
    type: 'website',
    images: [{ url: '/placeholder.jpg', width: 1200, height: 630, alt: 'a+A Architects' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'a+A Architects | Architect',
    description: 'Award-winning architecture studio specializing in modern residential and commercial design. Creating spaces that inspire.',
    images: ['/placeholder.jpg'],
  },
  icons: {
    icon: {
      url: '/icon.svg',
      type: 'image/svg+xml',
    },
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
