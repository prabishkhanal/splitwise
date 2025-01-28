import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Link } from 'expo-router';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useAuth } from '@/context/AuthContext';

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      await signUp(email, password, name);
    } catch (err) {
      console.error('Registration error:', err);
      setErrors({
        submit: 'Failed to create account. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join Splitwise to start sharing expenses with friends
          </Text>
        </View>

        {/* Registration Form */}
        <View style={styles.form}>
          <Input
            label="Full Name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              setErrors({ ...errors, name: '' });
            }}
            placeholder="Enter your full name"
            error={errors.name}
          />

          <Input
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrors({ ...errors, email: '' });
            }}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <Input
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrors({ ...errors, password: '', confirmPassword: '' });
            }}
            placeholder="Create a password"
            secureTextEntry
            error={errors.password}
          />

          <Input
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setErrors({ ...errors, confirmPassword: '' });
            }}
            placeholder="Confirm your password"
            secureTextEntry
            error={errors.confirmPassword}
          />

          {errors.submit && (
            <Text style={styles.submitError}>{errors.submit}</Text>
          )}

          <Button
            title="Sign Up"
            onPress={handleRegister}
            loading={isLoading}
            disabled={isLoading}
            style={styles.registerButton}
          />
        </View>

        {/* Terms and Privacy */}
        <Text style={styles.terms}>
          By signing up, you agree to our{' '}
          <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>

        {/* Sign In Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Link href="/auth/login" asChild>
            <TouchableOpacity>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SIZES.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SIZES.xl,
  },
  title: {
    fontSize: SIZES.h1,
    color: COLORS.textPrimary,
    fontFamily: FONTS.bold,
    marginBottom: SIZES.xs,
  },
  subtitle: {
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
  form: {
    marginBottom: SIZES.lg,
  },
  registerButton: {
    marginTop: SIZES.md,
  },
  submitError: {
    color: COLORS.error,
    fontSize: SIZES.body2,
    fontFamily: FONTS.regular,
    marginTop: SIZES.sm,
    textAlign: 'center',
  },
  terms: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    textAlign: 'center',
    marginBottom: SIZES.xl,
  },
  termsLink: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
  },
  signInLink: {
    fontSize: SIZES.body2,
    color: COLORS.primary,
    fontFamily: FONTS.medium,
  },
});
