import { AnimationControls, motion, useAnimationControls } from 'framer-motion'
import Mage from 'mages/Mage'
import Link from 'next/link'
import { useState } from 'react'

type Props = {}

function MageTable({}: Props) {
  const [direction, setDirection] = useState('left')
  const [bMageDirection, setBmageDirection] = useState('left')
  const [wMageDirection, setWmageDirection] = useState('left')
  const [showMenu, setShowMenu] = useState('hidden')
  const [toggle, setToggle] = useState(false)

  const bMageControls = useAnimationControls()
  const wMageControls = useAnimationControls()
  const ballControls = useAnimationControls()

  const jump = (controls) => {
    setData("I'm jumping.")
    controls.start('jump')
  }
  const faceLeft = (controls) => {
    setData('Facing Left.')
    controls.start('faceLeft')
  }
  const faceRight = (controls) => {
    setData('Facing right.')
    controls.start('faceRight')
  }

  const switchDirection = (color, direction) => {
    const newDirection = direction.toLowerCase() == 'left' ? 'Right' : 'Left'
    console.log(`Switching ${color} mage direction to ${newDirection}.`)
    if (color == 'black') {
      bMageControls.start(`face${newDirection}`)
      setBmageDirection(newDirection)
    }

    if (color == 'white') {
      wMageControls.start(`face${newDirection}`)
      setWmageDirection(newDirection)
    }
    setData(newDirection)
  }

  const conjure = (bMageControls, wMageControls) => {
    faceLeft(bMageControls)
    faceLeft(wMageControls)
    setBmageDirection('left')
    setWmageDirection('left')
    jump(bMageControls)
    jump(wMageControls)
    setData('Conjuring a Spell.')
    bMageControls.start('big').then(() => {
      bMageControls.start('faceRight')
    })
    wMageControls.start('big').then(() => {
      wMageControls.start('faceRight')
    })
    ballControls.start('big')
    setShowMenu('')
  }

  const [data, setData] = useState('')

  function resetMages() {
    bMageControls.start('normal')
    wMageControls.start('normal')
    ballControls.start('normal')
    setBmageDirection('left')
    setWmageDirection('left')
    setShowMenu('hidden')
  }

  const ballVariants = {
    big: { scale: 2, y: 5 },
    normal: { scale: 1, y: 0 },
  }

  return (
    <>
      <div className="flex h-screen flex-shrink-0 flex-col items-center justify-center gap-y-20 border bg-gradient-to-b from-blue-400 via-black/40 to-pink-300 text-center">
        {/* the table */}
        <div className="m-6 grid grid-cols-5 rounded-full  bg-white/20 p-8">
          <div className="col-span-2 col-start-1 row-start-2 flex flex-col  p-2">
            <Mage
              emoji="🧙🏾‍♂️"
              controls={bMageControls}
              direction={bMageDirection}
            />
          </div>
          <div className="hidden">
            <Mage
              emoji="🧙🏾‍♂️"
              controls={bMageControls}
              direction={bMageDirection}
            />
          </div>
          <motion.div
            className="row-start-2 border p-2"
            variants={ballVariants}
            animate={ballControls}
            onClick={() => {
              toggle
                ? () => {
                    conjure(bMageControls, wMageControls)
                    // setToggle(!toggle)

                    alert(toggle)
                  }
                : () => {
                    conjure(bMageControls, wMageControls)
                    alert(1)
                    // resetMages()
                    // setToggle(!toggle)
                  }
            }}
          >
            <Mage emoji="🔮" controls={ballControls} direction={'left'} />
          </motion.div>
          <div className="col-span-2 col-start-4 row-start-2 flex  flex-col content-end  p-2">
            <Mage
              emoji="🧙🏾‍♀️"
              controls={wMageControls}
              direction={wMageDirection}
            />
          </div>

          <motion.div
            whileInView={{ scale: 2, transition: { duration: 0.5 } }}
            className={`${showMenu} col-span-4 col-start-1 row-start-3 space-x-1 py-4`}
          >
            <Link href="/">🔙</Link>
            <Link href="/">✨</Link>
            <Link href="/">🚀</Link>
            <Link href="/">🎲</Link>
            <style jsx>{`
              Link {
                font-size: 30px;
                display: inline-grid;
              }
            `}</style>
          </motion.div>
        </div>
        {/* buttons */}
        <div className="grid grid-cols-3 gap-2">
          <div
            className=" rounded-full border border-white/20 p-4 shadow-lg"
            onClick={() => {
              jump(bMageControls)
              //   faceLeft(bMageControls)
              // faceRight(bMageControls)
            }}
          >
            Jump
          </div>

          <div
            className=" rounded-full border border-white/20 p-4 shadow-lg"
            onClick={() => {
              conjure(bMageControls, wMageControls)
            }}
          >
            Conjure
          </div>
          <div
            className=" rounded-full border border-white/20 p-4 shadow-lg"
            onClick={() => {
              jump(wMageControls)
            }}
          >
            Jump
          </div>

          {/* switch bM direction */}
          <div
            className="rounded-full border border-white/20 p-4 shadow-lg"
            onClick={() => {
              console.log('Current direction:', bMageDirection)
              switchDirection('black', bMageDirection)
            }}
          >
            Switch Direction
          </div>
          {/* jump switch wM */}
          <div
            className=" rounded-full border border-white/20 p-4 shadow-lg"
            onClick={() => {
              resetMages()
              console.log('reset')
            }}
          >
            Reset
          </div>
          <div
            className=" rounded-full border border-white/20 p-4 shadow-lg"
            onClick={() => {
              switchDirection('white', wMageDirection)
            }}
          >
            Switch Direction
          </div>
        </div>
        <div>{data}</div>
      </div>
    </>
  )
}

export default MageTable
