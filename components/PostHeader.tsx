import Date from 'components/PostDate'
import PostImage from 'components/PostImage'
import { urlForImage } from 'lib/sanity.image'
import type { Post } from 'lib/sanity.queries'
import Image from 'next/image'

export default function PostHeader(
  props: Pick<Post, 'title' | 'coverImage' | 'date' | 'author' | 'slug'>,
) {
  const { title, coverImage, date, slug } = props
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-2xl mb-5">
        <Image
          className="h-auto w-full"
          width={500}
          height={250}
          alt=""
          src={urlForImage(coverImage).height(750).width(1500).url()}
          sizes="100vw"
          priority
        />
      </div>
      <div className="w-full max-w-2xl px-2">
        <h1 className="text-4xl font-bold">{title}</h1>
        <div className="text-gray-500" >
          <Date dateString={date} /> 
        </div>
      </div>
    </div>
  )
}
