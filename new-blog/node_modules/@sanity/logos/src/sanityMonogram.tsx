import {hues, white} from '@sanity/color'
import {forwardRef} from 'react'

/**
 * @public
 */
export interface SanityMonogramColor {
  bg1: string
  bg2: string
  fg: string
}

/**
 * @public
 */
export interface SanityMonogramProps {
  color?: SanityMonogramColor
}

const SANITY_MONOGRAM_COLOR: SanityMonogramColor = {
  bg1: hues.red[500].hex,
  bg2: hues.red[200].hex,
  fg: white.hex,
}

/**
 * @public
 */
export const SanityMonogram = forwardRef(function SanityMonogram(
  props: SanityMonogramProps & Omit<React.SVGProps<SVGSVGElement>, 'color'>,
  ref: React.Ref<SVGSVGElement>
) {
  const {color = SANITY_MONOGRAM_COLOR, ...restProps} = props

  return (
    <svg
      data-sanity-icon="sanity-monogram"
      width="1em"
      height="1em"
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
      ref={ref}
    >
      <rect width="128" height="128" rx="8" fill={color.bg1} />
      <path
        d="M39.423 33.163C39.423 44.1615 46.3363 50.7056 60.1768 54.1564L74.843 57.4972C87.9418 60.453 95.9186 67.7945 95.9186 79.7554C96.0205 84.9662 94.2961 90.0531 91.0345 94.1635C91.0345 82.2301 84.751 75.7822 69.595 71.9052L55.1948 68.6882C43.6633 66.1035 34.7629 60.0681 34.7629 47.0761C34.7022 42.0589 36.3416 37.1644 39.423 33.163"
        fill={color.fg}
      />
      <path
        d="M82.0221 76.827C88.2776 80.759 91.0206 86.2582 91.0206 94.1497C85.8426 100.666 76.7462 104.323 66.0545 104.323C48.0576 104.323 35.4626 95.6207 32.6637 80.4977H49.9468C52.172 87.4406 58.0636 90.6576 65.9285 90.6576C75.5287 90.6576 81.9102 85.6258 82.0361 76.7995"
        fill={color.bg2}
      />
      <path
        d="M48.4075 49.4682C45.551 47.8004 43.2074 45.404 41.6256 42.5332C40.0437 39.6624 39.2826 36.4244 39.4231 33.1629C44.4191 26.7013 53.1096 22.7556 63.7034 22.7556C82.0362 22.7556 92.6439 32.2693 95.2609 45.66H78.6355C76.8022 40.3807 72.2121 36.27 63.8434 36.27C54.9009 36.27 48.7993 41.3843 48.4495 49.4682"
        fill={color.bg2}
      />
    </svg>
  )
})
