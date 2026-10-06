// src/components/shared/useDialog.ts
import { useEffect, useRef, useState } from 'react'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/**
 * 브라우저에 마운트된 뒤에만 true.
 * 서버 렌더링(Next.js 등)에는 document가 없으므로 portal은 마운트 후에 그린다.
 */
export function useIsMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

/**
 * 모달형 다이얼로그 공통 동작
 * - 열릴 때 패널 안 첫 요소로 포커스 이동, 닫히면 원래 요소로 포커스 복귀
 * - Tab 포커스를 패널 안에 가둠
 * - ESC로 닫기
 * - 배경 스크롤 잠금
 */
export function useDialog<T extends HTMLElement>(isOpen: boolean, onClose: () => void) {
  const panelRef = useRef<T>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!isOpen) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const panel = panelRef.current
    const getFocusable = () =>
      panel ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)) : []

    const first = getFocusable()[0]
    ;(first ?? panel)?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab' || !panel) return

      const focusable = getFocusable()
      if (focusable.length === 0) {
        e.preventDefault()
        panel.focus()
        return
      }
      const firstEl = focusable[0]
      const lastEl = focusable[focusable.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === firstEl || active === panel)) {
        e.preventDefault()
        lastEl.focus()
      } else if (!e.shiftKey && active === lastEl) {
        e.preventDefault()
        firstEl.focus()
      }
    }

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = overflow
      previouslyFocused?.focus()
    }
  }, [isOpen])

  return panelRef
}
