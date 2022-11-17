export default function BlogHeader({ title }) {
  return (
    <section className="mt-16 mb-10 flex flex-col items-center md:mb-12 md:flex-row md:justify-between">
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
          href="https://www.sanity.io/?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter"
          className="underline transition-colors duration-200 hover:text-success"
        >
          Sanity
        </a>
        .
      </h4>
    </section>
  )
}
