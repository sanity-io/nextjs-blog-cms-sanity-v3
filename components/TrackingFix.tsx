import { vercelStegaSplit } from '@vercel/stega'

/**
 * If there's negative space (using `letter-spacing` CSS), we split the string to maintain the original layout
 */
export default function TrackingFix({ children }: { children: string }) {
  const { cleaned, encoded } = vercelStegaSplit(children)

  return (
    <>
      {cleaned}
      {encoded && <span style={{ display: 'none' }}>{encoded}</span>}
    </>
  )
}
