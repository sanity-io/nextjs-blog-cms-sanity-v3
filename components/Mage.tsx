// @ts-nocheck
import { motion, useAnimationControls } from 'framer-motion'
import React, { useState } from 'react'
import { useCallback, useEffect } from 'react'

type Props = { controls: any }

export default function Mage({ controls }: Props) {
  const [mousePosition, setMousePosition] = useState(null)

  const handleUserKeyPress = useCallback((event) => {
    const { key, keyCode } = event
    // console.log(key)
    // console.log(keyCode)
  }, [])

  // useEffect(() => {
  //   window.addEventListener('mousemove', (event) => {
  //     setMousePosition(event.screenX)
  //   })
  //   // console.log(mousePosition)
  //   if (mousePosition > window.innerWidth / 2) {
  //     turn()
  //   }
  //   if (mousePosition < window.innerWidth / 2) {
  //     turn()
  //   }
  //   return () => {
  //     window.removeEventListener('mousemove', setMousePosition)
  //   }
  // }, [mousePosition, turn])

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

  const [direction, setDirection] = useState(false)
  const [showIcons, setShowIcons] = useState('hidden')
  const [menuIcon, setMenuIcon] = useState('')

  const toggleMenu = () => {
    if (menuIcon) {
      setMenuIcon('')
      setShowIcons('hidden')
      controls.start('turnLeft')
    } else {
      setMenuIcon('hidden')
      setShowIcons('')
      controls.start('turnRight')
    }
  }

  // const turn = () => {
  //   mousePosition < window.innerWidth / 2
  //     ? controls.start('turnRight')
  //     : controls.start('turnLeft')
  //   setDirection(!direction)
  // }

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
      className="mx-auto grid min-w-[75px] grid-cols-2 items-center justify-center rounded-full border text-center shadow-xl"
    >
      <motion.a
        // animate={{ rotateY: 180, opacity: 1 }}
        initial={{ rotateY: 180 }}
        animate={controls}
        variants={mageVariants}
        className=""
        onClick={() => {
          toggleMenu()
        }}
      >
        🧙🏾‍♂️
      </motion.a>
      <motion.a
        // animate={{ rotateY: 180, opacity: 1 }}
        // initial={{ rotateY: 180 }}
        // animate={{ hidden }}
        variants={orbVariants}
        href="/Game"
        className={`${showIcons}`}
        onClick={() => {
          controls.start('jump')
        }}
      >
        🚀
      </motion.a>
      <motion.a
        // animate={{ rotateY: 180, opacity: 1 }}
        // initial={{ rotateY: 180 }}
        // animate={{ hidden }}
        variants={mageVariants}
        className={`${menuIcon}`}
        onClick={() => {
          toggleMenu()
          controls.start('jump')
        }}
      >
        🔮
      </motion.a>
      <motion.a
        // animate={{ rotateY: 180, opacity: 1 }}
        // initial={{ rotateY: 180 }}
        animate={{}}
        variants={mageVariants}
        href="https://buncombe.tech/Chart"
        className={`${showIcons}`}
        onClick={() => {
          controls.start('jump')
        }}
      >
        📈
      </motion.a>
      <motion.a
        // animate={{ rotateY: 180, opacity: 1 }}
        // initial={{ rotateY: 180 }}
        animate={{}}
        variants={mageVariants}
        href="/studio"
        className={`${showIcons}`}
        onClick={() => {
          controls.start('jump')
        }}
      >
        📝
      </motion.a>
    </motion.div>
  )
}
