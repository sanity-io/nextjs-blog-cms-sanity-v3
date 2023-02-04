import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Avatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'
import Date from 'components/PostDate'
import { motion, useAnimation, useInView } from 'framer-motion'
import type { Post } from 'lib/sanity.queries'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Suspense, useEffect, useRef } from 'react'

const Bakery = dynamic(() => import('../models/Bakery'))
const House = dynamic(() => import('../models/House'))
const Office = dynamic(() => import('../models/Office'))

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
  console.log(title)
  return (
    // <motion.div className="" animate={{ opacity: 1 }}>
    <motion.div className="" animate={{ opacity: 1, scale: 1 }}>
      {title.includes('3d') || title.includes('3D') ? (
        <div className="mb-8 h-[250px] flex-shrink-0 sm:mx-0 md:mb-16 md:h-[135px] lg:h-[185px] xl:h-[316px]">
          {/* <CoverImage title={title} image={coverImage} priority slug={slug} /> */}
          {/* <div>this page is 3d</div> */}
          <div className="h-full w-auto">
            <Canvas>
              <Environment preset="sunset" />
              {title.includes('office') ? (
                <Office
                  scale={30}
                  position={[-100, -70, 100]}
                  rotation={[0, 0, 20]}
                />
              ) : title.includes('bakery') ? (
                <Bakery
                  scale={130}
                  position={[0, -75, 0]}
                  rotation={[0, 11, 0]}
                />
              ) : (
                <House scale={0.07} position={[0, -50, 0]} />
              )}
              <OrbitControls
                enablePan={false}
                enableZoom={false}
                // target={camRef}
                autoRotate={false}
                autoRotateSpeed={0.1}
                makeDefault
                rotateSpeed={0.1}
                maxAzimuthAngle={Infinity}
                maxPolarAngle={1.75}
                // minPolarAngle={-180}
                maxDistance={400}
                minDistance={-10}
              />
              {/* @ts-ignore */}
              <PerspectiveCamera
                makeDefault
                position={[-5000, 2000, -1000]}
                zoom={2}
              />
            </Canvas>
          </div>
        </div>
      ) : (
        <motion.div
          className="mb-5 "
          variants={headerVariants}
          whileInView={'image'}
        >
          <div className="mb-8 sm:mx-0 md:mb-16">
            <CoverImage title={title} image={coverImage} priority slug={slug} />
          </div>
        </motion.div>
      )}
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
