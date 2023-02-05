import { motion } from 'framer-motion'
import React from 'react'

type Props = { controls: any; direction: string }

const variants = {
  normal: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    x: 0,
    y: 0,
    z: 0,
  },
  faceLeft: { rotateY: 180 },
  faceRight: { rotateY: 0 },
  jump: {
    y: -15,
    transition: {
      repeat: 3,
      repeatType: 'reverse',
      duration: 0.1,
      type: 'spring',
      bounce: 0.1,
    },
  },
}

export default function WhiteMage({ controls, direction }: Props) {
  return (
    <motion.a
      animate={controls}
      //   @ts-ignore
      variants={variants}
      className=""
      onClick={() => {
        // toggleMenu()
        console.log("I'm facing", direction)
      }}
    >
      🧙🏾‍♀️
    </motion.a>
  )
}
