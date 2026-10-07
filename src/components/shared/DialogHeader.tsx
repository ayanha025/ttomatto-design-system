// src/components/shared/DialogHeader.tsx
// Modal·BottomSheet 상단 헤더 (Figma GNB: Style=Title, Location=Left)
import { Icon } from '../Icon'
import styles from './DialogHeader.module.css'

interface DialogHeaderProps {
  title: string
  titleId: string
  onClose: () => void
}

export function DialogHeader({ title, titleId, onClose }: DialogHeaderProps) {
  return (
    <div className={styles.header}>
      <h2 id={titleId} className={styles.title}>{title}</h2>
      <button className={styles.closeButton} onClick={onClose} type="button" aria-label="닫기">
        <Icon name="cancel" size={28} />
      </button>
    </div>
  )
}
