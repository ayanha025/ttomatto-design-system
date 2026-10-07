// src/components/Icon/Icon.tsx
import { forwardRef } from 'react'
import { icons, type IconName } from './icons'

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name: IconName
  size?: number
  /** 아이콘 의미를 읽어줘야 할 때만 지정. 없으면 장식용으로 숨김 */
  label?: string
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, size = 24, label, ...rest },
  ref,
) {
  const { w, h, paths } = icons[name]
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...rest}
    >
      {paths.map((p, i) =>
        'stroke' in p ? (
          <path key={i} d={p.d} stroke="currentColor" strokeWidth={p.stroke} strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path key={i} d={p.d} fill="currentColor" />
        ),
      )}
    </svg>
  )
})
