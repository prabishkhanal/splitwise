export const COLORS = {
  // Primary Colors
  primary: '#1CC29F',
  primaryDark: '#0E8B73',
  primaryLight: '#E8F8F5',

  // Secondary Colors
  secondary: '#2D4B64',
  secondaryLight: '#E9EEF2',

  // Status Colors
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#FF5252',
  info: '#2196F3',

  // Text Colors
  textPrimary: '#2D4B64',
  textSecondary: '#718096',
  textLight: '#A0AEC0',

  // Background Colors
  background: '#FFFFFF',
  backgroundLight: '#F7FAFC',
  backgroundDark: '#EDF2F7',

  // Border Colors
  border: '#E2E8F0',
  borderLight: '#EDF2F7',

  // Additional UI Colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  white: '#FFFFFF',
  black: '#000000',
};

export const FONTS = {
  regular: undefined,
  medium: undefined,
  bold: undefined,
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
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 18,
  body1: 16,
  body2: 14,
  caption: 12,

  // Specific component sizes
  buttonHeight: 48,
  inputHeight: 48,
  borderRadius: 8,
  cardPadding: 16,
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
