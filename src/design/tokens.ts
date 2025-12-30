/**
 * 디자인 토큰
 * 프로젝트 전반에서 사용되는 디자인 값들의 중앙 집중식 정의
 */

export const designTokens = {
  // 색상
  colors: {
    // Dark: 어두운 배경 및 텍스트
    dark: {
      50: '#ffffff',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#1a1a1a',
      900: '#000000',
    },
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    // Purple: 보라색 그라데이션 (LYNX 브랜드 색상)
    purple: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7e22ce',
      800: '#6b21a8',
      900: '#581c87',
    },
  },

  // 타이포그래피
  typography: {
    fontFamily: {
      sans: [
        'Pretendard',
        '-apple-system',
        'BlinkMacSystemFont',
        'system-ui',
        'Roboto',
        '"Helvetica Neue"',
        '"Segoe UI"',
        '"Apple SD Gothic Neo"',
        '"Noto Sans KR"',
        '"Malgun Gothic"',
        'sans-serif',
      ],
    },
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem', // 48px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // 간격 (4px 기준)
  spacing: {
    '0.5': '0.125rem', // 2px
    '1': '0.25rem', // 4px
    '2': '0.5rem', // 8px
    '3': '0.75rem', // 12px
    '4': '1rem', // 16px
    '5': '1.25rem', // 20px
    '6': '1.5rem', // 24px
    '8': '2rem', // 32px
    '10': '2.5rem', // 40px
    '12': '3rem', // 48px
    '16': '4rem', // 64px
    '20': '5rem', // 80px
    '24': '6rem', // 96px
  },

  // 테두리 반경
  borderRadius: {
    none: '0',
    sm: '0.125rem', // 2px
    base: '0.25rem', // 4px
    md: '0.375rem', // 6px
    lg: '0.5rem', // 8px
    xl: '0.75rem', // 12px
    '2xl': '1rem', // 16px
    '3xl': '1.5rem', // 24px
    full: '9999px',
  },

  // 그림자
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },

  // 애니메이션
  animation: {
    duration: {
      fast: '150ms',
      base: '200ms',
      slow: '300ms',
      slower: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // Z-index 계층
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
} as const;

export type DesignTokens = typeof designTokens;
