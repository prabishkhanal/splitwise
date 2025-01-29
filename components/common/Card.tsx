import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { COLORS, SIZES, SHADOWS, FONTS } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outline';
}

const Card = ({
  children,
  onPress,
  onLongPress,
  style,
  variant = 'default',
}: CardProps) => {
  const getCardStyles = () => {
    let baseStyle: ViewStyle = { ...styles.card };

    switch (variant) {
      case 'elevated':
        baseStyle = {
          ...baseStyle,
          ...SHADOWS.medium,
          backgroundColor: COLORS.white,
        };
        break;
      case 'outline':
        baseStyle = {
          ...baseStyle,
          borderWidth: 1,
          borderColor: COLORS.border,
          backgroundColor: COLORS.white,
        };
        break;
      default:
        baseStyle = {
          ...baseStyle,
          backgroundColor: COLORS.backgroundLight,
        };
    }

    return baseStyle;
  };

  const Container = onPress || onLongPress ? TouchableOpacity : View;

  return (
    <Container
      style={[getCardStyles(), style]}
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={300}
      activeOpacity={0.7}
    >
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: SIZES.borderRadius,
    padding: SIZES.cardPadding,
  },
});

export default Card;
