import { vercelStegaSplit } from '@vercel/stega'
import { format, parseISO } from 'date-fns'

export default function PostDate({ dateString }: { dateString: string }) {
  if (!dateString) return null

  const { cleaned, encoded } = vercelStegaSplit(dateString)
  const date = parseISO(cleaned)

  return (
    <time dateTime={dateString}>
      {format(date, 'LLLL	d, yyyy')}
      {encoded}
    </time>
  )
}
