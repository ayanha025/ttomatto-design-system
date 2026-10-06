// src/components/ProgressBar/ProgressBar.tsx
import { forwardRef } from 'react'
import { cx } from '../shared/cx'
import styles from './ProgressBar.module.css'

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  showLabel?: boolean
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(
  { value, showLabel = false, className, ...rest },
  ref,
) {
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div ref={ref} className={cx(styles.wrapper, className)} {...rest}>
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={styles.fill}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <span className={styles.label}>{clampedValue}%</span>
      )}
    </div>
  )
})
