import {hues} from '@sanity/color'
import {forwardRef} from 'react'

/**
 * @public
 */
export const GroqMonogram = forwardRef(function GroqMonogram(
  props: React.SVGProps<SVGSVGElement>,
  ref: React.Ref<SVGSVGElement>
) {
  return (
    <svg
      data-sanity-icon="groq-monogram"
      width="1em"
      height="1em"
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      ref={ref}
    >
      <rect width="128" height="128" rx="8" fill={hues.green[950].hex} />
      <rect y="32" width="64" height="64" fill={hues.green[800].hex} />
      <path d="M64 32L32 64H64V32Z" fill={hues.magenta[400].hex} />
      <path d="M64 64H32L64 96V64Z" fill={hues.green[300].hex} />
      <path d="M96 64H64V96L96 64Z" fill={hues.purple[300].hex} />
    </svg>
  )
})
