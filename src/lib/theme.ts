// src/lib/theme.ts
// Centralized design token config — import this to access color/spacing tokens in TS

export const theme = {
  colors: {
    bgPrimary:       '#0B0E14',
    bgSecondary:     '#12151C',
    bgTertiary:      '#1A1E27',
    textPrimary:     '#F3EFE7',
    textSecondary:   '#A6ADBB',
    accentPrimary:   '#E8A33D',
    accentSecondary: '#5FA8A0',
    border:          '#2A2F3A',
    success:         '#6FCF97',
  },
  fonts: {
    heading: "'Space Grotesk', sans-serif",
    body:    "'Inter', sans-serif",
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
} as const

export type ThemeColors = typeof theme.colors
