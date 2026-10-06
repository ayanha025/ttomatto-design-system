'use client'

// src/components/Toast/Toaster.tsx
// Sonner로 Toast를 화면에 띄운다. 모양은 Toast 컴포넌트, 위치·시간·쌓기는 Sonner가 담당.
import { Toaster as SonnerToaster, toast as sonnerToast } from 'sonner'
import type { ToasterProps as SonnerToasterProps } from 'sonner'
import { Toast } from './Toast'
import type { ToastProps } from './Toast'

type ToastType = NonNullable<ToastProps['type']>

export interface ShowToastOptions {
  /** 두 번째 줄 서브 텍스트 */
  description?: string
  /** 표시 시간(ms). 기본 3000 */
  duration?: number
  /** 같은 id로 다시 띄우면 새로 쌓지 않고 기존 토스트를 교체 */
  id?: string | number
}

function show(type: ToastType, message: string, options: ShowToastOptions = {}) {
  const { description, duration, id } = options
  return sonnerToast.custom(
    // 알림 읽기는 Sonner 컨테이너(aria-live)가 담당하므로 중복되지 않게 role을 뺀다
    () => <Toast type={type} message={message} description={description} role={undefined} />,
    { duration, id },
  )
}

export const toast = {
  success: (message: string, options?: ShowToastOptions) => show('success', message, options),
  warning: (message: string, options?: ShowToastOptions) => show('warning', message, options),
  error: (message: string, options?: ShowToastOptions) => show('error', message, options),
  /** id를 넘기면 해당 토스트만, 없으면 모두 닫기 */
  dismiss: (id?: string | number) => sonnerToast.dismiss(id),
}

export type ToasterProps = SonnerToasterProps

/** 앱에 한 번만 렌더링한다 (예: 최상위 레이아웃) */
export function Toaster({ style, ...props }: ToasterProps) {
  return (
    <SonnerToaster
      position="bottom-center"
      duration={3000}
      // 배경이 반투명이라 겹쳐 쌓으면 뒤 토스트 글자가 비침 → 항상 펼쳐서 쌓는다
      expand
      visibleToasts={3}
      style={{ '--width': '320px', ...style } as React.CSSProperties}
      {...props}
    />
  )
}
