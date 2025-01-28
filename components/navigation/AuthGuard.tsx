import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export function useProtectedRoute() {
  const segments = useSegments();
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'auth';

    if (!user && !inAuthGroup) {
      // Redirect to the sign-in page.
      router.replace('/auth/login');
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace('/');
    }
  }, [user, segments, isLoading]);
}
