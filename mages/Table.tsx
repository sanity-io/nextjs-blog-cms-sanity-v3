import { useAnimationControls } from 'framer-motion'

import BlackMage from './BlackMage'
type Props = {}

function Table({}: Props) {
  const controls = useAnimationControls()
  return (
    <div className="h-screen bg-gray-800 ">
      <BlackMage controls={undefined} />
      <BlackMage controls={undefined} />
    </div>
  )
}

export default Table
