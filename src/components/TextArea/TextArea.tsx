'use client'

// src/components/TextArea/TextArea.tsx
import { forwardRef, useId } from 'react'
import { cx } from '../shared/cx'
import { FieldLabel, HelpMessage } from '../shared/Field'
import { useControllableState } from '../shared/useControllableState'
import field from '../shared/Field.module.css'
import styles from './TextArea.module.css'

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  /** 라벨 옆에 (선택) 표시 */
  optional?: boolean
  error?: boolean
  success?: boolean
  helperText?: string
  /** maxLength가 있을 때 라벨 오른쪽에 글자 수(현재/최대) 표시 */
  showCount?: boolean
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  {
    label,
    optional,
    error = false,
    success = false,
    helperText,
    showCount = true,
    maxLength,
    value,
    defaultValue,
    onChange,
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
  const [text, setText] = useControllableState(
    value === undefined ? undefined : String(value),
    String(defaultValue ?? ''),
  )
  const counted = showCount && maxLength !== undefined

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    onChange?.(e)
  }

  return (
    <div className={cx(field.wrapper, className)}>
      {(label || counted) && (
        <div className={styles.titleRow}>
          {label && (
            <FieldLabel htmlFor={inputId} required={required} optional={optional}>
              {label}
            </FieldLabel>
          )}
          {counted && (
            <span className={styles.counter} aria-live="polite">
              <span className={cx(error && styles.counterError)}>{text.length}</span>
              <span>/</span>
              <span>{maxLength}</span>
            </span>
          )}
        </div>
      )}
      <div className={cx(field.box, field.large, styles.box, error && field.invalid, disabled && field.disabled)}>
        <textarea
          ref={ref}
          id={inputId}
          className={cx(field.text, styles.textarea)}
          value={text}
          onChange={handleChange}
          maxLength={maxLength}
          required={required}
          disabled={disabled}
          aria-invalid={error || undefined}
          aria-describedby={helperText ? helperId : undefined}
          {...rest}
        />
        {/* 크기 조절 손잡이 모양. 클릭은 아래 textarea의 기본 손잡이로 전달됨 */}
        <svg className={styles.grabber} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21 11L11 21M22 17L17 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      {helperText && (
        <HelpMessage id={helperId} status={error ? 'error' : success ? 'success' : 'default'}>
          {helperText}
        </HelpMessage>
      )}
    </div>
  )
})
