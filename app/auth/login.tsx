import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Link } from 'expo-router';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      await signIn(email, password);
    } catch (err) {
      setError('Invalid email or password');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        {/* Logo and Title */}
        <View style={styles.header}>
          <Image
            source={require('@/assets/images/splash-icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>
            Sign in to continue splitting expenses with friends
          </Text>
        </View>

        {/* Login Form */}
        <View style={styles.form}>
          <Input
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError('');
            }}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={error}
          />

          <Input
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError('');
            }}
            placeholder="Enter your password"
            secureTextEntry
            error={error}
          />

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={isLoading}
            disabled={isLoading}
            style={styles.loginButton}
          />
        </View>

        {/* Sign Up Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Link href="/auth/register" asChild>
            <TouchableOpacity>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    padding: SIZES.xl,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: SIZES.xl,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: SIZES.lg,
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
    marginBottom: SIZES.xl,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: SIZES.xs,
    marginBottom: SIZES.lg,
  },
  forgotPasswordText: {
    fontSize: SIZES.body2,
    color: COLORS.primary,
    fontFamily: FONTS.medium,
  },
  loginButton: {
    marginTop: SIZES.md,
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
  signUpLink: {
    fontSize: SIZES.body2,
    color: COLORS.primary,
    fontFamily: FONTS.medium,
  },
});
