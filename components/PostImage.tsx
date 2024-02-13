import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'

interface PostImageProps {
  title: string
  slug?: string
  image: any
  priority?: boolean
}

export default function PostImage(props: PostImageProps) {
  const { title, slug, image: source, priority } = props
  const image = source?.asset?._ref ? (
    <div>
      <Image
        className="h-auto w-full"
        width={500}
        height={250}
        alt=""
        src={urlForImage(source).height(250).width(500).url()}
        sizes="100vw"
        priority={priority}
      />
    </div>
  ) : (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  )

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
