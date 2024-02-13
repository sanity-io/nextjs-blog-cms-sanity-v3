import Date from 'components/PostDate'
import { urlForImage } from 'lib/sanity.image'
import type { Post } from 'lib/sanity.queries'
import Image from 'next/image'
import Link from 'next/link'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  slug,
}: Omit<Post, '_id'>) {
  return (
    <Link href={`/posts/${slug}`}>
      <div className="flex flex-row items-center h-24 overflow-hidden rounded-md border border-gray-200 hover:border-gray-500">
        <div className="relative rounded-md overflow-hidden m-2">
          <Image
            height={80}
            width={80}
            alt=""
            src={urlForImage(coverImage).height(100).width(100).url()}
          />
        </div>
        <div className="p-2 max-w-64 h-full">
          <div className="flex flex-row justify-between items-center">
            <h3 className="text-sm leading-snug text-balance font-bold">
              {title}
            </h3>
            <div className="text-xs">
              <Date dateString={date} />
            </div>
          </div>
          {excerpt ? (
            <div className="max-h-12 text-xs overflow-hidden">{excerpt}</div>
          ) : null}
        </div>
      </div>
    </Link>
  )
}
