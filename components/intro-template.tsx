import Image from 'next/future/image'
import { useEffect, useState } from 'react'

import introTemplateImg from '../images/introTemplateImg.png'

export default function IntroTemplate() {
  const [studioURL, setStudioURL] = useState(null)
  const [createPostURL, setCreatePostURL] = useState(null)
  const hasEnvVars =
    process.env.NEXT_PUBLIC_VERCEL_GIT_PROVIDER &&
    process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER &&
    process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG
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
    <div className="mb-10 border border-slate-300 px-14 pb-3 md:mb-20 md:grid md:grid-cols-2 md:px-0 md:pb-14 md:pt-11">
      <div className="self-center">
        <Image alt={'Cover Image IntroTemplate'} src={introTemplateImg} />
        <div className="mt-10 hidden px-14 text-xs text-gray-700 md:block">
          <RemoveBlock />
        </div>
      </div>

      <div className="md:mr-24">
        {hasEnvVars && (
          <div
            className="mb-4 rounded-lg bg-yellow-100 p-4 text-sm text-yellow-700 dark:bg-yellow-200 dark:text-yellow-800"
            role="alert"
          >
            {`It looks like you haven't set up the local environment variables.`}
            <LinkAttribute
              href={
                'https://github.com/sanity-io/nextjs-blog-cms-sanity-v3#step-2-set-up-the-project-locally'
              }
              text={`Here's how to set them up locally`}
            />
          </div>
        )}
        <h2 className="mt-5 mb-8 text-xl font-bold tracking-wide md:text-5xl">
          Next steps
        </h2>
        <ol>
          <Box
            circleTitle="1"
            element={
              <div>
                <div className="col-span-2 mt-1 mb-2 font-bold">
                  Create content with Sanity Studio
                </div>
                <div className="text-xs text-gray-700">
                  Your Sanity Studio is deployed at
                  <LinkAttribute href={studioURL} text={studioURL} />
                </div>
                <div className="mt-3">
                  <a
                    className="inline-flex rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-800"
                    href={createPostURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Studio to edit content
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

                {hasEnvVars ? (
                  <>
                    <div className="text-xs text-gray-700">
                      Your code can be found at
                      <LinkAttribute href={repoURL} text={repoURL} />
                    </div>

                    <div className="mt-3">
                      <a
                        className="inline-flex rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-800"
                        href={repoURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Go to your repo on GitHub
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="text-xs text-gray-700">
                    In order to continue with this step, you need to
                    <LinkAttribute
                      href={
                        'https://github.com/sanity-io/nextjs-blog-cms-sanity-v3#step-2-set-up-the-project-locally'
                      }
                      text={`set up the project locally`}
                    />
                  </div>
                )}
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
              </div>
            }
          />
        </ol>
        <div className="text-center text-xs text-gray-700 md:invisible">
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
    <li className="mt-2 grid grid-flow-col grid-rows-1 place-content-start gap-3">
      <div className="row-span-3 select-none">
        <div className="relative flex h-6 w-6 select-none items-center justify-center rounded-full bg-gray-200 p-4 text-center">
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
