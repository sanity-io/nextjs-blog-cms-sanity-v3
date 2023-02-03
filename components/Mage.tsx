// @ts-nocheck
import { motion, useAnimationControls } from 'framer-motion'
import React, { useState } from 'react'
import { useCallback, useEffect } from 'react'

type Props = { controls: any }

export default function Mage({ controls }: Props) {
  const [mousePosition, setMousePosition] = useState(null)

  useEffect(() => {
    window.addEventListener('mousemove', (event) => {
      setMousePosition(event.clientX)
      // console.log('mouse', mousePosition)
      // console.log('window', window.innerWidth / 2)
      mousePosition > window.innerWidth / 2
        ? controls.start('turnLeft')
        : controls.start('turnRight')
    })
    return () => {
      window.removeEventListener('mousemove', setMousePosition)
    }
  }, [mousePosition, controls])

  const mageVariants = {
    show: { opacity: 1, scale: 1 },
    hide: { opacity: 0, transition: { duration: 2 } },
    turnLeft: { rotateY: 180 },
    turnRight: { rotateY: 0 },
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

  const orbVariants = {
    normal: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0 },
    big: { opacity: 1, scale: 1.2 },
  }

  return (
    <motion.div
      animate={{
        rotateX: 0,
        rotateZ: 0,
        rotateY: 360,
        x: 0,
        z: -10,
        opacity: 1,
        padding: 12,
      }}
      onClick={() => turn()}
      className="mx-auto flex items-center justify-center rounded-full border shadow-xl md:hidden"
    >
      <motion.a
        // animate={{ rotateY: 180, opacity: 1 }}
        animate={controls}
        variants={mageVariants}
        // href="/studio"
        className=""
        onClick={() => {}}
      >
        🧙🏾‍♂️
      </motion.a>
    </motion.div>
  )
}
