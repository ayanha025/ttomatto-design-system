// src/docs/TokenBlocks.tsx
// Storybook 문서(Foundations, Introduction)에서 쓰는 토큰 시각화 블록.
// build-tokens가 만든 src/styles/tokens.json(Figma 변수 경로 · CSS 변수 · 참조 · 최종 값)을 읽고,
// 견본은 실제 CSS 변수(tokens.css)로 그린다.
import { useState } from 'react'
import generated from '../styles/tokens.json'
import styles from './TokenBlocks.module.css'

type Collection = 'Primitive' | 'Theme' | 'Semantic'
type Token = {
  collection: Collection
  figma: string
  cssVar: string
  ref: string | null
  value: string
}

const variables = generated.variables as Token[]
const byFigma = Object.fromEntries(variables.map(t => [t.figma, t]))

/** collection 안에서 Figma 경로가 prefix로 시작하는 변수 */
const pick = (collection: Collection, prefix: string) =>
  variables.filter(t => t.collection === collection && t.figma.startsWith(prefix))

/** prefix 바로 다음 단계로 묶기 (Color/label/primary → label) */
function groupBy(list: Token[], prefix: string) {
  const groups = new Map<string, Token[]>()
  for (const t of list) {
    const key = t.figma.slice(prefix.length).split('/')[0]
    groups.set(key, [...(groups.get(key) ?? []), t])
  }
  return [...groups]
}

const leaf = (t: Token, prefix: string) => t.figma.slice(prefix.length).split('/').slice(1).join('/')

/** 참조 표시: Color/primary/600 → primary/600 */
const shortRef = (ref: string) => ref.split('/').slice(1).join('/')

function Swatch({ name, token }: { name: string; token: Token }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`var(${token.cssVar})`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      // 클립보드 권한이 없으면 무시
    }
  }

  return (
    <button type="button" className={styles.swatch} onClick={copy} title={`클릭해서 var(${token.cssVar}) 복사`}>
      <div className={styles.chip}>
        <div className={styles.chipFill} style={{ background: `var(${token.cssVar})` }} />
      </div>
      <div className={styles.swatchMeta}>
        <span className={styles.swatchName}>{name}</span>
        {token.ref && <span className={styles.ref}>→ {shortRef(token.ref)}</span>}
        <span className={styles.code}>{token.value}</span>
        <span className={`${styles.code} ${copied ? styles.copied : ''}`}>
          {copied ? '복사됨' : token.cssVar}
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

// Color -----------------------------------------------------------------------

const semanticDescriptions: Record<string, string> = {
  primary: '브랜드 메인 컬러. 주요 버튼, 선택 상태, 강조 요소',
  secondary: '보조 버튼과 어두운 강조 요소',
  tertiary: '약한 버튼과 칩 배경',
  label: '텍스트 색상',
  bg: '배경 색상',
  border: '테두리 색상. interactive는 입력 요소의 포커스·호버 상태',
  state: '성공·경고·에러·정보 상태 표시',
}

const themeDescriptions: Record<string, string> = {
  primary: '브랜드 메인 팔레트 → Primitive red',
  secondary: '보조 팔레트 → Primitive neutral',
}

function ColorGroups({
  collection,
  layout,
  descriptions = {},
}: {
  collection: Collection
  layout: 'palette' | 'semantic'
  descriptions?: Record<string, string>
}) {
  const prefix = 'Color/'
  return (
    <>
      {groupBy(pick(collection, prefix), prefix).map(([group, tokens]) => (
        <Section key={group} title={group} description={descriptions[group]}>
          <div className={layout === 'palette' ? styles.paletteRow : styles.semanticGrid}>
            {tokens.map(t => (
              <Swatch key={t.figma} name={leaf(t, prefix)} token={t} />
            ))}
          </div>
        </Section>
      ))}
    </>
  )
}

export const PrimitiveColors = () => <ColorGroups collection="Primitive" layout="palette" />
export const ThemeColors = () => <ColorGroups collection="Theme" layout="palette" descriptions={themeDescriptions} />
export const SemanticColors = () => (
  <ColorGroups collection="Semantic" layout="semantic" descriptions={semanticDescriptions} />
)

// 공통 표 ----------------------------------------------------------------------

/** Figma 변수 · CSS 변수 · 참조 · 값 표. preview로 견본 칸을 추가할 수 있다. */
function VariableTable({
  tokens,
  preview,
  previewLabel,
}: {
  tokens: Token[]
  preview?: (t: Token) => React.ReactNode
  previewLabel?: string
}) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Figma 변수</th>
          <th>CSS 변수</th>
          <th>참조</th>
          <th>값</th>
          {preview && <th style={{ width: '30%' }}>{previewLabel}</th>}
        </tr>
      </thead>
      <tbody>
        {tokens.map(t => (
          <tr key={t.figma}>
            <td>{t.figma}</td>
            <td><span className={styles.code}>{t.cssVar}</span></td>
            <td>{t.ref ? <span className={styles.code}>{byFigma[t.ref].cssVar}</span> : '—'}</td>
            <td>{t.value}</td>
            {preview && <td>{preview(t)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// Typography ------------------------------------------------------------------

export function TypeStyles() {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>텍스트 스타일</th>
          <th>예시</th>
          <th>크기 / 행간</th>
          <th>굵기</th>
          <th>CSS 변수</th>
        </tr>
      </thead>
      <tbody>
        {generated.textStyles.map(s => (
          <tr key={s.name}>
            <td>{s.name}</td>
            <td>
              <p
                className={styles.sample}
                style={{
                  fontFamily: 'var(--font-family)',
                  fontSize: `var(${s.fontSize})`,
                  lineHeight: `var(${s.lineHeight})`,
                  fontWeight: `var(${s.fontWeight})`,
                  letterSpacing: 'var(--letter-spacing)',
                }}
              >
                디자인 시스템 Aa 123
              </p>
            </td>
            <td>{s.size} / {s.leading}</td>
            <td>{s.weight}</td>
            <td>
              <span className={styles.code}>{s.fontSize}</span>{' '}
              <span className={styles.code}>{s.lineHeight}</span>{' '}
              <span className={styles.code}>{s.fontWeight}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export const SemanticTypeTokens = () => <VariableTable tokens={pick('Semantic', 'Typography/')} />
export const PrimitiveTypeTokens = () => <VariableTable tokens={pick('Primitive', 'Typography/')} />

// Number (Spacing · Radius · Border width) -----------------------------------

export function SpacingScale() {
  return (
    <VariableTable
      tokens={pick('Semantic', 'Appearance/spacing/')}
      previewLabel="크기"
      preview={t => <div className={styles.spacingBar} style={{ width: `var(${t.cssVar})` }} />}
    />
  )
}

export const NumberUnits = () => <VariableTable tokens={pick('Primitive', 'Number/')} />

export function RadiusScale() {
  return (
    <VariableTable
      tokens={pick('Semantic', 'Appearance/border/radius/')}
      previewLabel="모양"
      preview={t => <div className={styles.radiusBox} style={{ borderRadius: `var(${t.cssVar})` }} />}
    />
  )
}

export function BorderWidthScale() {
  return (
    <VariableTable
      tokens={pick('Semantic', 'Appearance/border/width/')}
      previewLabel="모양"
      preview={t => (
        <div className={styles.radiusBox} style={{ border: `var(${t.cssVar}) solid var(--color-border-primary)` }} />
      )}
    />
  )
}

// Shadow ----------------------------------------------------------------------

const shadowUsage: Record<string, string> = {
  '1_raised': '리뷰 카드 · 가게 카드 · 그룹 카드',
  '2_floating': '바텀시트 · 드롭다운',
  '3_toast': '토스트 · 스낵바',
  '4_modal': '모달 · 다이얼로그',
}

export function ShadowScale() {
  return (
    <table className={styles.table}>
      <thead>
        <tr><th>Effect 스타일</th><th>CSS 변수</th><th>값</th><th>색상 변수</th><th>사용처</th><th>모양</th></tr>
      </thead>
      <tbody>
        {generated.effectStyles.map(e => (
          <tr key={e.name}>
            <td>{e.name}</td>
            <td><span className={styles.code}>{e.cssVar}</span></td>
            <td><span className={styles.code}>{e.value}</span></td>
            <td>{e.colorRef ? <span className={styles.code}>{byFigma[e.colorRef].cssVar}</span> : '—'}</td>
            <td>{shadowUsage[e.name]}</td>
            <td>
              <div className={styles.shadowStage}>
                <div className={styles.shadowBox} style={{ boxShadow: `var(${e.cssVar})` }} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// Layout Grid -----------------------------------------------------------------

export function LayoutGrid() {
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr><th>Grid 스타일</th><th>화면 너비</th><th>칼럼</th><th>거터</th><th>마진</th><th>CSS 변수</th></tr>
        </thead>
        <tbody>
          {generated.gridStyles.map(g => {
            const n = g.name.toLowerCase()
            return (
              <tr key={g.name}>
                <td>{g.name}</td>
                <td>{g.breakpoint}</td>
                <td>{g.columns}</td>
                <td>{g.gutter}px</td>
                <td>{g.margin}px</td>
                <td>
                  <span className={styles.code}>--grid-{n}-columns</span>{' '}
                  <span className={styles.code}>--grid-{n}-gutter</span>{' '}
                  <span className={styles.code}>--grid-{n}-margin</span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {generated.gridStyles.map(g => (
        <div key={g.name} className={styles.gridStage}>
          <div className={styles.gridColumns}>
            {Array.from({ length: g.columns }, (_, i) => <div key={i} className={styles.gridColumn} />)}
          </div>
          <p className={styles.gridCaption}>
            {g.columns} columns · {g.gutter}px gutter · {g.margin}px margin
          </p>
        </div>
      ))}
    </>
  )
}

// Introduction용 --------------------------------------------------------------

const componentModules = import.meta.glob('../components/*/index.ts')
const componentCount = Object.keys(componentModules).length
const countIn = (collection: Collection) => variables.filter(t => t.collection === collection).length

export function Stats() {
  const stats = [
    { value: componentCount, label: '컴포넌트' },
    { value: countIn('Primitive'), label: 'Primitive 변수' },
    { value: countIn('Theme'), label: 'Theme 변수' },
    { value: countIn('Semantic'), label: 'Semantic 변수' },
    { value: generated.textStyles.length, label: '텍스트 스타일' },
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
    { title: 'Figma Variables', desc: 'Primitive → Theme → Semantic' },
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
