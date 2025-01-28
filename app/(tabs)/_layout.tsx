import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, router } from 'expo-router';
import { Pressable } from 'react-native';
import { COLORS } from '@/constants/theme';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

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
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
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
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: 'Groups',
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
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
        name="add"
        options={{
          title: 'Add',
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="plus-circle"
              size={32}
              color={COLORS.primary}
              style={{ marginBottom: -3 }}
            />
          ),
          headerShown: false,
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            router.push('/add-expense');
          },
        })}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: 'Activity',
          tabBarIcon: ({ color }) => <TabBarIcon name="clock-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
