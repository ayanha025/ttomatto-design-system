'use client'

// src/components/BottomNavigation/BottomNavigation.tsx
import { forwardRef } from 'react'
import { cx } from '../shared/cx'
import { Icon, type IconName } from '../Icon'
import styles from './BottomNavigation.module.css'

export interface BottomNavigationItem {
  value: string
  label: string
  icon: IconName
  /** 선택됐을 때 아이콘 (보통 채워진 모양) */
  selectedIcon?: IconName
}

export interface BottomNavigationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  items?: BottomNavigationItem[]
  value: string
  onChange?: (value: string) => void
  /** 가운데 + 버튼. 없으면 숨김 */
  onFabClick?: () => void
  fabLabel?: string
}

export const defaultNavigationItems: BottomNavigationItem[] = [
  { value: 'home', label: '홈', icon: 'home', selectedIcon: 'home-fill' },
  { value: 'feed', label: '피드', icon: 'grid', selectedIcon: 'grid-fill' },
  { value: 'group', label: '그룹', icon: 'compass', selectedIcon: 'compass-fill' },
  { value: 'my', label: '마이', icon: 'user', selectedIcon: 'user-fill' },
]

export const BottomNavigation = forwardRef<HTMLElement, BottomNavigationProps>(function BottomNavigation(
  { items = defaultNavigationItems, value, onChange, onFabClick, fabLabel = '새 글 작성', className, 'aria-label': ariaLabel = '메인 메뉴', ...rest },
  ref,
) {
  const half = Math.ceil(items.length / 2)

  const renderItem = (item: BottomNavigationItem) => {
    const selected = item.value === value
    return (
      <button
        key={item.value}
        type="button"
        className={cx(styles.item, selected && styles.selected)}
        aria-current={selected ? 'page' : undefined}
        onClick={() => onChange?.(item.value)}
      >
        <Icon name={selected && item.selectedIcon ? item.selectedIcon : item.icon} />
        <span className={styles.label}>{item.label}</span>
      </button>
    )
  }

  return (
    <nav ref={ref} className={cx(styles.nav, className)} aria-label={ariaLabel} {...rest}>
      {items.slice(0, half).map(renderItem)}
      {onFabClick && (
        <div className={styles.fabWrap}>
          <button type="button" className={styles.fab} onClick={onFabClick} aria-label={fabLabel}>
            <Icon name="plus-bold" />
          </button>
        </div>
      )}
      {items.slice(half).map(renderItem)}
    </nav>
  )
})
