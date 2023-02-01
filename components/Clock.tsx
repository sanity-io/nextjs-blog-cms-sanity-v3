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
    <div className="flex h-screen flex-col justify-center gap-2 gap-y-8 bg-blue-800 p-8 text-center">
      <h1>JB Hours</h1>
      <div>{format(time, 'eee hh:mm:ss a')}</div>
      {clockInTime ? (
        <div>
          <button onClick={clockOut}>Clock Out</button>
          <div>Clocked In: {clockInTime.toLocaleString()}</div>
        </div>
      ) : (
        <motion.div
          animate={{ scale: 1 }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <button onClick={clockIn}>Clock In ⏰</button>
        </motion.div>
      )}
      <div>Total Hours: {Math.floor(totalMinutes / 60)}</div>
      <div>Total Minutes: {Math.trunc(totalMinutes % 60)}</div>
    </div>
  )
}

export default Clock
