import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable, Platform, View } from 'react-native';
import { COLORS, SIZES } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        headerTintColor: COLORS.textPrimary,
        tabBarStyle: {
          borderTopColor: COLORS.border,
          backgroundColor: COLORS.white,
          height: Platform.OS === 'ios' ? 88 : 60,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: COLORS.white,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.border,
        },
        headerTitleStyle: {
          fontSize: SIZES.h2,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: -5,
        },
        headerShown: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={22} color={color} />,
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <Link href="/add-expense" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="plus"
                      size={22}
                      color={COLORS.primary}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
              <Link href="/settle-up" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="exchange"
                      size={22}
                      color={COLORS.primary}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: 'Activity',
          tabBarIcon: ({ color }) => <FontAwesome name="clock-o" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: 'Groups',
          tabBarIcon: ({ color }) => <FontAwesome name="users" size={22} color={color} />,
          headerRight: () => (
            <Link href="/add-group" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus"
                    size={22}
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
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}
