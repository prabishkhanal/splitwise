export const COLORS = {
  // Primary Colors
  primary: '#00B8A9',
  primaryDark: undefined,
  primaryLight: '#E6F7F5',

  // Secondary Colors
  secondary: '#F8B400',
  secondaryLight: undefined,

  // Status Colors
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',

  // Text Colors
  textPrimary: '#2C3E50',
  textSecondary: '#95A5A6',
  textLight: undefined,

  // Background Colors
  background: undefined,
  backgroundLight: '#F5F5F5',
  backgroundDark: '#121212',

  // Border Colors
  border: '#E0E0E0',
  borderLight: '#F0F0F0',

  // Additional UI Colors
  overlay: undefined,
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
};

export const SIZES = {
  // Global sizes
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,

  // Font sizes
  caption: 12,
  body2: 14,
  body1: 16,
  h4: 18,
  h3: 22,
  h2: 24,
  h1: 32,

  // Specific component sizes
  buttonHeight: undefined,
  inputHeight: undefined,
  borderRadius: 12,
  buttonRadius: 8,
  cardPadding: undefined,
  padding: 16,
  margin: 16,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 8,
  },
};

export default { COLORS, FONTS, SIZES, SHADOWS };
