import Link from 'next/link'
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
    <div className="space-x-14 border border-slate-300 px-14 pb-14 pt-11 md:mb-20 md:grid md:grid-cols-2">
      <div>
        <iframe
          className="mt-4 aspect-video w-full rounded-sm shadow-2xl"
          src="https://www.youtube.com/embed/Tsf4QcSUqI4"
          allowFullScreen
        />

        <div className="mt-10 text-xs text-gray-700">
          <LinkAttribute
            href={`https://${process.env.NEXT_PUBLIC_VERCEL_GIT_PROVIDER}.com/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER}/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG}/blob/main/README.md#how-can-i-remove-the-next-steps-block-from-my-blog`}
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
                Create content in Sanity Studio
              </div>
              <div className="text-xs text-gray-700">
                We embedded it in this project under
                <LinkAttribute href={studioURL} text={studioURL} />
              </div>
              <div className="mt-2">
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
              <div className="col-span-2 mb-2 font-bold">
                Modify and deploy the project
              </div>
              <div className="text-xs text-gray-700">
                Your code can be found under
                <LinkAttribute href={repoURL} text={repoURL} />
              </div>

              <div className="mt-2">
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
              <div className="col-span-2 mb-2 font-bold">
                Learn more & get help
              </div>

              <div className="mb-2">
                <LinkAttribute
                  href="https://www.sanity.io/docs"
                  text="Learn more about Sanity"
                  blue
                />
                in our documentation.
              </div>
              <div className="mt-2">
                <LinkAttribute
                  href="https://slack.sanity.io/"
                  text="Join the Sanity Slack Community"
                  blue
                />
                to ask questions and get help.
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
