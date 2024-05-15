import { url } from 'inspector'
import './globals.css'
import type { Metadata } from 'next'
import { Inter,Manrope } from 'next/font/google'

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
      <body className={manrope.className}>{children}</body>
    </html>
  )
}
