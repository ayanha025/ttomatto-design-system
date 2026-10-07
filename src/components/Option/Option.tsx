// src/components/Option/Option.tsx
import { forwardRef } from 'react'
import { cx } from '../shared/cx'
import { Icon } from '../Icon'
import styles from './Option.module.css'

export type OptionType = 'check' | 'radio' | 'text' | 'text2'

export interface OptionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** check: 체크박스 / radio: 라디오 / text: 왼쪽 체크 표시 / text2: 오른쪽 체크 표시(한 줄) */
  type?: OptionType
  label: React.ReactNode
  subText?: React.ReactNode
  selected?: boolean
  disabled?: boolean
  /** 키보드로 이동해 온 항목 표시 (마우스 hover와 같은 모양) */
  active?: boolean
}

export const Option = forwardRef<HTMLDivElement, OptionProps>(function Option(
  { type = 'text', label, subText, selected = false, disabled = false, active = false, className, ...rest },
  ref,
) {
  const marker = (
    <span className={styles.marker} aria-hidden="true">
      {type === 'check' && (
        <span className={cx(styles.checkbox, selected && styles.controlOn)}>
          {selected && <Icon name="check-bold" size={12} />}
        </span>
      )}
      {type === 'radio' && (
        <span className={cx(styles.radio, selected && styles.controlOn)}>
          {selected && <span className={styles.dot} />}
        </span>
      )}
      {(type === 'text' || type === 'text2') && selected && (
        <Icon name="check-bold" size={16} className={styles.checkMark} />
      )}
    </span>
  )

  return (
    <div
      ref={ref}
      role="option"
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      className={cx(
        styles.option,
        type === 'text2' && styles.text2,
        selected && styles.selected,
        active && styles.active,
        disabled && styles.disabled,
        className,
      )}
      {...rest}
    >
      {type !== 'text2' && marker}
      <span className={styles.contents}>
        <span className={styles.label}>{label}</span>
        {subText && type !== 'text2' && <span className={styles.subText}>{subText}</span>}
      </span>
      {type === 'text2' && marker}
    </div>
  )
})
