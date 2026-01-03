/**
 * 테마 유틸리티 함수
 * 테마에 따라 색상을 반환하는 헬퍼 함수
 */

export const getThemeColor = (colorKey: keyof typeof colorMap) => {
  return `var(--color-dark-${colorKey})`;
};

const colorMap = {
  50: '50',
  100: '100',
  200: '200',
  300: '300',
  400: '400',
  500: '500',
  600: '600',
  700: '700',
  800: '800',
  900: '900',
} as const;

