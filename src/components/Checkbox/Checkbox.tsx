'use client'

// src/components/Checkbox/Checkbox.tsx
import { forwardRef } from 'react'
import { cx } from '../shared/cx'
import { useControllableState } from '../shared/useControllableState'
import styles from './Checkbox.module.css'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { checked, defaultChecked = false, disabled = false, label, onChange, className, ...rest },
  ref,
) {
  const [isChecked, setIsChecked] = useControllableState(checked, defaultChecked)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked)
    onChange?.(e)
  }

  return (
    <label className={cx(styles.wrapper, disabled && styles.disabled, className)}>
      <input
        ref={ref}
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        className={styles.hiddenInput}
        {...rest}
      />
      <div aria-hidden="true" className={cx(styles.checkbox, isChecked && styles.checked)}>
        {isChecked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6L5 8.5L9.5 3.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  )
})
