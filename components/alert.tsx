import cn from 'classnames'
import Link from 'next/link'

import Container from './container'

export default function Alert({ preview }) {
  return (
    <div
      className={cn('border-b', {
        'border-accent-7 bg-accent-7 text-white': preview,
        'border-accent-2 bg-accent-1': !preview,
      })}
    >
      <Container>
        <div className="py-2 text-sm text-center">
          {preview ? (
            <>
              This page is a preview.{' '}
              <Link href="/api/exit-preview">
                <a className="underline transition-colors duration-200 hover:text-cyan">
                  Click here
                </a>
              </Link>{' '}
              to exit preview mode.
            </>
          ) : (
            <>
              The source code for this blog is{' '}
              <a
                href={`https://${process.env.NEXT_PUBLIC_VERCEL_GIT_PROVIDER}.com/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER}/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG}`}
                className="underline transition-colors duration-200 hover:text-success"
              >
                available on GitHub
              </a>
              .
            </>
          )}
        </div>
      </Container>
    </div>
  )
}
