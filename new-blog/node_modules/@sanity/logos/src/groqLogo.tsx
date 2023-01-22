import {hues} from '@sanity/color'
import {forwardRef} from 'react'

/**
 * @public
 */
export const GroqLogo = forwardRef(function GroqLogo(
  props: React.SVGProps<SVGSVGElement>,
  ref: React.Ref<SVGSVGElement>
) {
  return (
    <svg
      data-sanity-icon="groq-logo"
      height="1em"
      viewBox="0 0 304 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      ref={ref}
    >
      <path d="M32 0L0 32H32V0Z" fill={hues.magenta[400].hex} />
      <path d="M32 32H0L32 64V32Z" fill={hues.green[300].hex} />
      <path d="M64 32H32V64L64 32Z" fill={hues.purple[300].hex} />
      <path d="M112 0L80 32H112V0Z" fill={hues.green[300].hex} />
      <path d="M112 0H80V32L112 0Z" fill={hues.purple[300].hex} />
      <path d="M112 32H80L112 64V32Z" fill={hues.yellow[200].hex} />
      <path d="M144 64L112 32V64H144Z" fill={hues.blue[300].hex} />
      <path d="M80 32V64H112L80 32Z" fill={hues.orange[400].hex} />
      <path d="M112 0V32H144L112 0Z" fill={hues.magenta[400].hex} />
      <path d="M192 0L160 32H192V0Z" fill={hues.yellow[200].hex} />
      <path d="M192 32H160L192 64V32Z" fill={hues.orange[400].hex} />
      <path d="M224 32H192V64L224 32Z" fill={hues.green[300].hex} />
      <path d="M192 0V32H224L192 0Z" fill={hues.blue[300].hex} />
      <path d="M272 0L240 32H272V0Z" fill={hues.purple[300].hex} />
      <path d="M304 32L272 64H304V32Z" fill={hues.magenta[400].hex} />
      <path d="M272 32H240L272 64V32Z" fill={hues.blue[300].hex} />
      <path d="M304 32H272V64L304 32Z" fill={hues.yellow[200].hex} />
      <path d="M272 0V32H304L272 0Z" fill={hues.green[300].hex} />
    </svg>
  )
})
