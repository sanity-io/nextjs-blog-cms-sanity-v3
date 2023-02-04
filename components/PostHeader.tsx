import {
  Box,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Avatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'
import Date from 'components/PostDate'
import PostTitle from 'components/PostTitle'
import type { Post } from 'lib/sanity.queries'
import Bakery from 'models/Bakery'
import House from 'models/House'
import Office from 'models/Office'

export default function PostHeader(
  props: Pick<Post, 'title' | 'coverImage' | 'date' | 'author' | 'slug'>
) {
  const { title, coverImage, date, author, slug } = props
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:mb-12 md:block">
        {author && <Avatar name={author.name} picture={author.picture} />}
      </div>
      {title.includes('3d') || title.includes('3D') ? (
        <div className="mb-8 h-[400px] sm:mx-0 md:mb-16">
          {/* <CoverImage title={title} image={coverImage} priority slug={slug} /> */}
          {/* <div>this page is 3d</div> */}
          <div className="h-full w-auto">
            <Canvas>
              <Environment preset="sunset" />
              {/* <House scale={0.1} position={[0, -75, 0]} /> */}
              {/* <House scale={0.001} position={[0, 0, 0]} /> */}
              {title.includes('office') ? (
                <Office scale={7} position={[0, -20, 0]} />
              ) : title.includes('bakery') ? (
                <Bakery scale={10} position={[0, -5, 0]} />
              ) : (
                <House
                  scale={0.01}
                  rotation={[0, 45, 0]}
                  position={[0, -5, 0]}
                />
              )}
              <OrbitControls
                // target={camRef}
                autoRotate={true}
                autoRotateSpeed={0.5}
                makeDefault
                rotateSpeed={0.2}
                maxAzimuthAngle={Infinity}
                maxPolarAngle={1.9}
                // minPolarAngle={-180}
                maxDistance={400}
                minDistance={-0.1}
                panSpeed={0.1}
                target={[0, 1, 0]}
              />
              {/* @ts-ignore */}
              <PerspectiveCamera
                makeDefault
                // position={[-5000, 2000, -1000]}
                // position={[-1, 3, 1]}
                position={[0, 20, 20]}
                zoom={1}
              />
            </Canvas>
          </div>
        </div>
      ) : (
        <div className="mb-8 sm:mx-0 md:mb-16">
          <CoverImage title={title} image={coverImage} priority slug={slug} />
        </div>
      )}
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 block md:hidden">
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
        <div className="mb-6 text-lg">
          <Date dateString={date} />
        </div>
      </div>
    </>
  )
}
