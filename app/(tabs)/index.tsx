import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import Card from '@/components/common/Card';

// Temporary mock data
const totalBalance = 245.50;
const youOwe = 120.00;
const youAreOwed = 365.50;

export default function TabOneScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Total Balance Section */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceTitle}>Total Balance</Text>
        <Text style={[styles.balanceAmount, { color: totalBalance >= 0 ? COLORS.success : COLORS.error }]}>
          {totalBalance >= 0 ? '+' : '-'}${Math.abs(totalBalance).toFixed(2)}
        </Text>
      </View>

      {/* Owe and Owed Section */}
      <View style={styles.summaryContainer}>
        <Card variant="elevated" style={styles.summaryCard}>
          <View style={[styles.summaryItem, { borderRightWidth: 1, borderColor: COLORS.border }]}>
            <Text style={styles.summaryLabel}>you owe</Text>
            <Text style={[styles.summaryAmount, { color: COLORS.error }]}>
              ${youOwe.toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>you are owed</Text>
            <Text style={[styles.summaryAmount, { color: COLORS.success }]}>
              ${youAreOwed.toFixed(2)}
            </Text>
          </View>
        </Card>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <Link href="/add-expense" asChild>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: COLORS.primary }]}>
              <FontAwesome name="plus" size={20} color={COLORS.white} />
            </View>
            <Text style={styles.actionText}>Add Expense</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/settle-up" asChild>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: COLORS.secondary }]}>
              <FontAwesome name="exchange" size={20} color={COLORS.white} />
            </View>
            <Text style={styles.actionText}>Settle Up</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Recent Activity Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Link href="/activity">
            <Text style={styles.seeAllText}>See All</Text>
          </Link>
        </View>
        {/* Add ExpenseCard components here */}
      </View>

      {/* Groups Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Groups</Text>
          <Link href="/groups">
            <Text style={styles.seeAllText}>See All</Text>
          </Link>
        </View>
        {/* Add GroupCard components here */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  balanceContainer: {
    backgroundColor: COLORS.white,
    padding: SIZES.xl,
    alignItems: 'center',
  },
  balanceTitle: {
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
    fontFamily: FONTS.medium,
    marginBottom: SIZES.xs,
  },
  balanceAmount: {
    fontSize: SIZES.h1,
    fontFamily: FONTS.bold,
  },
  summaryContainer: {
    padding: SIZES.md,
    backgroundColor: COLORS.white,
  },
  summaryCard: {
    flexDirection: 'row',
    padding: 0,
    overflow: 'hidden',
  },
  summaryItem: {
    flex: 1,
    padding: SIZES.md,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    marginBottom: SIZES.xxs,
  },
  summaryAmount: {
    fontSize: SIZES.h3,
    fontFamily: FONTS.bold,
  },
  actionsContainer: {
    flexDirection: 'row',
    padding: SIZES.md,
    backgroundColor: COLORS.white,
    marginTop: SIZES.xs,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: SIZES.xs,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.xs,
  },
  actionText: {
    fontSize: SIZES.caption,
    color: COLORS.textPrimary,
    fontFamily: FONTS.medium,
  },
  sectionContainer: {
    marginTop: SIZES.md,
    backgroundColor: COLORS.white,
    padding: SIZES.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  sectionTitle: {
    fontSize: SIZES.body1,
    color: COLORS.textPrimary,
    fontFamily: FONTS.medium,
  },
  seeAllText: {
    fontSize: SIZES.body2,
    color: COLORS.primary,
    fontFamily: FONTS.medium,
  },
});
