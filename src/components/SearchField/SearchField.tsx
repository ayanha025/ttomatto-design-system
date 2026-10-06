'use client'

// src/components/SearchField/SearchField.tsx
import { forwardRef, useRef } from 'react'
import { cx } from '../shared/cx'
import { CloseIcon } from '../shared/CloseIcon'
import { useControllableState } from '../shared/useControllableState'
import styles from './SearchField.module.css'

export interface SearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onClear?: () => void
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  {
    placeholder = '검색어를 입력하세요',
    disabled = false,
    value,
    defaultValue,
    onChange,
    onClear,
    className,
    ...rest
  },
  ref,
) {
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
    <div className={cx(styles.wrapper, className)}>
      <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input
        ref={setRefs}
        className={styles.input}
        type="text"
        placeholder={placeholder}
        disabled={disabled}
        value={currentValue}
        onChange={handleChange}
        {...rest}
      />
      {currentValue && !disabled && (
        <button className={styles.clearButton} onClick={handleClear} type="button" aria-label="검색어 지우기">
          <CloseIcon size={14} />
        </button>
      )}
    </div>
  )
})
