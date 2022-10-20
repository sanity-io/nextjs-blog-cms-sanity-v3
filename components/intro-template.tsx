import Link from 'next/link'

export default function IntroTemplate() {
  return (
    <div className="border border-slate-300 px-14 pb-14 pt-11 md:mb-28 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-16	">
      <div>
        <iframe
          className="mt-4 aspect-video w-full rounded-sm shadow-2xl"
          src="https://www.youtube.com/embed/32RP-sG1njE"
          allowFullScreen
        />

        <div className="invisible mt-4 text-gray-700 md:visible">
          <LinkAttribute
            href={`https://${process.env.NEXT_PUBLIC_VERCEL_GIT_PROVIDER}.com/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER}/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG}/blob/main/README.md`}
            text="How to remove this block?"
          />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-5xl font-bold tracking-wide">Next steps</h2>

        <Box
          circleTitle="1"
          element={
            <div>
              <div className="col-span-2 mb-2 font-bold">
                Create and edit content
              </div>
              <div>
                Go to
                <LinkAttribute href="/studio" text="Sanity Studio" blue />
              </div>
              <div className="text-xs text-gray-700">
                We embedded it in this project under
                <LinkAttribute
                  href="https://cms-sanity-2-eight.vercel.app/studio"
                  text="https://cms-sanity-2-eight.vercel.app/studio"
                />
              </div>
              <div className="mt-2">
                Check out instant previews:
                <Link href="/studio/intent/create/template=post;type=post/">
                  <a
                    className="mx-1 text-blue-500 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Create a document
                  </a>
                </Link>
              </div>
            </div>
          }
        />

        <Box
          circleTitle="2"
          element={
            <div>
              <div className="col-span-2 mb-2 font-bold">
                Modify and deploy the project
              </div>
              <div className="mb-2">
                Clone the
                <LinkAttribute
                  href={`https://${process.env.NEXT_PUBLIC_VERCEL_GIT_PROVIDER}.com/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER}/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG}`}
                  text="repo"
                  blue
                />
                for this project
              </div>
              <div className="mb-2">
                Learn how to configure your project locally, make changes and
                deploy them:
                <LinkAttribute
                  href={`https://${process.env.NEXT_PUBLIC_VERCEL_GIT_PROVIDER}.com/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER}/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG}/blob/main/README.md`}
                  text="Read the README"
                  blue
                />
              </div>
              <div className="mb-2">
                Check out
                <LinkAttribute
                  href="https://www.sanity.io/docs"
                  text="Sanity Docs"
                  blue
                />
              </div>
              <div className="mt-2">
                Join
                <LinkAttribute
                  href="https://slack.sanity.io/"
                  text="Sanity Slack Community"
                  blue
                />
                to get help and ask questions
              </div>
            </div>
          }
        />
      </div>
    </div>
  )
}

function Box({
  circleTitle,
  element,
}: {
  circleTitle: string
  element: JSX.Element
}) {
  return (
    <div className="grid grid-flow-col grid-rows-1 place-content-start gap-3">
      <div className="row-span-3 select-none">
        <div className="relative flex	h-6 w-6 select-none items-center justify-center rounded-full bg-gray-200 p-4 text-center">
          {circleTitle}
        </div>
      </div>
      {element}
    </div>
  )
}

function LinkAttribute({
  href,
  text,
  blue,
}: {
  href: string
  text: string
  blue?: boolean
}) {
  return (
    <a
      href={href}
      className={`mx-1 ${blue && 'text-blue-500'} hover:underline`}
      target="_blank"
      rel="noreferrer"
    >
      {text}
    </a>
  )
}
