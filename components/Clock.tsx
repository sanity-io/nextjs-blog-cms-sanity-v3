// @ts-nocheck
import useCountdown from '@bradgarropy/use-countdown'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import Mage from '../components/Mage'

function Clock() {
  const [time, setTime] = useState(new Date())
  const [clockInTime, setClockInTime] = useState(null)
  const [totalHours, setTotalHours] = useState(0)
  const [totalMinutes, setTotalMinutes] = useState(0)

  function clockIn() {
    setClockInTime(time)
  }

  function clockOut() {
    const clockOutTime = time
    const difference = clockOutTime - clockInTime
    const differenceInMinutes = difference / 1000 / 60
    setTotalMinutes(totalMinutes + differenceInMinutes)
    setClockInTime(null)
  }

  //remaining hours and do something when they run out
  const timer = useCountdown({
    seconds: 10,
    onCompleted: () => {
      // alert("Timer Complete")
    },
  })

  useEffect(() => {
    // update clock
    setInterval(() => {
      setTime(new Date())
    }, 1000)
  }, [])

  const sleepVariants = {
    sway: {
      x: -60,
      transition: {
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 1,
        // type: 'spring',
        bounce: 0.1,
        staggerChildren: 0.5,
        delayChildren: 0.5,
      },
    },
    right: { x: 60 },
    center: { x: 0 },
  }

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  }

  return (
    <>
      <div className="absolute flex w-full justify-center bg-white/10 p-8 text-center text-xl shadow-lg">
        {format(time, 'eee hh:mm a')}
      </div>
      <motion.div
        animate={{
          y: -35,
          scale: 5,
          transition: { duration: 1.3, type: 'spring', bounce: 0.7 },
        }}
        className="align-center absolute top-32 right-[4%]"
      ></motion.div>
      <div className="flex h-screen flex-col items-center justify-center gap-2 gap-y-8 bg-blue-800 p-8 text-center">
        <motion.h1 className="mx-auto flex min-w-[330px] max-w-4xl justify-center rounded-md bg-white/10 p-20 text-5xl uppercase tracking-widest text-white shadow-2xl">
          <div bg-white p-2>
            ⏰
          </div>
          <motion.div>
            <motion.p
              variants={sleepVariants}
              initial={'right'}
              animate={'sway'}
              className=""
            >
              💤
            </motion.p>
          </motion.div>
          <div>😪</div>
        </motion.h1>
        <div className="mx-auto items-center gap-4 rounded-md bg-white/10 p-12 shadow-xl md:flex ">
          <div>{format(time, 'eee hh:mm:ss a')}</div>
          {clockInTime ? (
            <div>
              <motion.button
                className="shadow-xl"
                whileHover={{ scale: 1.2 }}
                onClick={clockOut}
              >
                Clock Out
              </motion.button>
              <div className="py-2">
                Clocked In: {clockInTime.toLocaleString()}
              </div>
            </div>
          ) : (
            <motion.div
              animate={{ scale: 1, padding: 20 }}
              transition={{ duration: 1 }}
            >
              <motion.button
                animate={{
                  padding: 18,
                }}
                onClick={clockIn}
              >
                Clock In ⏰
              </motion.button>
            </motion.div>
          )}
          <div>Total Hours: {Math.floor(totalMinutes / 60)}</div>
          <div>Total Minutes: {Math.trunc(totalMinutes % 60)}</div>
        </div>
        <motion.div
          className="mt-12 rounded-full bg-white/20 p-2 shadow-lg"
          animate={{ scale: 2.4 }}
        >
          <Link href="/">🔙</Link>
        </motion.div>
      </div>
    </>
  )
}

export default Clock
