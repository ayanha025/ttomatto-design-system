import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tokensDir = resolve(__dirname, '../tokens');
const outputDir = resolve(__dirname, '../styles');
const outputFile = resolve(outputDir, 'tokens.css');

// Read token files
const color = JSON.parse(readFileSync(resolve(tokensDir, 'color.json'), 'utf-8'));
const typography = JSON.parse(readFileSync(resolve(tokensDir, 'typography.json'), 'utf-8'));
const spacing = JSON.parse(readFileSync(resolve(tokensDir, 'spacing.json'), 'utf-8'));
const radius = JSON.parse(readFileSync(resolve(tokensDir, 'radius.json'), 'utf-8'));
const shadow = JSON.parse(readFileSync(resolve(tokensDir, 'shadow.json'), 'utf-8'));

const lines = [];

// 폰트 파일은 불러오지 않음: 사용하는 쪽(서비스, Storybook)에서 Pretendard를 로드
lines.push(':root {');

// === Color Primitive ===
lines.push('  /* Color-Primitive */');

// base
for (const [name, value] of Object.entries(color.primitive.base)) {
  lines.push(`  --color-base-${name}: ${value};`);
}

// color groups
for (const [group, shades] of Object.entries(color.primitive)) {
  if (group === 'base') continue;
  for (const [shade, value] of Object.entries(shades)) {
    lines.push(`  --color-${group}-${shade}: ${value};`);
  }
}

lines.push('');

// === Color Semantic ===
lines.push('  /* Color-Semantic */');

for (const [group, tokens] of Object.entries(color.semantic)) {
  for (const [name, value] of Object.entries(tokens)) {
    lines.push(`  --color-${group}-${name}: ${value};`);
  }
}

lines.push('');

// === Typography ===
lines.push('  /* Typography */');
lines.push(`  --font-family: ${typography.fontFamily}, sans-serif;`);

for (const [name, value] of Object.entries(typography.fontWeight)) {
  lines.push(`  --font-weight-${name}: ${value};`);
}

for (const [n, value] of Object.entries(typography.fontSize)) {
  lines.push(`  --font-size-${n}: ${value};`);
}

for (const [n, value] of Object.entries(typography.lineHeight)) {
  lines.push(`  --line-height-${n}: ${value};`);
}

lines.push(`  --letter-spacing: ${typography.letterSpacing};`);

lines.push('');

// === Spacing ===
lines.push('  /* Spacing */');
for (const [n, value] of Object.entries(spacing)) {
  lines.push(`  --spacing-${n}: ${value};`);
}

lines.push('');

// === Radius ===
lines.push('  /* Radius */');
for (const [name, value] of Object.entries(radius)) {
  lines.push(`  --radius-${name}: ${value};`);
}

lines.push('');

// === Shadow ===
lines.push('  /* Shadow */');
for (const [name, value] of Object.entries(shadow)) {
  lines.push(`  --shadow-${name}: ${value};`);
}

lines.push('}');
lines.push('');

// Ensure output directory exists
mkdirSync(outputDir, { recursive: true });

writeFileSync(outputFile, lines.join('\n'), 'utf-8');
console.log(`tokens.css generated at: ${outputFile}`);
