import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) => {
  const getButtonStyles = () => {
    let baseStyle: ViewStyle = {
      ...styles.button,
      opacity: disabled ? 0.5 : 1,
    };

    switch (variant) {
      case 'secondary':
        baseStyle.backgroundColor = COLORS.secondary;
        break;
      case 'outline':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = COLORS.primary;
        break;
      default:
        baseStyle.backgroundColor = COLORS.primary;
    }

    switch (size) {
      case 'small':
        baseStyle.height = 36;
        baseStyle.paddingHorizontal = SIZES.md;
        break;
      case 'large':
        baseStyle.height = 56;
        baseStyle.paddingHorizontal = SIZES.xl;
        break;
      default:
        baseStyle.height = 48;
        baseStyle.paddingHorizontal = SIZES.lg;
    }

    return baseStyle;
  };

  const getTextStyles = () => {
    let baseStyle: TextStyle = { ...styles.text };

    if (variant === 'outline') {
      baseStyle.color = COLORS.primary;
    }

    switch (size) {
      case 'small':
        baseStyle.fontSize = SIZES.body2;
        break;
      case 'large':
        baseStyle.fontSize = SIZES.h4;
        break;
      default:
        baseStyle.fontSize = SIZES.body1;
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? COLORS.primary : COLORS.white} />
      ) : (
        <Text style={[getTextStyles(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: SIZES.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLORS.white,
    fontFamily: FONTS.medium,
  },
});

export default Button;
