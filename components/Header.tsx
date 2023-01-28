import { motion } from 'framer-motion'

import Svg from '../components/Svg'

type Props = {}

export default function Debug({}: Props) {
  return (
    <>
      <div className="flex h-20 place-content-between items-center border border-black bg-black">
        <h1 className="bold text-bold text-2xl uppercase text-white">
          Falling Wedge
        </h1>

        <motion.svg
          initial={{ opacity: 1 }}
          transition={{ duration: 3, delay: 3.5 }}
          animate={{ scale: 1, x: 0, y: 0, opacity: 0.5 }}
          xmlns="http://www.w3.org/2000/svg"
          width="75"
          height="75"
          version="1.1"
          viewBox="0 0 1080 1080"
          xmlSpace="preserve"
        >
          {/* resistance */}
          <g transform="matrix(9.02 11.03 -.12 .09 657.17 434.33)">
            <motion.rect
              initial={{ height: 0 }}
              animate={{ height: 60 }}
              transition={{ duration: 2, delay: 2 }}
              width="74.92"
              height="38.83"
              x="-37.46"
              y="-19.415"
              fill="#656565"
              fillRule="nonzero"
              stroke="#000"
              strokeDasharray="none"
              strokeDashoffset="0"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="4"
              strokeWidth="0"
              opacity="1"
              rx="0"
              ry="0"
              vectorEffect="non-scaling-stroke"
            ></motion.rect>
          </g>
          {/* support */}
          <g transform="matrix(10.08 5.09 .09 -.19 461.88 866.23)">
            <motion.rect
              initial={{ height: 0 }}
              animate={{ height: 60 }}
              transition={{ duration: 2, delay: 2 }}
              width="74.92"
              height="38.83"
              x="-37.46"
              y="-19.415"
              fill="#656565"
              fillRule="nonzero"
              stroke="#000"
              strokeDasharray="none"
              strokeDashoffset="0"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="4"
              strokeWidth="0"
              opacity="1"
              rx="0"
              ry="0"
              vectorEffect="non-scaling-stroke"
            ></motion.rect>
          </g>
          {/* bar 1 */}
          <g transform="matrix(.88 0 0 -8.36 206.45 357.83)">
            <motion.rect
              initial={{ height: 0 }}
              animate={{ height: 80, color: '#00ff00 ' }}
              transition={{
                // delay: 1,
                duration: 1,
                loop: Infinity,
                ease: 'easeInOut',
                wait: 2,
              }}
              width="66.17"
              height="66.17"
              x="-33.085"
              y="-40"
              fill="green"
              fillRule="nonzero"
              stroke="#000"
              strokeDasharray="none"
              strokeDashoffset="0"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="4"
              strokeWidth="0"
              opacity="1"
              rx="0"
              ry="0"
              vectorEffect="non-scaling-stroke"
            ></motion.rect>
          </g>
          {/* bar 2 */}
          <g transform="matrix(.88 0 0 5.14 287.59 584.35)">
            <motion.rect
              initial={{ height: 0 }}
              animate={{ height: 60 }}
              transition={{ delay: 1 }}
              width="66.17"
              height="66.17"
              x="-33.085"
              y="-105"
              fill="red"
              fillRule="nonzero"
              stroke="#000"
              strokeDasharray="none"
              strokeDashoffset="0"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="4"
              strokeWidth="0"
              opacity="1"
              rx="0"
              ry="0"
              vectorEffect="non-scaling-stroke"
            ></motion.rect>
          </g>
          {/* bar 3  */}
          <g transform="matrix(.88 0 0 6.27 370.34 361.44)">
            <motion.rect
              initial={{ height: 0 }}
              animate={{ height: 75 }}
              transition={{ delay: 1.2 }}
              width="66.17"
              height="66.17"
              x="-33.085"
              y="-20"
              fill="red"
              fillRule="nonzero"
              stroke="#000"
              strokeDasharray="none"
              strokeDashoffset="0"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="4"
              strokeWidth="0"
              opacity="1"
              rx="0"
              ry="0"
              vectorEffect="non-scaling-stroke"
            ></motion.rect>
          </g>
          {/* bar 4 */}
          <g transform="matrix(.88 0 0 -6.21 461.18 606.78)">
            <motion.rect
              initial={{ height: 0, fill: 'red' }}
              animate={{ height: 60, fill: 'green' }}
              transition={{ delay: 1.5 }}
              width="66.17"
              height="66.17"
              x="-33.085"
              y="-33.085"
              stroke="#000"
              strokeDasharray="none"
              strokeDashoffset="0"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="4"
              strokeWidth="0"
              opacity="1"
              rx="0"
              ry="0"
              vectorEffect="non-scaling-stroke"
            ></motion.rect>
          </g>

          {/* bar 5  */}
          <g transform="matrix(.88 0 0 4.57 561.33 527.64)">
            <motion.rect
              initial={{ height: 0 }}
              animate={{ height: 60 }}
              transition={{ delay: 1.82 }}
              width="66.17"
              height="66.17"
              x="-33.085"
              y="-33.085"
              fill="red"
              fillRule="nonzero"
              stroke="#000"
              strokeDasharray="none"
              strokeDashoffset="0"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="4"
              strokeWidth="0"
              opacity="1"
              rx="0"
              ry="0"
              vectorEffect="non-scaling-stroke"
            ></motion.rect>
          </g>
          {/* bar 6 */}
          <g transform="matrix(.88 0 0 3.3 645 733.99)">
            <motion.rect
              initial={{ height: 0 }}
              animate={{ height: 60 }}
              transition={{ delay: 2 }}
              width="66.17"
              height="66.17"
              x="-33.085"
              y="-25"
              fill="red"
              fillRule="nonzero"
              stroke="#000"
              strokeDasharray="none"
              strokeDashoffset="0"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="4"
              strokeWidth="0"
              opacity="1"
              rx="0"
              ry="0"
              vectorEffect="non-scaling-stroke"
            ></motion.rect>
          </g>

          {/* bar 7  */}
          <g transform="matrix(.88 0 0 -2.17 722.84 902.39)">
            <motion.rect
              initial={{ height: 0 }}
              animate={{ height: 60 }}
              transition={{ delay: 2.2 }}
              width="66.17"
              height="66.17"
              x="-33.085"
              y="-33.085"
              fill="green"
              fillRule="nonzero"
              stroke="#000"
              strokeDasharray="none"
              strokeDashoffset="0"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="4"
              strokeWidth="0"
              opacity="1"
              rx="0"
              ry="0"
              vectorEffect="non-scaling-stroke"
            ></motion.rect>
          </g>
          {/* bar 8 */}
          <g transform="matrix(.88 0 0 -3.6 805.86 783.36)">
            <motion.rect
              initial={{ height: 0 }}
              animate={{ height: 60 }}
              transition={{ delay: 2.4 }}
              width="66.17"
              height="66.17"
              x="-33.085"
              y="-17"
              fill="green"
              fillRule="nonzero"
              stroke="#000"
              strokeDasharray="none"
              strokeDashoffset="0"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="4"
              strokeWidth="0"
              opacity="1"
              rx="0"
              ry="0"
              vectorEffect="non-scaling-stroke"
            ></motion.rect>
          </g>

          {/* breakout bar 9 */}
          <g transform="matrix(.88 0 0 -9 880.03 413.42)">
            <motion.rect
              initial={{ height: 0 }}
              animate={{ height: 60 }}
              transition={{ delay: 2.8, duration: 2 }}
              width="66.17"
              height="66.17"
              x="-33.085"
              y="-28"
              fill="green"
              fillRule="nonzero"
              stroke="#000"
              strokeDasharray="none"
              strokeDashoffset="0"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="4"
              strokeWidth="0"
              opacity="1"
              rx="0"
              ry="0"
              vectorEffect="non-scaling-stroke"
            ></motion.rect>
          </g>
        </motion.svg>
      </div>
    </>
  )
}
