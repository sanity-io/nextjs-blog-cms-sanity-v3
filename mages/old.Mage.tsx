// @ts-nocheck
import { motion, useAnimationControls } from 'framer-motion'
import Link from 'next/link'
import React, { useState } from 'react'
import { useCallback, useEffect } from 'react'

type Props = { controls: any }

export default function Mage({ controls }: Props) {
  const [icon, setIcon] = useState('')
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
  const [counter, setCounter] = useState(0)

  const toggleMenu = () => {
    if (menuIcon) {
      setMenuIcon('')
      setShowIcons('hidden')
      controls.start('turnLeft')
      setCounter(counter + 1)
      if (counter == 2) {
        setCounter(0)
      }
    } else {
      setMenuIcon('hidden')
      setShowIcons('')
      controls.start('turnRight')
    }
  }

  return (
    <motion.div
      animate={{
        rotateX: 0,
        rotateZ: 0,
        rotateY: 360,
        x: 0,
        z: 0,
        opacity: 1,
        padding: 12,
      }}
      // className="mx-auto grid min-w-[75px] grid-cols-2 items-center justify-center rounded-full border text-center shadow-xl"
      className="flex gap-2 md:gap-20"
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
      {/* Orb */}
      <motion.a
        // animate={{ rotateY: 180, opacity: 1 }}
        // initial={{ rotateY: 180 }}
        // animate={{ hidden }}
        // variants={mageVariants}
        // className={`${menuIcon}`}
        onClick={() => {
          toggleMenu()
          controls.start('jump').then(() => {
            // controls.start()
          })
          // setShowIcons()
        }}
      >
        🔮
      </motion.a>

      {/* Hydration error... */}
      <motion.a
        animate={{}}
        variants={mageVariants}
        href="/studio"
        className={`${showIcons}`}
        onClick={() => {
          controls.start('jump')
        }}
      >
        {/* {menuIcon == 'game' ? '🚀' : 'edit' ? '📝' : '😅'} */}
        {counter == 0 ? (
          <Link href="/Game">🚀</Link>
        ) : counter == 1 ? (
          <Link href="/Studio">📝</Link>
        ) : counter == 2 ? (
          <Link href="https://super-bubblegum-fd734f.netlify.app/">😎</Link>
        ) : (
          'error'
        )}
      </motion.a>
    </motion.div>
  )
}
