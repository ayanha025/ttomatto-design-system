// Figma 변수 구조(Primitive → Theme → Semantic)를 그대로 옮긴 토큰 JSON을 CSS 변수로 변환한다.
// - 별칭(`{Color/red/50}`)은 값을 복사하지 않고 var(--color-red-50)로 연결해, CSS에서도 참조 구조가 유지된다.
// - 결과: src/styles/tokens.css (CSS 변수), src/styles/tokens.json (Storybook 문서용 목록)
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const tokensDir = resolve(__dirname, '../tokens')
const outputDir = resolve(__dirname, '../styles')

const read = name => JSON.parse(readFileSync(resolve(tokensDir, name), 'utf-8'))
const collections = [
  ['Primitive', read('primitive.json')],
  ['Theme', read('theme.json')],
  ['Semantic', read('semantic.json')],
]
const styles = read('styles.json')

// 중첩 JSON → [Figma 경로, 값] 목록 ($로 시작하는 키는 설명이므로 건너뜀)
function flatten(obj, prefix = []) {
  return Object.entries(obj).flatMap(([key, value]) => {
    if (key.startsWith('$')) return []
    const path = [...prefix, key]
    return value !== null && typeof value === 'object' ? flatten(value, path) : [[path, value]]
  })
}

const kebab = parts => parts.map(p => String(p).toLowerCase().replace(/\s+/g, '-')).join('-')

// Figma 변수 경로 → CSS 변수 이름
function cssName(collection, path) {
  const [group, ...rest] = path
  if (group === 'Color') return `--color-${kebab(rest)}`
  if (group === 'Number') return `--${kebab(rest)}` // Number/unit/4 → --unit-4
  if (group === 'Appearance') {
    // Appearance/spacing/4 → --spacing-4, Appearance/border/radius/md → --radius-md
    const name = kebab(rest)
    return `--${name.replace(/^border-radius-/, 'radius-')}`
  }
  if (group === 'Typography') {
    if (collection === 'Primitive' && rest[0] === 'font weight') {
      // Semantic의 --font-weight-bold와 겹치지 않도록 Primitive는 숫자로 표기
      return `--font-weight-${primitiveValue(path)}`
    }
    if (collection === 'Semantic' && ['bold', 'medium', 'regular'].includes(rest[0])) {
      return `--font-weight-${rest[0]}`
    }
    return `--${kebab(rest)}` // font size/14 → --font-size-14, Heading/xl/font size → --heading-xl-font-size
  }
  throw new Error(`이름 규칙이 없는 토큰: ${collection} ${path.join('/')}`)
}

// 숫자 값에 단위 붙이기
function formatValue(path, value) {
  if (typeof value !== 'number') return value
  const isWeight = path.includes('font weight') || ['bold', 'medium', 'regular'].includes(path[1])
  return isWeight ? String(value) : `${value}px`
}

// 전체 변수 테이블: Figma 경로 → 정보
const table = new Map()
const order = []
for (const [collection, data] of collections) {
  for (const [path, value] of flatten(data)) {
    const figma = path.join('/')
    if (table.has(figma)) throw new Error(`중복된 Figma 변수: ${figma}`)
    table.set(figma, { collection, figma, path, raw: value })
    order.push(figma)
  }
}

const aliasOf = value => (typeof value === 'string' && /^\{.+\}$/.test(value) ? value.slice(1, -1) : null)

function primitiveValue(path) {
  return data(path.join('/')).raw
}
function data(figma) {
  const token = table.get(figma)
  if (!token) throw new Error(`존재하지 않는 변수를 참조: ${figma}`)
  return token
}

// 최종 값(별칭을 끝까지 따라감)
function resolveValue(figma, seen = []) {
  if (seen.includes(figma)) throw new Error(`순환 참조: ${[...seen, figma].join(' → ')}`)
  const token = data(figma)
  const ref = aliasOf(token.raw)
  return ref ? resolveValue(ref, [...seen, figma]) : formatValue(token.path, token.raw)
}

const tokens = order.map(figma => {
  const token = table.get(figma)
  const ref = aliasOf(token.raw)
  if (ref) data(ref) // 참조 대상이 있는지 검사
  return {
    collection: token.collection,
    figma,
    cssVar: cssName(token.collection, token.path),
    ref,
    value: resolveValue(figma),
  }
})

const byFigma = Object.fromEntries(tokens.map(t => [t.figma, t]))
const cssValue = t => {
  if (!t.ref) return t.value
  const target = `var(${byFigma[t.ref].cssVar})`
  // 폰트 패밀리는 대체 글꼴을 붙여 쓴다
  return t.figma === 'Typography/font family' ? `${target}, sans-serif` : target
}

const cssNames = new Set()
for (const t of tokens) {
  if (cssNames.has(t.cssVar)) throw new Error(`CSS 변수 이름 충돌: ${t.cssVar}`)
  cssNames.add(t.cssVar)
}

// 스타일 (Text · Effect · Grid)
const textStyles = Object.entries(styles.text).map(([name, s]) => {
  const prefix = kebab(s.size.split('/'))
  return {
    name,
    fontSize: `--${prefix}-font-size`,
    lineHeight: `--${prefix}-line-height`,
    fontWeight: `--font-weight-${s.weight}`,
    size: resolveValue(`Typography/${s.size}/font size`),
    leading: resolveValue(`Typography/${s.size}/line height`),
    weight: resolveValue(`Typography/${s.weight}`),
  }
})

const effectStyles = Object.entries(styles.effect).map(([name, e]) => {
  const colorRef = aliasOf(e.color)
  const color = colorRef ? byFigma[colorRef] : null
  const px = n => (n === 0 ? '0' : `${n}px`)
  const geometry = [e.x, e.y, e.blur, e.spread].map(px).join(' ')
  return {
    name,
    cssVar: `--shadow-${name.replace(/^\d+_/, '')}`,
    css: `${geometry} ${color ? `var(${color.cssVar})` : e.color}`,
    value: `${geometry} ${color ? color.value : e.color}`,
    colorRef,
  }
})

const gridStyles = Object.entries(styles.grid).map(([name, g]) => ({ name, ...g }))

// === tokens.css ===
const lines = ['/* 자동 생성 파일: src/tokens/*.json을 수정한 뒤 npm run build-tokens를 실행하세요. */', ':root {']
const section = (title, list) => {
  lines.push(`  /* ${title} */`)
  for (const t of list) lines.push(`  ${t.cssVar}: ${cssValue(t)};`)
  lines.push('')
}
for (const [collection] of collections) {
  const inCollection = tokens.filter(t => t.collection === collection)
  for (const group of ['Color', 'Typography', 'Number', 'Appearance']) {
    const list = inCollection.filter(t => t.figma.startsWith(`${group}/`))
    if (list.length) section(`${collection} / ${group}`, list)
  }
}
lines.push('  /* Effect styles */')
for (const e of effectStyles) lines.push(`  ${e.cssVar}: ${e.css};`)
lines.push('')
lines.push('  /* Grid styles */')
for (const g of gridStyles) {
  const n = kebab([g.name])
  lines.push(`  --grid-${n}-columns: ${g.columns};`)
  lines.push(`  --grid-${n}-gutter: ${g.gutter}px;`)
  lines.push(`  --grid-${n}-margin: ${g.margin}px;`)
}
lines.push('}', '')

mkdirSync(outputDir, { recursive: true })
writeFileSync(resolve(outputDir, 'tokens.css'), lines.join('\n'), 'utf-8')
writeFileSync(
  resolve(outputDir, 'tokens.json'),
  JSON.stringify({ variables: tokens, textStyles, effectStyles, gridStyles }, null, 2) + '\n',
  'utf-8',
)
console.log(`tokens.css, tokens.json generated at: ${outputDir} (${tokens.length} variables)`)
