import Link from 'next/link'

export default function BlogHeader({
  title,
  level,
}: {
  title: string
  level: 1 | 2
}) {
  switch (level) {
    case 1:
      return (
        <header className="mt-16 mb-10 flex flex-col items-center md:mb-12 md:flex-row md:justify-between">
          <h1 className="text-6xl font-bold leading-tight tracking-tighter md:pr-8 md:text-8xl">
            {title}
          </h1>
          <h4 className="mt-5 text-center text-lg md:pl-8 md:text-left">
            A statically generated blog example using{' '}
            <a
              href="https://nextjs.org/"
              className="underline transition-colors duration-200 hover:text-success"
            >
              Next.js
            </a>{' '}
            and{' '}
            <a
              href="https://sanity.io/"
              className="underline transition-colors duration-200 hover:text-success"
            >
              Sanity
            </a>
            .
          </h4>
        </header>
      )

    case 2:
      return (
        <header>
          <h2 className="mt-8 mb-20 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
            <Link href="/" className="hover:underline">
              {title}
            </Link>
          </h2>
        </header>
      )

    default:
      throw new Error(
        `Invalid level: ${
          JSON.stringify(level) || typeof level
        }, only 1 or 2 are allowed`
      )
  }
}
