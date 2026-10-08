// src/components/Logo/Logo.tsx
import { forwardRef, useId } from 'react'
import { logos } from './logos'

export type LogoType = 'wordmark' | 'symbol' | 'horizontal' | 'vertical'

export interface LogoProps extends Omit<React.SVGAttributes<SVGSVGElement>, 'type'> {
  /** wordmark(글자) · symbol(토마토) · horizontal(가로 조합) · vertical(세로 조합) */
  type?: LogoType
  /** color: 브랜드 그라데이션 / simple: 단색 — 색은 `color`(currentColor)로 지정 */
  variant?: 'color' | 'simple'
  /** 높이(px). 너비는 비율에 맞춰 계산. 없으면 Figma 원본 크기 */
  height?: number
  /** 스크린리더가 읽을 이름 */
  label?: string
}

export const Logo = forwardRef<SVGSVGElement, LogoProps>(function Logo(
  { type = 'wordmark', variant = 'color', height, label = '또맛또', ...rest },
  ref,
) {
  const { w, h, body } = logos[`${type}-${variant}`]
  // 그라데이션 id가 페이지 안에서 겹치지 않도록 인스턴스마다 고유 값 사용
  const id = useId().replace(/:/g, '')
  const scale = height ? height / h : 1
  return (
    <svg
      ref={ref}
      width={w * scale}
      height={h * scale}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      role="img"
      aria-label={label}
      dangerouslySetInnerHTML={{ __html: body.replace(/\{id\}/g, id) }}
      {...rest}
    />
  )
})
