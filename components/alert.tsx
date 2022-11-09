import Link from 'next/link'

import Container from './container'

export default function Alert() {
  return (
    <div className="border-b border-accent-7 bg-accent-7 text-white">
      <Container>
        <div className="py-2 text-center text-sm">
          This page is a preview.{' '}
          <Link
            href="/api/exit-preview"
            className="underline transition-colors duration-200 hover:text-cyan"
          >
            Click here
          </Link>{' '}
          to exit preview mode.
        </div>
      </Container>
    </div>
  )
}
