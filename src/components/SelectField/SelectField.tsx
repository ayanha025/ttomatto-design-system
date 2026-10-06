'use client'

// src/components/SelectField/SelectField.tsx
import { forwardRef, useState, useRef, useEffect, useId } from 'react'
import { cx } from '../shared/cx'
import { useControllableState } from '../shared/useControllableState'
import styles from './SelectField.module.css'

export interface SelectOption {
  label: string
  value: string
}

export interface SelectFieldProps {
  label?: string
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  error?: boolean
  helperText?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  id?: string
  className?: string
}

export const SelectField = forwardRef<HTMLButtonElement, SelectFieldProps>(function SelectField(
  {
    label,
    options,
    placeholder = '선택하세요',
    disabled = false,
    error = false,
    helperText,
    value,
    defaultValue,
    onChange,
    id,
    className,
  },
  ref,
) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [selectedValue, setSelectedValue] = useControllableState(value, defaultValue ?? '')
  const wrapperRef = useRef<HTMLDivElement>(null)
  const generatedId = useId()
  const triggerId = id ?? generatedId
  const labelId = `${triggerId}-label`
  const helperId = `${triggerId}-helper`
  const listboxId = `${triggerId}-listbox`
  const optionId = (index: number) => `${triggerId}-option-${index}`
  const listRef = useRef<HTMLUListElement>(null)

  const selectedOption = options.find(o => o.value === selectedValue)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 키보드로 이동한 옵션이 보이도록 스크롤
  useEffect(() => {
    if (!isOpen || activeIndex < 0) return
    listRef.current?.children[activeIndex]?.scrollIntoView({ block: 'nearest' })
  }, [isOpen, activeIndex])

  const open = () => {
    const selectedIndex = options.findIndex(o => o.value === selectedValue)
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0)
    setIsOpen(true)
  }

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue)
    onChange?.(optionValue)
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!isOpen) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault()
        open()
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex(i => Math.min(i + 1, options.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex(i => Math.max(i - 1, 0))
        break
      case 'Home':
        e.preventDefault()
        setActiveIndex(0)
        break
      case 'End':
        e.preventDefault()
        setActiveIndex(options.length - 1)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (options[activeIndex]) handleSelect(options[activeIndex].value)
        break
      case 'Escape':
        // Modal 안에서 써도 모달까지 닫히지 않도록 전파 중단
        e.preventDefault()
        e.nativeEvent.stopImmediatePropagation()
        setIsOpen(false)
        break
      case 'Tab':
        setIsOpen(false)
        break
    }
  }

  return (
    <div className={cx(styles.wrapper, className)} ref={wrapperRef}>
      {label && <label className={styles.label} id={labelId} htmlFor={triggerId}>{label}</label>}
      <button
        ref={ref}
        id={triggerId}
        className={cx(styles.trigger, isOpen && styles.focused, error && styles.error)}
        onClick={() => (isOpen ? setIsOpen(false) : open())}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
        aria-activedescendant={isOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined}
        aria-invalid={error || undefined}
        aria-describedby={helperText ? helperId : undefined}
      >
        <span className={selectedOption ? styles.value : styles.placeholder}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className={cx(styles.arrow, isOpen && styles.arrowOpen)}
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {isOpen && (
        <ul ref={listRef} id={listboxId} className={styles.dropdown} role="listbox" aria-labelledby={label ? labelId : undefined}>
          {options.map((option, index) => (
            <li
              key={option.value}
              id={optionId(index)}
              role="option"
              aria-selected={option.value === selectedValue}
              className={cx(
                styles.option,
                option.value === selectedValue && styles.optionSelected,
                index === activeIndex && styles.optionActive,
              )}
              onMouseEnter={() => setActiveIndex(index)}
              // 클릭해도 트리거 버튼의 포커스가 유지되도록
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {helperText && (
        <span id={helperId} className={error ? styles.helperError : styles.helper}>
          {helperText}
        </span>
      )}
    </div>
  )
})
