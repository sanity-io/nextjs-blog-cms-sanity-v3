import '../tailwind.css'
import type { Metadata } from 'next'

// Default site metadata used on all pages
export const metadata: Metadata = {
  title: {
    default: 'Solovoro',
    template: '%s | Solovoro',
  },
  description:
    'Solovoro connects you with trusted local moving, plumbing, cleaning and roofing services across Canada.',
  icons: {
    icon: '/logo.png',
  },
  metadataBase: new URL('https://solovoro.ca'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
