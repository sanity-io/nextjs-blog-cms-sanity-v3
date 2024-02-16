import { CursorArrowRaysIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { urlForImage } from 'lib/sanity.image'
import { About } from 'lib/sanity.queries'
import Image from 'next/image'
import { useState } from 'react'

export const AboutMe = (about: About) => {
  const [expanded, setExpanded] = useState(true)
  const {
    title,
    hobbies,
    skills,
    intro,
    status,
    yearsOfExperience,
    teams,
    profilePicture,
  } = about

  if (!expanded) {
    return (
      <>
        <div
          className="max-md:hidden font-bold bg-linkedin-light h-10 w-full hover:cursor-pointer flex items-center justify-center text-sm"
          onClick={() => setExpanded(true)}
        >
          Click here to learn more about me
          <CursorArrowRaysIcon
            className="h-8 w-8 text-gray-600 group-hover:text-indigo-600"
            stroke="black"
            aria-hidden="true"
          />
        </div>
        <div
          className="md:hidden font-bold bg-linkedin-light text-whit h-10 w-full hover:cursor-pointer flex items-center justify-center text-sm"
          onClick={() => setExpanded(true)}
        >
          Tap here to learn more about me
          <CursorArrowRaysIcon
            className="h-8 w-8 text-gray-600 group-hover:text-indigo-600"
            stroke="black"
            aria-hidden="true"
          />
        </div>
      </>
    )
  }
  return (
    <div className="flex-col md:flex-row flex md:justify-center border-y-2 border-gray-50 w-full p-4 gap-6 relative">
      {/* Image and Info */}
      <div>
        <div className="gap-5 items-center flex">
          <div className="relative h-24 w-24 overflow-hidden">
            <Image
              src={
                profilePicture?.asset?._ref
                  ? urlForImage(profilePicture)
                      .height(800)
                      .width(800)
                      .fit('crop')
                      .url()
                  : 'https://source.unsplash.com/96x96/?face'
              }
              width={96}
              height={96}
              alt={profilePicture?.alt ?? title}
            />
          </div>

          <div className="flex-col text-xs">
            <div className="flex gap-1 space-between gap-4 w-full">
              <div className="text-gray-500">TITLE</div>
              <div>{title}</div>
            </div>
            <div className="flex gap-1 space-between gap-4 w-full">
              <div className="text-gray-500">EXPERIENCE</div>
              <div>{yearsOfExperience}</div>
            </div>
            <div className="flex gap-1 space-between gap-4 w-full">
              <div className="text-gray-500">COLLEGE</div>
              <div>Oklahoma State</div>
            </div>
            <div className="flex gap-1 space-between gap-4 w-full">
              <div className="text-gray-500">HOBBIES</div>
              <div>
                {hobbies?.map((h, i) => {
                  return `${h}${i !== hobbies.length - 1 ? ', ' : ''}`
                })}
              </div>
            </div>
            <div className="flex gap-1 space-between gap-4 w-full">
              <div className="text-gray-500">TEAMS</div>
              <div>
                {teams?.map((t, i) => {
                  return `${t}${i !== teams.length - 1 ? ', ' : ''}`
                })}
              </div>
            </div>
            <div className="flex gap-1 space-between gap-4 w-full">
              <div className="text-gray-500">STATUS</div>
              <div className="flex items-center gap-1 relative">
                <div className="absolute inline-flex h-1 w-1 rounded-full bg-chi-red animate-ping"></div>
                <div className="h-1 w-1 rounded-full bg-chi-red"> </div>
                {status}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Summary Section */}
      <div className="flex-col max-w-md">
        <div className="text-gray-500 text-xs flex items-center gap-1">
          INTRO
        </div>
        <div className="text-sm">{intro}</div>
      </div>
      <div className="flex-col max-w-md">
        <div className="text-gray-500 text-xs flex items-center gap-1">
          SKILLS
        </div>
        <div className="text-sm">
          {skills?.map((s, i) => {
            return `${s}${i !== skills.length - 1 ? ', ' : ''}`
          })}
        </div>
      </div>
      {/* Others */}
      <div
        onClick={() => setExpanded(false)}
        className="w-8 h-8 rounded-full bg-gray-100 absolute right-4 md:right-8 top-2 flex items-center justify-center hover:cursor-pointer"
      >
        <XMarkIcon className="w-6 h-6" strokeWidth={1} />
      </div>
    </div>
  )
}
