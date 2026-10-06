'use client'

// src/components/TextField/TextField.tsx
import { forwardRef, useId } from 'react'
import { cx } from '../shared/cx'
import styles from './TextField.module.css'

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: boolean
  helperText?: string
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, error = false, helperText, id, className, ...rest },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const helperId = `${inputId}-helper`

  return (
    <div className={cx(styles.wrapper, className)}>
      {label && <label className={styles.label} htmlFor={inputId}>{label}</label>}
      <input
        ref={ref}
        id={inputId}
        className={cx(styles.input, error && styles.error)}
        aria-invalid={error || undefined}
        aria-describedby={helperText ? helperId : undefined}
        {...rest}
      />
      {helperText && (
        <span id={helperId} className={error ? styles.helperError : styles.helper}>
          {helperText}
        </span>
      )}
    </div>
  )
})
