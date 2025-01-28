import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  KeyboardTypeOptions,
} from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  style?: ViewStyle;
  inputStyle?: TextStyle;
  multiline?: boolean;
  maxLength?: number;
  editable?: boolean;
}

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  style,
  inputStyle,
  multiline = false,
  maxLength,
  editable = true,
}: InputProps) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          !editable && styles.inputDisabled,
          multiline && styles.multiline,
          inputStyle,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textLight}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        maxLength={maxLength}
        editable={editable}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.md,
  },
  label: {
    fontSize: SIZES.body2,
    color: COLORS.textPrimary,
    marginBottom: SIZES.xs,
    fontFamily: FONTS.medium,
  },
  input: {
    height: SIZES.inputHeight,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: SIZES.md,
    fontSize: SIZES.body1,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontFamily: FONTS.regular,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  inputDisabled: {
    backgroundColor: COLORS.backgroundDark,
    color: COLORS.textLight,
  },
  multiline: {
    height: SIZES.inputHeight * 2,
    textAlignVertical: 'top',
    paddingTop: SIZES.sm,
  },
  error: {
    color: COLORS.error,
    fontSize: SIZES.caption,
    marginTop: SIZES.xxs,
    fontFamily: FONTS.regular,
  },
});

export default Input;
