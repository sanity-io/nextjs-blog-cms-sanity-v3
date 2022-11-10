import { previewData } from 'next/headers'

import Alert from '../../components/alert'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const preview = !!previewData()

  return (
    <div className="min-h-screen">
      {preview && <Alert />}
      <main>{children}</main>
    </div>
  )
}

/**
 * If webhooks isn't setup then attempt to re-generate in 1 minute intervals, this applies
 * to all route segments within (blog), so the builds for /studio and other routes are unaffected
 */
// export const revalidate = process.env.SANITY_REVALIDATE_SECRET ? false : 60
// @TODO test if it works
export const revalidate = 60
