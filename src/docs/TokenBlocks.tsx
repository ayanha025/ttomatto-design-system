// src/docs/TokenBlocks.tsx
// Storybook 문서(Foundations, Introduction)에서 쓰는 토큰 시각화 블록.
// 값은 토큰 JSON에서 읽고, 견본은 실제 CSS 변수(tokens.css)로 그린다.
import { useState } from 'react'
import color from '../tokens/color.json'
import typography from '../tokens/typography.json'
import spacing from '../tokens/spacing.json'
import radius from '../tokens/radius.json'
import shadow from '../tokens/shadow.json'
import styles from './TokenBlocks.module.css'

// build-tokens.js와 같은 규칙으로 CSS 변수 이름을 만든다
const primitiveVar = (group: string, name: string) =>
  group === 'base' ? `--color-base-${name}` : `--color-${group}-${name}`
const semanticVar = (group: string, name: string) => `--color-${group}-${name}`

function Swatch({ name, cssVar, value }: { name: string; cssVar: string; value: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`var(${cssVar})`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      // 클립보드 권한이 없으면 무시
    }
  }

  return (
    <button type="button" className={styles.swatch} onClick={copy} title={`클릭해서 var(${cssVar}) 복사`}>
      <div className={styles.chip}>
        <div className={styles.chipFill} style={{ background: `var(${cssVar})` }} />
      </div>
      <div className={styles.swatchMeta}>
        <span className={styles.swatchName}>{name}</span>
        <span className={styles.code}>{value}</span>
        <span className={`${styles.code} ${copied ? styles.copied : ''}`}>
          {copied ? '복사됨' : cssVar}
        </span>
      </div>
    </button>
  )
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      {description && <p className={styles.sectionDesc}>{description}</p>}
      {children}
    </section>
  )
}

const semanticDescriptions: Record<string, string> = {
  primary: '브랜드 메인 컬러. 주요 버튼, 선택 상태, 강조 요소',
  secondary: '보조 버튼과 어두운 강조 요소',
  tertiary: '약한 버튼과 칩 배경',
  label: '텍스트 색상',
  bg: '배경 색상',
  border: '테두리 색상. interactive는 입력 요소의 포커스·호버 상태',
  state: '성공·경고·에러·정보 상태 표시',
  transparent: '오버레이, 토스트처럼 뒤가 비치는 배경',
}

// 브랜드 컬러가 먼저 보이도록 정렬 (목록에 없는 그룹은 뒤에 붙음)
const semanticOrder = ['primary', 'secondary', 'tertiary', 'label', 'bg', 'border', 'state', 'transparent']
const semanticGroups = Object.entries(color.semantic).sort(
  ([a], [b]) => (semanticOrder.indexOf(a) + 1 || 99) - (semanticOrder.indexOf(b) + 1 || 99),
)

export function SemanticColors() {
  return (
    <>
      {semanticGroups.map(([group, tokens]) => (
        <Section key={group} title={group} description={semanticDescriptions[group]}>
          <div className={styles.semanticGrid}>
            {Object.entries(tokens).map(([name, value]) => (
              <Swatch key={name} name={name} cssVar={semanticVar(group, name)} value={value} />
            ))}
          </div>
        </Section>
      ))}
    </>
  )
}

export function PrimitiveColors() {
  return (
    <>
      {Object.entries(color.primitive).map(([group, shades]) => (
        <Section key={group} title={group}>
          <div className={styles.paletteRow}>
            {Object.entries(shades).map(([name, value]) => (
              <Swatch key={name} name={name} cssVar={primitiveVar(group, name)} value={value} />
            ))}
          </div>
        </Section>
      ))}
    </>
  )
}

export function TypeStyles() {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>이름</th>
          <th>예시</th>
          <th>크기 / 행간</th>
          <th>굵기</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(typography.styles).map(([name, style]) => (
          <tr key={name}>
            <td><span className={styles.code}>{name}</span></td>
            <td>
              <p
                className={styles.sample}
                style={{
                  fontFamily: 'var(--font-family)',
                  fontSize: style.fontSize,
                  lineHeight: style.lineHeight,
                  fontWeight: Number(style.fontWeight),
                  letterSpacing: 'var(--letter-spacing)',
                }}
              >
                디자인 시스템 Aa 123
              </p>
            </td>
            <td>{style.fontSize} / {style.lineHeight}</td>
            <td>{style.fontWeight}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function TypeTokens() {
  const rows = [
    ['--font-family', `${typography.fontFamily}, sans-serif`],
    ['--letter-spacing', typography.letterSpacing],
    ...Object.entries(typography.fontWeight).map(([k, v]) => [`--font-weight-${k}`, String(v)]),
    ...Object.entries(typography.fontSize).map(([k, v]) => [`--font-size-${k}`, v]),
    ...Object.entries(typography.lineHeight).map(([k, v]) => [`--line-height-${k}`, v]),
  ]
  return (
    <table className={styles.table}>
      <thead>
        <tr><th>CSS 변수</th><th>값</th></tr>
      </thead>
      <tbody>
        {rows.map(([name, value]) => (
          <tr key={name}>
            <td><span className={styles.code}>{name}</span></td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function SpacingScale() {
  return (
    <table className={styles.table}>
      <thead>
        <tr><th>CSS 변수</th><th>값</th><th style={{ width: '50%' }}>크기</th></tr>
      </thead>
      <tbody>
        {Object.entries(spacing).map(([name, value]) => (
          <tr key={name}>
            <td><span className={styles.code}>--spacing-{name}</span></td>
            <td>{value}</td>
            <td><div className={styles.spacingBar} style={{ width: `var(--spacing-${name})` }} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function RadiusScale() {
  return (
    <table className={styles.table}>
      <thead>
        <tr><th>CSS 변수</th><th>값</th><th>모양</th></tr>
      </thead>
      <tbody>
        {Object.entries(radius).map(([name, value]) => (
          <tr key={name}>
            <td><span className={styles.code}>--radius-{name}</span></td>
            <td>{value}</td>
            <td><div className={styles.radiusBox} style={{ borderRadius: `var(--radius-${name})` }} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function ShadowScale() {
  return (
    <table className={styles.table}>
      <thead>
        <tr><th>CSS 변수</th><th>값</th><th>모양</th></tr>
      </thead>
      <tbody>
        {Object.entries(shadow).map(([name, value]) => (
          <tr key={name}>
            <td><span className={styles.code}>--shadow-{name}</span></td>
            <td><span className={styles.code}>{value}</span></td>
            <td>
              <div className={styles.shadowStage}>
                <div className={styles.shadowBox} style={{ boxShadow: `var(--shadow-${name})` }} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// Introduction용 --------------------------------------------------------------

const componentModules = import.meta.glob('../components/*/index.ts')
const componentCount = Object.keys(componentModules).length

const countColors = () =>
  Object.values(color.primitive).reduce((n, g) => n + Object.keys(g).length, 0) +
  Object.values(color.semantic).reduce((n, g) => n + Object.keys(g).length, 0)

export function Stats() {
  const stats = [
    { value: componentCount, label: '컴포넌트' },
    { value: countColors(), label: '컬러 토큰 (Primitive + Semantic)' },
    { value: Object.keys(typography.styles).length, label: '텍스트 스타일' },
    { value: Object.keys(spacing).length, label: '간격 토큰' },
    { value: Object.keys(radius).length + Object.keys(shadow).length, label: '라운딩 · 그림자 토큰' },
  ]
  return (
    <div className={styles.stats}>
      {stats.map(s => (
        <div key={s.label} className={styles.stat}>
          <div className={styles.statValue}>{s.value}</div>
          <div className={styles.statLabel}>{s.label}</div>
        </div>
      ))}
    </div>
  )
}

export function Pipeline() {
  const steps = [
    { title: 'Figma Variables', desc: '디자인 원본' },
    { title: 'Token JSON', desc: 'src/tokens/*.json' },
    { title: 'build-tokens', desc: '변환 스크립트' },
    { title: 'CSS Variables', desc: 'tokens.css', highlight: true },
    { title: 'Components', desc: 'React + CSS Modules' },
    { title: 'Storybook', desc: 'Chromatic 배포 · 검토' },
  ]
  return (
    <div className={styles.pipeline}>
      {steps.map(step => (
        <div key={step.title} className={`${styles.step} ${step.highlight ? styles.stepHighlight : ''}`}>
          <span className={styles.stepTitle}>{step.title}</span>
          <span className={styles.stepDesc}>{step.desc}</span>
        </div>
      ))}
    </div>
  )
}
