'use client'

// src/components/SearchField/SearchField.tsx
import { forwardRef, useId, useRef } from 'react'
import { cx } from '../shared/cx'
import { FieldLabel, HelpMessage } from '../shared/Field'
import { useControllableState } from '../shared/useControllableState'
import { Icon } from '../Icon'
import field from '../shared/Field.module.css'

export interface SearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
  size?: 'medium' | 'large'
  error?: boolean
  helperText?: string
  onClear?: () => void
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  {
    label,
    size = 'large',
    error = false,
    helperText,
    placeholder = '검색어를 입력하세요',
    disabled = false,
    value,
    defaultValue,
    onChange,
    onClear,
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
  const [currentValue, setCurrentValue] = useControllableState(
    value === undefined ? undefined : String(value),
    String(defaultValue ?? ''),
  )
  const inputRef = useRef<HTMLInputElement | null>(null)

  const setRefs = (node: HTMLInputElement | null) => {
    inputRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) ref.current = node
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value)
    onChange?.(e)
  }

  const handleClear = () => {
    setCurrentValue('')
    onClear?.()
    inputRef.current?.focus()
  }

  return (
    <div className={cx(field.wrapper, field[size], className)}>
      {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}
      <div className={cx(field.box, field[size], error && field.invalid, disabled && field.disabled)}>
        <input
          ref={setRefs}
          id={inputId}
          className={field.text}
          type="search"
          placeholder={placeholder}
          disabled={disabled}
          value={currentValue}
          onChange={handleChange}
          aria-invalid={error || undefined}
          aria-describedby={helperText ? helperId : undefined}
          {...rest}
        />
        {currentValue && !disabled ? (
          <button className={field.iconButton} onClick={handleClear} type="button" aria-label="검색어 지우기">
            <Icon name="cancel" size={iconSize} />
          </button>
        ) : (
          <Icon name="search" size={iconSize} className={field.icon} />
        )}
      </div>
      {helperText && (
        <HelpMessage id={helperId} status={error ? 'error' : 'default'}>
          {helperText}
        </HelpMessage>
      )}
    </div>
  )
})
