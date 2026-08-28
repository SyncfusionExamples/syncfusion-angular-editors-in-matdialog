// Material Design 3 Design Tokens

export const materialTokens = {
  colors: {
    primary: '#0891b2',
    onPrimary: '#ffffff',
    primaryContainer: '#cffafe',
    onPrimaryContainer: '#001f26',

    secondary: '#536d7e',
    onSecondary: '#ffffff',

    tertiary: '#6b5b95',
    onTertiary: '#ffffff',
    tertiaryContainer: '#eaddff',
    onTertiaryContainer: '#22005d',

    error: '#ef4444',
    onError: '#ffffff',
    errorContainer: '#ffebe9',
    onErrorContainer: '#410e0b',

    surface: '#fffbfe',
    onSurface: '#1c1b1f',
    surfaceContainerLow: '#f7f2f6',
    surfaceContainer: '#f3eef2',
    surfaceContainerHigh: '#ede9ed',
    surfaceContainerHighest: '#e8e3e7',

    // Brand accents
    word: '#2563eb',
    excel: '#16a34a'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px'
  },
  typography: {
    displayLarge: '57px',
    displayMedium: '45px',
    headlineLarge: '32px',
    headlineMedium: '28px',
    titleLarge: '22px',
    titleMedium: '16px',
    bodyLarge: '16px',
    bodyMedium: '14px',
    labelLarge: '14px'
  },
  elevation: {
    0: 'none',
    1: '0px 1px 3px rgba(0, 0, 0, 0.12)',
    2: '0px 3px 6px rgba(0, 0, 0, 0.16)',
    3: '0px 6px 10px rgba(0, 0, 0, 0.20)',
    4: '0px 10px 15px rgba(0, 0, 0, 0.24)'
  }
} as const;