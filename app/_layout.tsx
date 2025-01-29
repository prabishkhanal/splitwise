import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { AuthProvider } from '@/context/AuthContext';
import { AppProvider } from '@/context/AppContext';
import { useProtectedRoute } from '@/components/navigation/AuthGuard';
import { COLORS } from '@/constants/theme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  useProtectedRoute();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AppProvider>
        <Stack screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTintColor: COLORS.textPrimary,
          headerBackTitleVisible: false,
        }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="groups/[id]" options={{ 
            title: "Group Details",
            headerBackTitle: "Groups"
          }} />
          <Stack.Screen name="add-group" options={{ 
            title: "Create Group",
            presentation: 'modal',
            headerLeft: () => null,
          }} />
          <Stack.Screen name="add-expense" options={{ 
            title: "Add Expense",
            presentation: 'modal',
            headerLeft: () => null,
          }} />
          <Stack.Screen name="settle-up" options={{ 
            title: "Settle Up",
            presentation: 'modal',
            headerLeft: () => null,
          }} />
          <Stack.Screen 
            name="auth" 
            options={{ 
              headerShown: false 
            }} 
          />
        </Stack>
      </AppProvider>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts(FontAwesome.font);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
