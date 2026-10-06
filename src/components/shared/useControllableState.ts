// src/components/shared/useControllableState.ts
import { useState } from 'react'

/**
 * 제어/비제어 모드를 함께 지원하는 상태
 * - value가 있으면(제어) 항상 그 값을 쓰고, setValue는 내부 상태를 바꾸지 않는다
 * - value가 없으면(비제어) defaultValue로 시작해 내부에서 관리한다
 */
export function useControllableState<T>(value: T | undefined, defaultValue: T) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const setValue = (next: T) => {
    if (!isControlled) setInternalValue(next)
  }

  return [currentValue, setValue] as const
}
