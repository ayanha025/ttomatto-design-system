// src/components/Button/Button.tsx
import { forwardRef } from 'react'
import { cx } from '../shared/cx'
import { Icon, type IconName } from '../Icon'
import styles from './Button.module.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'small' | 'medium' | 'large'
  leftIcon?: IconName
  rightIcon?: IconName
  /** 로딩 중에는 왼쪽에 로딩 아이콘을 보여주고 클릭을 막음 */
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'medium',
    leftIcon,
    rightIcon,
    loading = false,
    type = 'button',
    disabled,
    className,
    children,
    ...rest
  },
  ref,
) {
  const iconSize = size === 'large' ? 24 : 20
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      aria-busy={loading || undefined}
      className={cx(styles.button, styles[variant], styles[size], loading && styles.loading, className)}
      {...rest}
    >
      {loading ? (
        <Icon name="loading" size={iconSize} className={styles.spinner} />
      ) : (
        leftIcon && <Icon name={leftIcon} size={iconSize} />
      )}
      {children}
      {!loading && rightIcon && <Icon name={rightIcon} size={iconSize} />}
    </button>
  )
})
