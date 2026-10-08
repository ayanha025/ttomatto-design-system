// src/components/BrandIcon/BrandIcon.tsx
import { forwardRef, useId } from 'react'
import { brandIcons, type BrandIconName } from './brandIcons'

export interface BrandIconProps extends React.SVGAttributes<SVGSVGElement> {
  name: BrandIconName
  size?: number
  /** 아이콘 의미를 읽어줘야 할 때만 지정. 없으면 장식용으로 숨김 */
  label?: string
}

/** 브랜드 컬러가 들어간 일러스트 아이콘 (가게 필터 · 태그 등). 단색 UI 아이콘은 Icon을 사용 */
export const BrandIcon = forwardRef<SVGSVGElement, BrandIconProps>(function BrandIcon(
  { name, size = 24, label, ...rest },
  ref,
) {
  const { w, h, body } = brandIcons[name]
  // 그라데이션·마스크 id가 페이지 안에서 겹치지 않도록 인스턴스마다 고유 값 사용
  const id = useId().replace(/:/g, '')
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
      dangerouslySetInnerHTML={{ __html: body.replace(/\{id\}/g, id) }}
      {...rest}
    />
  )
})
