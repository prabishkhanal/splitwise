import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import Card from '@/components/common/Card';

// Temporary mock data
const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: null,
  defaultCurrency: 'USD',
  totalBalance: 245.50,
};

type MenuItemProps = {
  icon: keyof typeof FontAwesome.glyphMap;
  title: string;
  onPress: () => void;
};

const MenuItem = ({ icon, title, onPress }: MenuItemProps) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIcon}>
      <FontAwesome name={icon} size={20} color={COLORS.textPrimary} />
    </View>
    <Text style={styles.menuText}>{title}</Text>
    <FontAwesome name="chevron-right" size={16} color={COLORS.textLight} />
  </TouchableOpacity>
);

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        {user.avatar ? (
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
          </View>
        )}
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceContainer}>
        <Card variant="elevated" style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={[styles.balanceAmount, { color: user.totalBalance >= 0 ? COLORS.success : COLORS.error }]}>
            {user.totalBalance >= 0 ? '+' : '-'}${Math.abs(user.totalBalance).toFixed(2)}
          </Text>
        </Card>
      </View>

      {/* Settings Menu */}
      <View style={styles.menuContainer}>
        <Text style={styles.menuHeader}>Account Settings</Text>
        <Card variant="outline" style={styles.menuCard}>
          <MenuItem
            icon="user"
            title="Personal Information"
            onPress={() => {}}
          />
          <View style={styles.menuDivider} />
          <MenuItem
            icon="money"
            title="Default Currency"
            onPress={() => {}}
          />
          <View style={styles.menuDivider} />
          <MenuItem
            icon="bell"
            title="Notifications"
            onPress={() => {}}
          />
        </Card>

        <Text style={[styles.menuHeader, { marginTop: SIZES.lg }]}>Preferences</Text>
        <Card variant="outline" style={styles.menuCard}>
          <MenuItem
            icon="globe"
            title="Language"
            onPress={() => {}}
          />
          <View style={styles.menuDivider} />
          <MenuItem
            icon="moon-o"
            title="Theme"
            onPress={() => {}}
          />
        </Card>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  header: {
    backgroundColor: COLORS.white,
    padding: SIZES.xl,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: SIZES.md,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  avatarText: {
    fontSize: SIZES.h1,
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
  name: {
    fontSize: SIZES.h3,
    color: COLORS.textPrimary,
    fontFamily: FONTS.bold,
    marginBottom: SIZES.xxs,
  },
  email: {
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
  },
  balanceContainer: {
    padding: SIZES.md,
  },
  balanceCard: {
    alignItems: 'center',
    padding: SIZES.lg,
  },
  balanceLabel: {
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
    fontFamily: FONTS.medium,
    marginBottom: SIZES.xs,
  },
  balanceAmount: {
    fontSize: SIZES.h2,
    fontFamily: FONTS.bold,
  },
  menuContainer: {
    padding: SIZES.md,
  },
  menuHeader: {
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
    fontFamily: FONTS.medium,
    marginBottom: SIZES.sm,
    marginLeft: SIZES.xs,
  },
  menuCard: {
    padding: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.md,
  },
  menuIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.sm,
  },
  menuText: {
    flex: 1,
    fontSize: SIZES.body1,
    color: COLORS.textPrimary,
    fontFamily: FONTS.regular,
  },
  menuDivider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  logoutButton: {
    marginTop: SIZES.xl,
    marginBottom: SIZES.xl,
    padding: SIZES.md,
    backgroundColor: COLORS.error,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: SIZES.body1,
    color: COLORS.white,
    fontFamily: FONTS.medium,
  },
});
