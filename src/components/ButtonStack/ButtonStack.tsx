// src/components/ButtonStack/ButtonStack.tsx
import { forwardRef } from 'react'
import { cx } from '../shared/cx'
import styles from './ButtonStack.module.css'

export interface ButtonStackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** horizontal: 보조 버튼 왼쪽 · 주요 버튼 오른쪽 / vertical: 주요 버튼 위 · 보조 버튼 아래 */
  direction?: 'horizontal' | 'vertical'
  /** 화면 하단에 붙일 때 쓰는 여백(위 12 · 좌우 20 · 아래 32)과 흰 배경 */
  padded?: boolean
}

export const ButtonStack = forwardRef<HTMLDivElement, ButtonStackProps>(function ButtonStack(
  { direction = 'horizontal', padded = false, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(styles.stack, styles[direction], padded && styles.padded, className)}
      {...rest}
    />
  )
})
