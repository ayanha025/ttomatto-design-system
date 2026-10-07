'use client'

// src/components/SelectField/SelectField.tsx
import { forwardRef, useState, useRef, useEffect, useId } from 'react'
import { cx } from '../shared/cx'
import { useControllableState } from '../shared/useControllableState'
import { FieldLabel, HelpMessage } from '../shared/Field'
import { Icon } from '../Icon'
import { Option, OptionGroup } from '../Option'
import field from '../shared/Field.module.css'
import styles from './SelectField.module.css'

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectFieldProps {
  label?: string
  /** 라벨 옆에 (Optional) 표시 */
  optional?: boolean
  required?: boolean
  size?: 'medium' | 'large'
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
    optional,
    required,
    size = 'large',
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
  const listRef = useRef<HTMLDivElement>(null)

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
    if (options.find(o => o.value === optionValue)?.disabled) return
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
    <div className={cx(field.wrapper, styles.wrapper, className)} ref={wrapperRef}>
      {label && (
        <FieldLabel id={labelId} htmlFor={triggerId} required={required} optional={optional}>
          {label}
        </FieldLabel>
      )}
      <div className={styles.anchor}>
        <button
          ref={ref}
          id={triggerId}
          className={cx(field.box, field[size], styles.trigger, isOpen && field.active, error && field.invalid, disabled && field.disabled)}
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
          aria-required={required || undefined}
          aria-describedby={helperText ? helperId : undefined}
        >
          <span className={cx(field.text, !selectedOption && field.placeholder)}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <Icon
            name={isOpen ? 'chevron-up' : 'chevron-down'}
            size={size === 'large' ? 24 : 20}
            className={cx(field.icon, styles.arrow)}
          />
        </button>
        {isOpen && (
          <OptionGroup
            ref={listRef}
            id={listboxId}
            className={styles.dropdown}
            aria-labelledby={label ? labelId : undefined}
            maxHeight={204}
          >
            {options.map((option, index) => (
              <Option
                key={option.value}
                id={optionId(index)}
                type="text2"
                label={option.label}
                selected={option.value === selectedValue}
                disabled={option.disabled}
                active={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
                // 클릭해도 트리거 버튼의 포커스가 유지되도록
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(option.value)}
              />
            ))}
          </OptionGroup>
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
