'use client'

// src/components/Checkbox/Checkbox.tsx
import { forwardRef } from 'react'
import { cx } from '../shared/cx'
import { useControllableState } from '../shared/useControllableState'
import { Icon } from '../Icon'
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
        {isChecked && <Icon name="check-bold" size={12} />}
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  )
})
