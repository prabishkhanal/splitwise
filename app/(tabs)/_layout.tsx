import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import { COLORS } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        headerTintColor: COLORS.textPrimary,
        tabBarStyle: {
          borderTopColor: COLORS.border,
          backgroundColor: COLORS.background,
        },
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerShown: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
          headerRight: () => (
            <Link href="/add-expense" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus"
                    size={25}
                    color={COLORS.primary}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: 'Activity',
          tabBarIcon: ({ color }) => <FontAwesome name="list" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: 'Groups',
          tabBarIcon: ({ color }) => <FontAwesome name="users" size={24} color={color} />,
          headerRight: () => (
            <Link href="/add-group" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus"
                    size={25}
                    color={COLORS.primary}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
