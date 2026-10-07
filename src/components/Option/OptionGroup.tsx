// src/components/Option/OptionGroup.tsx
import { forwardRef } from 'react'
import { cx } from '../shared/cx'
import styles from './Option.module.css'

export interface OptionGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 목록 최대 높이(px). 넘치면 스크롤바 표시 */
  maxHeight?: number
}

export const OptionGroup = forwardRef<HTMLDivElement, OptionGroupProps>(function OptionGroup(
  { maxHeight, className, style, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="listbox"
      className={cx(styles.group, className)}
      style={{ maxHeight, ...style }}
      {...rest}
    >
      {children}
    </div>
  )
})
