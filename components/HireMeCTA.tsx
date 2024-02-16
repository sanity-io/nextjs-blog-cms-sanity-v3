import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

const TESTIMONIALS = [
  {
    summary: "He quickly became one of our top fullstack engineers, by constantly proving his excellent vision as an engineer and his kindness. I trust Sammy to take on any engineering project, he will find efficient solutions and ensure excellent communication with other teams, including design and product.",
    author: "Hugo Pineda (Zumper)",
  },
  {
    summary: "We worked together across a number of teams and projects, and it was a genuine pleasure watching Sammy grow into the outstanding full stack engineer he is today... Sammy is a genuinely talented engineer, and any company would be lucky to have him as an employee.",
    author: "Max Del Guidice (Zumper)",
  },
  {
    summary: "Combined with his technical prowess and intelligence, his enthusiastic commitment to delivering the highest quality applications quickly made him stand out as an exceptional engineer at Zumper.",
    author: "Colleen O'Brien (Zumper)",
  },
  {
    summary: "Sammy and I worked at Zumper together for a couple of years, and I can highly recommend him as an engineer and teammate. He is passionate about his craft, has a strong work ethic, and is dedicated to delivering high-quality results.",
    author: "Ellie Birbeck (Zumper)",
  },
  {
    summary: "...Sammy's technical prowess, collaborative spirit, and genuine passion for coding make them an outstanding full stack engineer... I wholeheartedly recommend Sammy and believe they will be a tremendous asset to any team or project they choose to undertake.",
    author: "Tetsuji Ono (Zumper)"
  },
  {
    summary: "Sammy is a pleasure to work with - he has a very positive attitude and is always looking to learn and get better. He is committed to his work and always doing the right thing.",
    author: "Tom Moylan (Acieta)",
  }
] as const

export const HireMeCTA = () => {
  const [index, setIndex] = useState(0)

  const handleOnClickNext = () => {
    if (index === TESTIMONIALS.length - 1) {
      setIndex(0)
      return
    }
    setIndex(index + 1)
  }

  const handleOnClickBack = () => {
    if (index === 0) {
      setIndex(TESTIMONIALS.length - 1)
      return
    }
    setIndex(index - 1)
  }

  return(
    <div className="px-4 py-2 bg-oklahoma-beige-light flex-1 border-solid border-1 rounded-sm border-gray-500 flex md:flex-row max-md:flex-col gap-4">
        <div className="flex flex-col justify-between flex-1">
          <div className="flex flex-row justify-between items-center max-md:mb-2">
            <div className="font-bold text-lg">How Is Working With Me?</div>
            <div className="flex flex-row gap-2 items-center">
              <div className="text-xs">({index + 1}/{TESTIMONIALS.length})</div>
              <div className="flex justify-center items-center rounded-full h-8 w-8 bg-gray-200 hover:cursor-pointer" onClick={() => handleOnClickBack()}>
                <ChevronLeftIcon strokeWidth={1} className="h-6 w-6" />
              </div>
              <div className="flex justify-center items-center rounded-full h-8 w-8 bg-gray-200 hover:cursor-pointer" onClick={() => handleOnClickNext()}>
                <ChevronRightIcon strokeWidth={1} className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 m-auto">
            <div className="italic">
              "{TESTIMONIALS[index]?.summary}"
            </div>
            <div className="text-gray-800 self-end">
              - {TESTIMONIALS[index]?.author}
            </div>
          </div>
        </div>
        <div className="md:w-36 w-full flex-col gap-2 flex self-center">
          <a href="https://www.linkedin.com/in/sammydowds/" target="_blank" rel="noopener noreferrer" className="text-center h-10 md:w-32 max-md:w-full bg-gray-100 hover:bg-gray-200 text-md text-gray-800 font-bold py-2 px-4 rounded">
            View More 
          </a>
          <a href="mailto:sammycdowds@gmail.com" className="text-center h-10 md:w-32 max-md:w-full bg-blue-500 hover:bg-blue-700 text-white text-md font-bold py-2 px-4 rounded">
            Email Me
          </a>
        </div>
      </div>
  )
}
