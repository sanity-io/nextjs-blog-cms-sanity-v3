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
  const removeBlockURL = hasEnvVars
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_GIT_PROVIDER}.com/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER}/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG}/blob/main/README.md#how-can-i-remove-the-next-steps-block-from-my-blog`
    : `https://github.com/sanity-io/nextjs-blog-cms-sanity-v3#how-can-i-remove-the-next-steps-block-from-my-blog`

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setStudioURL(`${window.location.href}studio`)
      setCreatePostURL(
        `${window.location.href}/studio/intent/create/template=post;type=post/`
      )
    }
  }, [])

  return (
    <div className="pb-3 mb-10 border border-slate-300 px-14 md:mb-20 md:grid md:grid-cols-2 md:px-0 md:pb-14 md:pt-11">
      <div className="self-center">
        <Image alt={'Cover Image IntroTemplate'} src={introTemplateImg} />
        <div className="hidden mt-10 text-xs text-gray-700 px-14 md:block">
          <RemoveBlock url={removeBlockURL} />
        </div>
      </div>

      <div className="md:mr-24">
        <h2 className="mt-5 mb-8 text-xl font-bold tracking-wide md:text-5xl">
          Next steps
        </h2>

        {!hasEnvVars && (
          <div
            className="p-4 mb-6 text-sm text-yellow-700 bg-yellow-100 rounded-lg"
            role="alert"
          >
            {`It looks like you haven't set up the local environment variables.`}
            <p>
              <LinkAttribute
                margin={false}
                href={
                  'https://github.com/sanity-io/nextjs-blog-cms-sanity-v3#step-2-set-up-the-project-locally'
                }
                text={`Here's how to set them up locally`}
              />
            </p>
          </div>
        )}
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
                    className="inline-flex px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-800"
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
                        className="inline-flex px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-800"
                        href={repoURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Go to your repo on {getGitProvider()}
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
        <div className="text-xs text-center text-gray-700 md:invisible">
          <RemoveBlock url={removeBlockURL} />
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
  margin = true,
}: {
  href: string
  text: string
  blue?: boolean
  margin?: boolean
}) {
  return (
    <a
      href={href}
      className={`${margin && 'mx-1'} underline ${
        blue && 'text-blue-500'
      } hover:text-blue-800`}
      target="_blank"
      rel="noreferrer"
    >
      {text}
    </a>
  )
}

const RemoveBlock = ({ url }) => (
  <LinkAttribute margin={false} href={url} text="How to remove this block?" />
)

function getGitProvider() {
  switch (process.env.NEXT_PUBLIC_VERCEL_GIT_PROVIDER) {
    case 'gitlab':
      return 'GitLab'
    case 'bitbucket':
      return 'Bitbucket'
    default:
      return 'GitHub'
  }
}