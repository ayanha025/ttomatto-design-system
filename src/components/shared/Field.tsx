// src/components/shared/Field.tsx
// TextField·TextArea·SearchField·SelectField가 함께 쓰는 라벨과 도움말 (Figma Label, Part/Help message)
import { cx } from './cx'
import styles from './Field.module.css'

export interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
  optional?: boolean
}

export function FieldLabel({ required, optional, className, children, ...rest }: FieldLabelProps) {
  return (
    <label className={cx(styles.label, className)} {...rest}>
      {children}
      {required && <span className={styles.required} aria-hidden="true">*</span>}
      {optional && !required && <span className={styles.optional}>(Optional)</span>}
    </label>
  )
}

export interface HelpMessageProps {
  id: string
  status?: 'default' | 'error' | 'success'
  children: React.ReactNode
}

export function HelpMessage({ id, status = 'default', children }: HelpMessageProps) {
  return (
    <span id={id} className={cx(styles.help, styles[status])}>
      {children}
    </span>
  )
}
