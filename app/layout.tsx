import { url } from 'inspector'
import './globals.css'
import type { Metadata } from 'next'
import { Inter,Manrope } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })
const manrope = Manrope({subsets:['latin']})

export const metadata: Metadata = {
  title: 'Whinst',
  description: 'Create and share digital catalogs of your products and services with your customers!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-J3V2G2JLFJ"></Script>
<Script id="google-analytics">
  { `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'G-J3V2G2JLFJ');
      `
  }
</Script>
      </head>
      <body className={manrope.className}>{children}</body>
    </html>
  )
}
