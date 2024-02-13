import { urlForImage } from 'lib/sanity.image'
import type { Photo, Post } from 'lib/sanity.queries'
import Image from 'next/image'

export default function PhotoPreview({
  description,
  image,
}: Omit<Photo, '_id'>) {
  return (
    <div className="overflow-hidden">
      <div>
        {image?.asset?._ref ? (
          <Image
            className="h-auto w-full"
            width={500}
            height={250}
            alt=""
            src={urlForImage(image).height(250).width(500).url()}
            sizes="100vw"
          />
        ) : null}
      </div>
    </div>
  )
}
