'use client'

// src/components/TextField/TextField.tsx
import { forwardRef, useId } from 'react'
import { cx } from '../shared/cx'
import { FieldLabel, HelpMessage } from '../shared/Field'
import { Icon, type IconName } from '../Icon'
import field from '../shared/Field.module.css'

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  /** 라벨 옆에 (선택) 표시 */
  optional?: boolean
  size?: 'medium' | 'large'
  error?: boolean
  success?: boolean
  helperText?: string
  rightIcon?: IconName
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  {
    label,
    optional,
    size = 'large',
    error = false,
    success = false,
    helperText,
    rightIcon,
    required,
    disabled,
    id,
    className,
    ...rest
  },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const helperId = `${inputId}-helper`
  const iconSize = size === 'large' ? 24 : 20

  return (
    <div className={cx(field.wrapper, field[size], className)}>
      {label && (
        <FieldLabel htmlFor={inputId} required={required} optional={optional}>
          {label}
        </FieldLabel>
      )}
      <div className={cx(field.box, field[size], error && field.invalid, disabled && field.disabled)}>
        <input
          ref={ref}
          id={inputId}
          className={field.text}
          required={required}
          disabled={disabled}
          aria-invalid={error || undefined}
          aria-describedby={helperText ? helperId : undefined}
          {...rest}
        />
        {rightIcon && <Icon name={rightIcon} size={iconSize} className={field.icon} />}
      </div>
      {helperText && (
        <HelpMessage id={helperId} status={error ? 'error' : success ? 'success' : 'default'}>
          {helperText}
        </HelpMessage>
      )}
    </div>
  )
})
