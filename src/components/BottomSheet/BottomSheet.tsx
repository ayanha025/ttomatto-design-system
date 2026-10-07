'use client'

// src/components/BottomSheet/BottomSheet.tsx
import { useId } from 'react'
import { createPortal } from 'react-dom'
import { useDialog, useIsMounted } from '../shared/useDialog'
import { cx } from '../shared/cx'
import { DialogHeader } from '../shared/DialogHeader'
import { ButtonStack } from '../ButtonStack'
import styles from './BottomSheet.module.css'

export interface BottomSheetProps {
  isOpen: boolean
  title?: string
  onClose: () => void
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
  /** title이 없을 때 스크린리더가 읽을 이름 */
  'aria-label'?: string
}

export function BottomSheet({ isOpen, title, onClose, children, footer, className, 'aria-label': ariaLabel }: BottomSheetProps) {
  const mounted = useIsMounted()
  const panelRef = useDialog<HTMLDivElement>(isOpen && mounted, onClose)
  const titleId = useId()

  if (!isOpen || !mounted) return null

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={panelRef}
        className={cx(styles.sheet, className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : ariaLabel}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.handleArea} aria-hidden="true">
          <div className={styles.handle} />
        </div>
        {title && <DialogHeader title={title} titleId={titleId} onClose={onClose} />}
        <div className={styles.body}>{children}</div>
        {footer && <ButtonStack padded>{footer}</ButtonStack>}
      </div>
    </div>,
    document.body,
  )
}
