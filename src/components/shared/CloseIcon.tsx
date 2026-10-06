// src/components/shared/CloseIcon.tsx

// 크기별로 디자인된 X 아이콘 경로 (20: Modal·BottomSheet, 14: Chip·SearchField)
const paths = {
  14: 'M4 4L10 10M10 4L4 10',
  20: 'M5 5L15 15M15 5L5 15',
}

export function CloseIcon({ size }: { size: keyof typeof paths }) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
      <path d={paths[size]} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
