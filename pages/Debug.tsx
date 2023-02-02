import Header from 'components/Header'
import dynamic from 'next/dynamic'
import React from 'react'

const Clock = dynamic(() => import('components/Clock'), { ssr: false })
type Props = {}

export default function debug({}: Props) {
  return (
    <div>
      {/* <Header /> */}
      <Clock />
    </div>
  )
}
