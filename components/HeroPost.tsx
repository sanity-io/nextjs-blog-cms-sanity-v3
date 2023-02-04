import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import AuthorAvatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'
import Date from 'components/PostDate'
import { motion } from 'framer-motion'
import type { Post } from 'lib/sanity.queries'
import Office from 'models/Office'
import Link from 'next/link'
import { Suspense } from 'react'

export default function HeroPost(
  props: Pick<
    Post,
    'title' | 'coverImage' | 'date' | 'excerpt' | 'author' | 'slug'
  >
) {
  const { title, coverImage, date, excerpt, author, slug } = props
  // if (title.includes('office')) {
  // }
  return (
    <section className=" shadow-md">
      <div className="mb-8 h-[400px] bg-[#5562DA] md:mb-16">
        <Suspense
          fallback={
            <motion.div
              animate={{ scale: 2 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: 'reverse',
                type: 'spring',
              }}
              className="flex h-full items-center justify-center text-center uppercase tracking-widest text-white/50"
            >
              Loading...
            </motion.div>
          }
        >
          <Canvas>
            <ambientLight />
            {/* <directionalLight position={[10, 10, 10]} /> */}
            <Office position={[0, -2, 0]} />
            <OrbitControls
              autoRotate={true}
              autoRotateSpeed={0.5}
              maxPolarAngle={1.5}
              maxZoom={20}
              enableZoom={false}
            />
            {/* <PerspectiveCamera makeDefault={true} position={[0, 4, 0]} /> */}
            {/* <OrbitControls target={[0, 2, 0]} position={[1, 10, 1]} /> */}
          </Canvas>
        </Suspense>
      </div>
      {/* Hard coded hero post at the moment */}
      {/* <div className="mb-8 md:mb-16">
        <CoverImage slug={slug} title={title} image={coverImage} priority />
      </div> */}
      <div className="mb-2 rounded-xl p-12 md:mb-28 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
        <div>
          <h3 className="mb-4 text-4xl leading-tight lg:text-6xl">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title || 'Untitled'}
            </Link>
          </h3>
          <div className="mb-4 text-lg md:mb-0">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          {excerpt && <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>}
          {author && (
            <AuthorAvatar name={author.name} picture={author.picture} />
          )}
        </div>
      </div>
    </section>
  )
}
