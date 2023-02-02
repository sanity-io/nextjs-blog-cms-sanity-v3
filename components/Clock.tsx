// @ts-nocheck
import useCountdown from '@bradgarropy/use-countdown'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

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
    // @ts-ignore
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
        className="align-center absolute top-32 right-[50%]"
      >
        <motion.a
          href="/"
          animate={{ rotateY: 180 }}
          transition={{ duration: 1, delay: 2 }}
        >
          🧙🏾‍♂️
        </motion.a>
      </motion.div>
      <div className="flex h-screen flex-col justify-center gap-2 gap-y-8 bg-blue-800 p-8 text-center">
        <motion.h1 className="mx-auto flex w-1/2 min-w-[330px] max-w-4xl rounded-md bg-white/10 p-20 text-center text-5xl uppercase tracking-widest text-white shadow-2xl">
          JB Hours
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
                  transition: { duration: 0.5 },
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
      </div>
    </>
  )
}

export default Clock
