// src/components/Toast/Toast.tsx
import { forwardRef } from 'react'
import { cx } from '../shared/cx'
import styles from './Toast.module.css'
import iconSuccess from './assets/icon-success.svg'
import iconWarning from './assets/icon-warning.svg'
import iconError from './assets/icon-error.svg'
import glowSuccess from './assets/glow-success.svg'
import glowWarning from './assets/glow-warning.svg'
import glowError from './assets/glow-error.svg'

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'success' | 'warning' | 'error'
  message: string
  description?: string
  icon?: boolean
}

// Vite는 SVG import를 URL 문자열로, Next.js는 { src } 객체로 돌려준다
type ImportedSvg = string | { src: string }
const toUrl = (svg: ImportedSvg) => (typeof svg === 'string' ? svg : svg.src)

const assets = {
  success: { icon: toUrl(iconSuccess), glow: toUrl(glowSuccess) },
  warning: { icon: toUrl(iconWarning), glow: toUrl(glowWarning) },
  error: { icon: toUrl(iconError), glow: toUrl(glowError) },
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  { type = 'success', message, description, icon = true, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx(styles.toast, description ? styles.twoLines : styles.oneLine, className)} role="status" {...rest}>
      <img className={styles.glow} src={assets[type].glow} width={212} height={212} alt="" />
      {icon && (
        <img className={styles.icon} src={assets[type].icon} width={24} height={24} alt="" />
      )}
      <div className={styles.textBlock}>
        <p className={styles.message}>{message}</p>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  )
})
