/* eslint-disable @next/next/no-html-link-for-pages */
import Container from 'components/BlogContainer'

export default function Alert({
  preview,
  loading,
}: {
  preview?: boolean
  loading?: boolean
}) {
  if (!preview) return null

  return (
    <div
      className={`${
        loading ? 'animate-pulse' : ''
      } border-b border-accent-7 bg-accent-7 text-white`}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {'Previewing draft content. '}
          <a
            href="/api/disable-draft"
            className="underline transition-colors duration-200 hover:text-cyan"
          >
            Disable draft mode
          </a>
        </div>
      </Container>
    </div>
  )
}
