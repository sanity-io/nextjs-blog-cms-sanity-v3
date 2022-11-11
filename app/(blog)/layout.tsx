/* eslint-disable @next/next/no-html-link-for-pages */
import { previewData } from 'next/headers'

import Container from '../../components/container'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <Alert />
      <main>{children}</main>
    </div>
  )
}

function Alert() {
  if (!previewData()) return

  return (
    <div className="border-b border-accent-7 bg-accent-7 text-white">
      <Container>
        <div className="py-2 text-center text-sm">
          This page is a preview.{' '}
          <a
            href="/api/exit-preview"
            className="underline transition-colors duration-200 hover:text-cyan"
          >
            Click here
          </a>{' '}
          to exit preview mode.
        </div>
      </Container>
    </div>
  )
}

/**
 * If webhooks isn't setup then attempt to re-generate in 1 minute intervals, this applies
 * to all route segments within (blog), so the builds for /studio and other routes are unaffected
 * Setting it to `0` means it will fetch new data on every request, while `false` means the cache is only purged and new data fetched when webhooks call pages/api/revalidate
 */
// @TODO it appears this option doesn't have an effect when `previewData()` from `next/headers` is used, it's like it forces `revalidate` to be `0`
// export const revalidate = process.env.SANITY_REVALIDATE_SECRET ? false : 0
