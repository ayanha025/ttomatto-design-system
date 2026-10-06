'use client'

// src/components/Chip/Chip.tsx
import { forwardRef } from 'react'
import { cx } from '../shared/cx'
import { CloseIcon } from '../shared/CloseIcon'
import styles from './Chip.module.css'

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'filled' | 'outlined'
  selected?: boolean
  disabled?: boolean
  onClose?: () => void
}

export const Chip = forwardRef<HTMLDivElement, ChipProps>(function Chip(
  { variant = 'filled', selected = false, disabled = false, onClose, onClick, onKeyDown, className, children, ...rest },
  ref,
) {
  const clickable = Boolean(onClick)

  // 클릭 가능한 칩은 버튼처럼 Enter/Space로도 동작
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e)
    if (!clickable || disabled || e.target !== e.currentTarget) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      e.currentTarget.click()
    }
  }

  return (
    <div
      ref={ref}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable && !disabled ? 0 : undefined}
      aria-pressed={clickable ? selected : undefined}
      onKeyDown={handleKeyDown}
      className={cx(
        styles.chip,
        styles[variant],
        selected && styles.selected,
        clickable && styles.clickable,
        disabled && styles.disabled,
        className,
      )}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      <span className={styles.label}>{children}</span>
      {onClose && !disabled && (
        <button
          className={styles.closeButton}
          type="button"
          aria-label="삭제"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
        >
          <CloseIcon size={14} />
        </button>
      )}
    </div>
  )
})
