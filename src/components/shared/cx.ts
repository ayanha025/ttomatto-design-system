// src/components/shared/cx.ts

/** 값이 있는 className만 공백으로 이어 붙인다: cx(styles.a, isOn && styles.b, className) */
export function cx(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ')
}
