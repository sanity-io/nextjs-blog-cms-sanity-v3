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

  return (
    <div className="px-3 pb-3 mb-10 border border-slate-300 md:mb-20 md:grid md:grid-cols-1 md:space-x-14 md:px-14 md:pb-14 md:pt-11">
      {/* <div>
        <iframe
          className="w-full mt-4 rounded shadow-2xl aspect-video"
          src="https://www.youtube.com/embed/Tsf4QcSUqI4"
          allowFullScreen
        />
      </div> */}

      <div>
        <h2 className="mt-5 mb-8 text-xl font-bold tracking-wide md:text-5xl">
          Next steps
        </h2>
        <ol>
          <Box
            circleTitle="1"
            element={
              <div>
                <div className="col-span-2 mt-1 mb-2 font-bold">
                  Create content in Sanity Studio
                </div>
                <div className="text-xs text-gray-700">
                  You can open your Sanity Studio at
                  <LinkAttribute href={studioURL} text={studioURL} />
                </div>
                <div className="mt-3">
                  <a
                    className="inline-flex px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-800"
                    href={createPostURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Sanity Studio to create content
                  </a>
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
                  <a
                    className="inline-flex px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-800"
                    href={repoURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Go to your repository on GitHub
                  </a>
                </div>
              </div>
            }
          />

          <Box
            circleTitle="3"
            element={
              <div>
                <div className="col-span-2 mt-1 mb-3 font-bold">
                  Learn more and get help
                </div>
                <ul className="mb-3">
                  <li className="mb-3">
                    <LinkAttribute
                      href="https://www.sanity.io/docs"
                      text="Documentation for Sanity"
                      blue
                    />
                  </li>
                  <li className="mb-3">
                    <LinkAttribute
                      href="https://nextjs.org/docs"
                      text="Documentation for Next.js"
                      blue
                    />
                  </li>
                  <li className="mb-3">
                    <LinkAttribute
                      href="https://slack.sanity.io/"
                      text="Join the Sanity Community"
                      blue
                    />
                  </li>
                </ul>
                <div className="hidden mt-10 text-xs text-gray-700 md:block">
                  <RemoveBlock />
                </div>
              </div>
            }
          />
        </ol>
        <div className="text-xs text-center text-gray-700 md:invisible">
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
    <li className="grid grid-flow-col grid-rows-1 gap-3 mt-2 place-content-start">
      <div className="row-span-3 select-none">
        <div className="relative flex items-center justify-center w-6 h-6 p-4 text-center bg-gray-200 rounded-full select-none">
          {circleTitle}
        </div>
      </div>
      {element}
    </li>
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
      className={`mx-1 underline ${
        blue && 'text-blue-500'
      } hover:text-blue-800`}
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
