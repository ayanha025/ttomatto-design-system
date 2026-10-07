'use client'

// src/components/Chip/Chip.tsx
import { forwardRef } from 'react'
import { cx } from '../shared/cx'
import { Icon, type IconName } from '../Icon'
import styles from './Chip.module.css'

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large'
  leftIcon?: IconName
  selected?: boolean
  disabled?: boolean
  onClose?: () => void
}

export const Chip = forwardRef<HTMLDivElement, ChipProps>(function Chip(
  { size = 'large', leftIcon, selected = false, disabled = false, onClose, onClick, onKeyDown, className, children, ...rest },
  ref,
) {
  const clickable = Boolean(onClick)
  const iconSize = size === 'large' ? 20 : 16

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
        styles[size],
        selected && styles.selected,
        clickable && styles.clickable,
        disabled && styles.disabled,
        className,
      )}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {leftIcon && <Icon name={leftIcon} size={iconSize} />}
      <span className={styles.label}>{children}</span>
      {onClose && (
        <button
          className={styles.closeButton}
          type="button"
          aria-label="삭제"
          disabled={disabled}
          onClick={(e) => { e.stopPropagation(); onClose(); }}
        >
          <Icon name="cancel" size={iconSize} />
        </button>
      )}
    </div>
  )
})
