import { useEffect, useState } from 'react'

export default function IntroTemplate() {
  const [studioURL, setStudioURL] = useState(null)
  const [createPostURL, setCreatePostURL] = useState(null)
  const repoURL = `https://${process.env.NEXT_PUBLIC_VERCEL_GIT_PROVIDER}.com/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER}/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG}`

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setStudioURL(`${window.location.href}studio`)
      setCreatePostURL(
        `${window.location.href}/studio/intent/create/template=post;type=post/`
      )
    }
  }, [])

  const goToURL = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <div className="mb-10 border border-slate-300 px-3 pb-3 md:mb-20 md:grid md:grid-cols-2 md:space-x-14 md:px-14 md:pb-0 md:pb-14 md:pt-11">
      <div>
        <iframe
          className="mt-4 aspect-video w-full rounded shadow-2xl"
          src="https://www.youtube.com/embed/Tsf4QcSUqI4"
          allowFullScreen
        />

        <div className="mt-10 hidden text-xs text-gray-700 md:block">
          <RemoveBlock />
        </div>
      </div>

      <div>
        <h2 className="mb-8 mt-5 text-xl font-bold tracking-wide md:text-5xl">
          Next steps
        </h2>

        <Box
          circleTitle="1"
          element={
            <div>
              <div className="col-span-2 mb-2 mt-1 font-bold">
                Create content in Sanity Studio
              </div>
              <div className="text-xs text-gray-700">
                Your Sanity Studio is deployed under
                <LinkAttribute href={studioURL} text={studioURL} />
              </div>
              <div className="mt-3">
                <button
                  className="rounded bg-blue-500 py-2 px-4 text-white"
                  onClick={() => goToURL(createPostURL)}
                  role="link"
                >
                  Create Content
                </button>
              </div>
            </div>
          }
        />

        <Box
          circleTitle="2"
          element={
            <div>
              <div className="col-span-2 mt-1 mb-2 font-bold">
                Modify and deploy the project
              </div>
              <div className="text-xs text-gray-700">
                Your code can be found under
                <LinkAttribute href={repoURL} text={repoURL} />
              </div>

              <div className="mt-3">
                <button
                  className="rounded bg-blue-500 py-2 px-4 text-white"
                  onClick={() => goToURL(repoURL)}
                  role="link"
                >
                  Get the repo
                </button>
              </div>
            </div>
          }
        />

        <Box
          circleTitle="3"
          element={
            <div>
              <div className="col-span-2 mb-3 mt-1 font-bold">
                Learn more & get help
              </div>
              <div className="mb-3">
                <LinkAttribute
                  href="https://www.sanity.io/docs"
                  text="Learn more about Sanity"
                  blue
                />
                in our documentation.
              </div>
              <LinkAttribute
                href="https://slack.sanity.io/"
                text="Join the Sanity Slack Community"
                blue
              />
              to ask questions and get help.
            </div>
          }
        />
        <div className="text-center text-xs text-gray-700	 md:invisible">
          <RemoveBlock />
        </div>
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
    <div className="mt-2 grid grid-flow-col grid-rows-1 place-content-start gap-3">
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

const RemoveBlock = () => (
  <LinkAttribute
    href={`https://${process.env.NEXT_PUBLIC_VERCEL_GIT_PROVIDER}.com/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER}/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG}/blob/main/README.md#how-can-i-remove-the-next-steps-block-from-my-blog`}
    text="How to remove this block?"
  />
)
