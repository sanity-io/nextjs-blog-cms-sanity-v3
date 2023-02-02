import Avatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'
import Date from 'components/PostDate'
import { motion, useAnimation, useInView } from 'framer-motion'
import type { Post } from 'lib/sanity.queries'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Omit<Post, '_id'>) {
  const controls = useAnimation()

  const headerVariants = {
    visible: { opacity: 1, transition: { duration: 0.5 } },
    hidden: { opacity: 0 },
    delayReveal: { opacity: 1, transition: { delay: 0.3, duration: 0.5 } },
    image: {
      y: -6,
      opacity: 1,
      scale: 1.1,
      transition: { duration: 1, type: 'spring', bounce: 0.5 },
    },
  }

  return (
    // <motion.div className="" animate={{ opacity: 1 }}>
    <motion.div className="" animate={{ opacity: 1, scale: 1 }}>
      <motion.div
        className="mb-5 shadow-2xl"
        variants={headerVariants}
        whileInView={'image'}
      >
        <CoverImage
          slug={slug}
          title={title}
          image={coverImage}
          priority={false}
        />
      </motion.div>
      <motion.h3
        className="mb-3 text-3xl leading-snug"
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
      >
        <Link href={`/posts/${slug}`} className=" hover:underline">
          {title}
        </Link>
      </motion.h3>
      <div className="mb-4 text-lg">
        <Date dateString={date} />
      </div>
      {excerpt && <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>}
      <motion.div
        className=""
        variants={headerVariants}
        initial="hidden"
        whileInView="delayReveal"
        transition={{ duration: 0.5 }}
      >
        {author && <Avatar name={author.name} picture={author.picture} />}
      </motion.div>
    </motion.div>
  )
}
