import { motion } from 'framer-motion'
import React, { useState } from 'react'

type Props = { controls: any; direction: string; emoji: string }

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
  big: { scale: 2 },
  faceRight: { rotateY: 180, transition: { duration: 0.1 } },
  faceLeft: { rotateY: 0, transition: { duration: 0.1 } },
  jump: {
    y: -15,
    transition: {
      repeat: 1,
      repeatType: 'reverse',
      duration: 0.1,
      type: 'spring',
      bounce: 0.1,
    },
  },
}

export default function BlackMage({ controls, direction, emoji }: Props) {
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
      {emoji}
    </motion.a>
  )
}
