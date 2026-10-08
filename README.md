# ttomatto Design System

Figma에서 설계한 **ttomatto Design System**을 React 컴포넌트로 구현하고, Storybook으로 문서화한 프로젝트입니다.

> 디자이너가 디자인시스템의 코드 구현체까지 직접 관리하고 검증할 수 있다는 것을 보여주기 위해 만들었습니다.

**🔗 Storybook:** https://main--6ac5b687c58b0f9b4ba4fe91.chromatic.com

---

## 목표

1. **Storybook 구축** — Figma 컴포넌트를 실제로 동작하는 코드로 구현하고, 인터랙티브 카탈로그로 문서화
2. **Figma ↔ Code 토큰 연동** — Figma Variables와 코드 토큰이 1:1로 대응하는 변환 파이프라인 구축

## 토큰 파이프라인

```
Figma Variables
   ↓  (JSON으로 옮김)
src/tokens/*.json
   ↓  npm run build-tokens
src/styles/tokens.css   ← CSS Variables
   ↓  var(--token)
React 컴포넌트 (CSS Modules)
   ↓
Storybook → Chromatic 배포
```

토큰 값은 **JSON 한 곳에서만** 수정합니다. `tokens.css`는 스크립트가 자동으로 생성하므로 직접 수정하지 않습니다.
컴포넌트 CSS는 색상·간격·폰트 값을 직접 쓰지 않고 모두 `var(--token)`으로 참조하므로, 토큰을 바꾸면 전체 컴포넌트에 한 번에 반영됩니다.

## 디자인 토큰

| 파일 | 내용 | CSS 변수 예시 |
|---|---|---|
| `color.json` | **Primitive**: neutral, red, orange, yellow, green, blue (50–900), error (50·500–800)<br>**Semantic**: label, bg, border, state, primary/secondary/tertiary, transparent(20·84) | `--color-red-600`<br>`--color-primary-default` |
| `typography.json` | Pretendard / 굵기 400·500·600·700 / 크기 10–28px / 텍스트 스타일(heading, body) | `--font-size-16`<br>`--font-weight-bold` |
| `spacing.json` | 0–64px 스케일 | `--spacing-16` |
| `radius.json` | xs(4) · sm(8) · md(12) · lg(16) · xl(20) · full | `--radius-md` |
| `shadow.json` | raised(카드) · floating(바텀시트·드롭다운) · toast · modal | `--shadow-floating` |
| `grid.json` | 모바일 그리드 (320–430px, 4칼럼 · 거터 16 · 마진 20) | `--grid-mobile-columns` |

컬러는 **Primitive → Semantic** 2단계 구조입니다. 컴포넌트는 Semantic 토큰(`primary`, `label`, `bg` 등)만 사용하므로, 브랜드 컬러를 바꿀 때 Semantic 값만 수정하면 됩니다.

## 컴포넌트

| 컴포넌트 | 주요 옵션 |
|---|---|
| **Logo** | `type`: wordmark · symbol · horizontal · vertical / `variant`: color · simple(단색, `color`로 색 지정) / `height`, `label` |
| **BrandIcon** | `name`(가게 필터·태그 아이콘 32종), `size`, `label` — 브랜드 컬러가 들어간 일러스트 아이콘 |
| **Character** | `pose`: default · pizza · stop · pencil · search · cooking · laptop / `size`(기본 160) — `<img>`로 렌더링 |
| **Icon** | `name`(아이콘 50종), `size`, `label` — 색은 `color`(currentColor)로 지정 |
| **Button** | `variant`: primary · secondary · tertiary / `size`: small(36) · medium(44) · large(48) / `leftIcon`, `rightIcon`, `loading`, `disabled` |
| **ButtonStack** | `direction`: horizontal · vertical / `padded`(화면 하단용 여백) |
| **TextField** | `label`, `required`, `optional`, `size`: medium · large / `rightIcon`, `error`, `success`, `helperText`, `disabled` |
| **TextArea** | `label`, `maxLength` + `showCount`(글자 수), `error`, `success`, `helperText`, `disabled` |
| **SelectField** | `options`(옵션별 `description` 가능), `size`: medium · large / `required`, `optional`, `error`, `helperText`, `disabled` |
| **SearchField** | `label`, `size`: medium · large / 클리어 버튼(`onClear`), `error`, `helperText`, `disabled` |
| **Checkbox** | `checked`, `label`, `disabled` |
| **Radio** | `checked`, `label`, `name`, `value`, `disabled` |
| **Option** · **OptionGroup** | `type`: check · radio · text · text2 / `label`, `subText`, `selected`, `disabled` — 목록은 `OptionGroup`(`maxHeight`)으로 감쌈 |
| **Chip** | `size`: small · medium · large / `leftIcon`, `selected`, 삭제(`onClose`), `disabled` |
| **ProgressBar** | `value`(0–100), `showLabel` |
| **Toast** | `type`: success · warning · error / `message`, `description`(서브 텍스트), `icon` — 화면에 띄울 때는 `toast.success()` 등 사용 (아래 참고) |
| **Modal** | `isOpen`, `title`(있으면 헤더와 닫기 버튼 표시), `footer`, `onClose` |
| **BottomSheet** | `isOpen`, `title`, `footer`, `onClose` |
| **BottomNavigation** | `value`, `onChange`, `items`(기본: 홈·피드·그룹·마이), 가운데 + 버튼(`onFabClick`) |

### 공통 규칙

- 모든 컴포넌트는 `className`을 받아 루트 요소에 덧붙입니다. (Modal·BottomSheet는 패널에 적용)
- Modal·BottomSheet를 제외한 컴포넌트는 `ref`를 전달할 수 있습니다.
- Button, TextField, TextArea, SearchField, Checkbox, Radio, Chip, Option, ProgressBar, Toast는 해당 HTML 요소의 기본 속성(`type`, `name`, `aria-*`, `onBlur` 등)을 그대로 받습니다.
- Button의 기본 `type`은 `button`입니다. 폼 제출에는 `type="submit"`을 지정하세요.
- 입력 컴포넌트는 제어(`value`/`checked`)와 비제어(`defaultValue`/`defaultChecked`) 방식을 모두 지원합니다. Radio는 제어 방식만 지원합니다.
- `onChange` 형태:
  - TextField, TextArea, SearchField, Checkbox, Radio → 네이티브 이벤트 (`e.target.value`, `e.target.checked`). react-hook-form의 `register()`와 바로 연결됩니다.
  - SelectField → 선택된 값(`string`)
- SearchField를 제어 방식으로 쓸 때는 `onClear`에서 값을 직접 비워야 합니다.

### 접근성·키보드 동작

- **Modal · BottomSheet**: `document.body`에 portal로 렌더링됩니다. 열리면 첫 번째 버튼으로 포커스가 이동하고, Tab 포커스가 패널 안에 갇히며, ESC로 닫힙니다. 닫히면 연 버튼으로 포커스가 돌아가고, 열려 있는 동안 배경 스크롤이 잠깁니다. `title`이 없으면 `aria-label`을 지정하세요.
- **SelectField**: ↑↓로 이동, Home/End, Enter·Space로 선택, ESC·Tab으로 닫기. Modal 안에서 ESC를 누르면 드롭다운만 닫힙니다.
- **Chip**: `onClick`이 있으면 Tab으로 포커스되고 Enter·Space로 동작하며, `selected`가 `aria-pressed`로 전달됩니다.
- **Checkbox · Radio · Chip · SelectField**: 키보드 포커스 시 포커스 링이 표시됩니다.

## 서비스에 적용하기

이 디자인 시스템은 npm 패키지가 아니라 **코드를 서비스 저장소에 복사해서** 사용합니다. 컴포넌트 문서는 위 Storybook 링크를 참고하세요.

**요구 사항:** React 18 이상, CSS Modules 지원 (Vite · Next.js 기본 지원)

**필요한 패키지:** `sonner` (Toast를 화면에 띄울 때 사용) — `npm install sonner`

### 1. 파일 복사

| 이 저장소 | 서비스 저장소 (예시) |
|---|---|
| `src/components/` 전체 (`shared/` 포함) | `src/components/` |
| `src/styles/tokens.css` | `src/styles/tokens.css` |

`*.stories.tsx` 파일은 서비스에서 필요 없으면 지워도 됩니다.

### 2. 토큰 CSS 불러오기

앱 진입점(예: `main.tsx`, Next.js는 `app/layout.tsx`)에서 한 번만 import합니다.

```ts
import './styles/tokens.css'
```

### 3. Pretendard 폰트 불러오기

`tokens.css`는 폰트 이름(`--font-family: Pretendard`)만 지정하고 폰트 파일은 불러오지 않습니다. 서비스에서 이미 Pretendard를 쓰고 있다면 이 단계는 건너뜁니다.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
```

npm 패키지(`pretendard`)나 `next/font/local`로 불러와도 됩니다.

### 4. 사용

```tsx
import { Button } from '@/components/Button'

<Button variant="primary" type="submit">저장</Button>
```

### 5. Toast 띄우기

앱 최상위(예: `App.tsx`, Next.js는 `app/layout.tsx`)에 `<Toaster />`를 **한 번만** 넣고, 어디서든 `toast`를 호출합니다.

```tsx
import { Toaster, toast } from '@/components/Toast'

// 최상위 레이아웃
<Toaster />

// 필요한 곳에서
toast.success('저장되었습니다.')
toast.warning('저장 공간이 부족합니다.', { description: '불필요한 파일을 정리해 주세요.' })
toast.error('저장에 실패했습니다.', { duration: 5000 })
toast.dismiss()  // 모두 닫기
```

- 기본값: 화면 하단 가운데, 3초 후 자동으로 사라짐, 최대 3개까지 펼쳐서 쌓임
- 위치·시간은 `<Toaster position="top-center" duration={5000} />`처럼 바꿀 수 있습니다. ([Sonner 옵션](https://sonner.emilkowal.ski/toaster))
- 같은 `id`로 다시 호출하면 새로 쌓지 않고 기존 토스트를 교체합니다.

### Next.js를 쓰는 경우

별도 수정 없이 App Router에서 그대로 사용할 수 있습니다. (Next.js 15 · React 18에서 전체 컴포넌트의 빌드·서버 렌더링·브라우저 동작 확인)

- **`'use client'`**: 상태·이벤트를 가진 컴포넌트(TextField, TextArea, Checkbox, SearchField, SelectField, Chip, Modal, BottomSheet, BottomNavigation)에는 이미 들어 있습니다. Button, ButtonStack, Icon, Option, Radio, ProgressBar, Toast는 서버 컴포넌트에서도 바로 쓸 수 있습니다.
- **지원 브라우저**: iOS Safari 14.1 이상, Chrome·Edge 84 이상. BottomNavigation의 반투명·흐림 배경은 지원하지 않는 브라우저에서 불투명한 흰 배경으로 바뀌고, 선택 배경은 `bg-selected` 색으로 대신 표시됩니다.
- **Modal · BottomSheet**: 서버 렌더링 중에는 그리지 않고, 브라우저에 마운트된 뒤 portal로 그립니다. `isOpen={true}`로 시작해도 됩니다.
- **Toast 아이콘**: SVG import가 문자열(Vite)이든 `{ src }` 객체(Next.js)든 모두 처리합니다. 단, SVGR처럼 SVG를 React 컴포넌트로 바꾸는 로더를 설정한 프로젝트라면 `Toast/assets`의 SVG는 URL로 불러오도록 예외 처리가 필요합니다.

### 디자인이 바뀌었을 때

토큰과 컴포넌트의 원본은 이 저장소입니다. 이곳에서 수정·검증한 뒤, 바뀐 파일을 서비스 저장소에 다시 복사합니다. 커밋 기록에서 어떤 파일이 바뀌었는지 확인할 수 있습니다.

## 기술 스택

- React 18 · TypeScript · Vite
- Storybook 8
- CSS Modules + CSS Variables
- Chromatic (Storybook 배포 · 비주얼 회귀 테스트)

## 폴더 구조

```
src/
├── tokens/              # 디자인 토큰 원본 (JSON)
├── scripts/
│   └── build-tokens.js  # JSON → CSS Variables 변환
├── styles/
│   └── tokens.css       # 자동 생성 (직접 수정 X)
├── docs/                # Storybook 문서 페이지 (Introduction, Foundations) — 서비스에 복사하지 않음
└── components/
    ├── shared/          # 공통 도구: cx(className 조합), useControllableState, useDialog, Field(라벨·도움말·입력 상자), DialogHeader
    └── Button/
        ├── Button.tsx
        ├── Button.module.css
        ├── Button.stories.tsx
        └── index.ts
```

## 실행 방법

```bash
npm install --legacy-peer-deps

npm run storybook      # 로컬 Storybook (http://localhost:6006)
npm run build-tokens   # 토큰 JSON 수정 후 tokens.css 재생성
npm run chromatic      # 수동 배포가 필요할 때만 (CHROMATIC_PROJECT_TOKEN 환경변수 필요)
```

main에 push하거나 PR을 만들면 GitHub Actions(`.github/workflows/chromatic.yml`)가 Storybook을 Chromatic에 자동 배포합니다. 토큰은 저장소 Secrets의 `CHROMATIC_PROJECT_TOKEN`에 들어 있습니다.

## 작업 흐름 예시: 메인 컬러 변경

1. `src/tokens/color.json`에서 `semantic.primary` 값을 수정 (예: red-600 → orange-600)
2. `npm run build-tokens`로 `tokens.css` 재생성
3. 커밋 후 main에 push → 자동 배포
4. Chromatic에서 변경된 컴포넌트의 Before/After를 확인하고 **Accept**
