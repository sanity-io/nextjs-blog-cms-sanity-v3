import {
  animationControls,
  easeInOut,
  motion,
  useAnimationControls,
} from 'framer-motion'
import OuijAi from 'ouija/OuijAi'
import { useEffect, useState } from 'react'

type Props = {}

const emojis = {
  smile: '😃',
  angry: '😡',
  crying: '😢',
  cool: '😎',
  heart_eyes: '😍',
  sleepy: '😴',
  thumb_up: '👍',
  thumb_down: '👎',
  broken_heart: '💔',
  red_heart: '❤️',
  fire: '🔥',
  money: '💰',
  party: '🎉',
  gift: '🎁',
  birthday_cake: '🎂',
  star: '⭐️',
  sun_with_face: '🌞',
  cloud: '☁️',
  umbrella: '☔️',
  snowflake: '❄️',
  zap: '⚡️',
  alarm_clock: '⏰',
  watch: '⌚️',
  hourglass_done: '⌛️',
  email: '✉️',
  telephone: '☎️',
  light_bulb: '💡',
  dollar: '💵',
  euro: '💶',
  yen: '💴',
  pound: '💷',
  rocket: '🚀',
  airplane: '✈️',
  train: '🚂',
  car: '🚗',
  bicycle: '🚲',
  bus: '🚌',
  ship: '🚢',
  swimmer: '🏊‍♂️',
  runner: '🏃‍♂️',
  basketball: '🏀',
  football: '⚽️',
  guitar: '🎸',
  microphone: '🎤',
  paintbrush: '🎨',
  dolphin: '🐬',
  panda: '🐼',
  monkey_face: '🐵',
  koala: '🐨',
  dog: '🐶',
  cat: '🐱',
  lion: '🦁',
  tiger: '🐯',
  elephant: '🐘',
  octopus: '🐙',
  squid: '🦑',
  wizard: '🧙🏾‍♂️',
  die: '🎲',
}

function Game({}: Props) {
  const handle = () => {}

  const [emoji, setEmoji] = useState(emojis.wizard)
  const [title, setTitle] = useState('Choose a game to play!')

  const emojiVariants = {
    normal: { opacity: 1, scale: 1 },
    big: {
      scale: 8,
      x: 0,
      transition: { duration: 3 },
      repeat: Infinity,
      repeatType: 'reverse',
    },
    bounceIn: {
      transition: {
        // repeat: Infinity,
        // repeatType: 'easeInOut',
        duration: 2,
        type: 'spring',
        bounce: 0.7,
      },
      scale: 8,
      x: 10,
    },
    hover: {
      rotateZ: 0,
      rotateY: 0,
      rotateX: 0,
      scale: 8,
      transition: { repeat: Infinity, repeatType: 'reverse', duration: 2 },
    },
    rocket: {
      rotateZ: -5,
      transition: {
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 5,
        type: 'spring',
        bounce: 7,
        delay: 0.5,
      },
    },
    die: {
      y: -25,
      rotateZ: 720,
      opacity: 1,
      transition: {
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 7,
        type: 'spring',
        bounce: 0.5,
        delay: 0.5,
      },
    },
  }

  const controls = useAnimationControls()
  useEffect(() => {
    // controls.start('hover')
  }, [])

  const animate = (variant: string) => {
    controls.start(variant)
  }

  return (
    <div className="flex h-screen flex-col place-content-between items-center bg-purple-800/50 ">
      <div className="flex h-screen w-full flex-col place-content-between items-center gap-16 bg-gradient-to-br from-blue-800 py-20">
        <div className="w-[550px]">
          <OuijAi />
        </div>
        <motion.h1
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 0.5 }}
          className="hidden text-center text-2xl uppercase tracking-widest text-white"
        >
          {title}
        </motion.h1>
        <div className="flex  justify-items-center">
          <motion.div
            //   @ts-ignore
            variants={emojiVariants}
            initial={{ scale: 7.5 }}
            animate={controls}
            className=" border-dashed p-2 drop-shadow-xl"
          >
            {emoji}
          </motion.div>
        </div>
        <div className="flex gap-4 rounded-md bg-white/20 p-8">
          <div
            className="rounded-full bg-white p-5 shadow-lg"
            onClick={() => {
              setEmoji(emojis.wizard)
              animate('hover')
            }}
          >
            <motion.div animate={{ scale: 2 }} transition={{ duration: 0.5 }}>
              {emojis.zap}
            </motion.div>
          </div>
          <div
            className="rounded-full bg-white p-5 shadow-lg"
            onClick={() => {
              setEmoji(emojis.gift)
              animate('hover')
            }}
          >
            <motion.div animate={{ scale: 2 }} transition={{ duration: 0.5 }}>
              {emojis.gift}
            </motion.div>
          </div>
          <div
            className="rounded-full bg-white p-5 shadow-lg"
            onClick={() => {
              setEmoji(emojis.die)
              animate('die')
            }}
          >
            <motion.div animate={{ scale: 2 }} transition={{ duration: 0.5 }}>
              {emojis.die}
            </motion.div>
          </div>
          <div
            className="rounded-full bg-white p-5 shadow-lg"
            onClick={() => {
              setEmoji(emojis.rocket)
              animate('rocket')
              //   controls.start('rocket')
            }}
          >
            <motion.div animate={{ scale: 2 }} transition={{ duration: 0.5 }}>
              {emojis.rocket}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Game
