// src/components/Character/Character.tsx
import { forwardRef } from 'react'
import defaultImg from './images/default.png'
import pizza from './images/pizza.png'
import stop from './images/stop.png'
import pencil from './images/pencil.png'
import search from './images/search.png'
import cooking from './images/cooking.png'
import laptop from './images/laptop.png'

// Vite는 이미지 import를 문자열로, Next.js는 { src } 객체로 돌려주므로 둘 다 처리
type ImageImport = string | { src: string }
const toSrc = (img: ImageImport) => (typeof img === 'string' ? img : img.src)

export const characterPoses = {
  default: { src: defaultImg, alt: '또맛또 캐릭터' },
  pizza: { src: pizza, alt: '피자를 든 또맛또 캐릭터' },
  stop: { src: stop, alt: '금지 표지판을 든 또맛또 캐릭터' },
  pencil: { src: pencil, alt: '연필을 든 또맛또 캐릭터' },
  search: { src: search, alt: '돋보기를 든 또맛또 캐릭터' },
  cooking: { src: cooking, alt: '요리하는 또맛또 캐릭터' },
  laptop: { src: laptop, alt: '노트북을 하는 또맛또 캐릭터' },
} satisfies Record<string, { src: ImageImport; alt: string }>

export type CharacterPose = keyof typeof characterPoses

export interface CharacterProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  pose?: CharacterPose
  /** 가로·세로 크기(px). 원본은 400 (흰 배경 포함) */
  size?: number
}

export const Character = forwardRef<HTMLImageElement, CharacterProps>(function Character(
  { pose = 'default', size = 160, alt, ...rest },
  ref,
) {
  const data = characterPoses[pose]
  return (
    <img
      ref={ref}
      src={toSrc(data.src)}
      alt={alt ?? data.alt}
      width={size}
      height={size}
      {...rest}
    />
  )
})
