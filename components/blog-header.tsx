import { CMS_NAME, CMS_URL } from '../lib/constants'

export default function BlogHeader({ title }) {
  return (
    <section className="mt-16 mb-10 flex flex-col items-center md:mb-16 md:mb-12 md:flex-row md:justify-between">
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
          href={CMS_URL}
          className="underline transition-colors duration-200 hover:text-success"
        >
          {CMS_NAME}
        </a>
        .
      </h4>
    </section>
  )
}
