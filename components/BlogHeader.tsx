import { PortableText } from '@portabletext/react'
import { motion, spring } from 'framer-motion'
import Link from 'next/link'

import styles from './BlogHeader.module.css'

export default function BlogHeader({
  title,
  description,
  level,
}: {
  title: string
  description?: any[]
  level: 1 | 2
}) {
  switch (level) {
    case 1:
      return (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <header className="mt-16 mb-10 flex flex-col items-center md:mb-12 md:flex-row md:justify-between">
              <motion.h1
                initial={{ y: -100 }}
                animate={{ y: 0, scale: 1.3 }}
                transition={{ duration: 1, type: 'spring', bounce: 0.1 }}
                className="text-6xl font-bold leading-tight tracking-tighter md:pr-8 md:text-8xl"
              >
                {title}
              </motion.h1>
              <motion.div
                animate={{ rotateX: 0, rotateZ: 0, rotateY: 360 }}
                className="mx-auto flex items-center justify-center rounded-full border p-4"
              >
                <p>🧙🏾‍♂️</p>
              </motion.div>
              <h4
                className={`mt-5 text-center text-lg md:pl-8 md:text-left ${styles.portableText}`}
              >
                <PortableText value={description} />
              </h4>
            </header>
          </motion.div>
        </>
      )

    case 2:
      return (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <header>
            <h2 className="mt-8 mb-20 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
              <Link href="/" className="hover:underline">
                {title}
              </Link>
            </h2>
          </header>
        </motion.div>
      )

    default:
      throw new Error(
        `Invalid level: ${
          JSON.stringify(level) || typeof level
        }, only 1 or 2 are allowed`
      )
  }
}
