import Header from 'components/Header'
import dynamic from 'next/dynamic'
import React from 'react'

const Clock = dynamic(() => import('components/Clock'), { ssr: false })
type Props = {}

export default function debug({}: Props) {
  return (
    <div className="h-screen max-h-screen w-full max-w-[100vh] ">
      {/* <Header /> */}
      <Clock />
      <Clock />
    </div>
  )
}
