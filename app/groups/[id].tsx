import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import Card from '@/components/common/Card';

// Mock data - replace with API call later
const groups = {
  '1': {
    id: '1',
    name: 'Weekend Trip',
    members: [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' },
      { id: '3', name: 'Mike Johnson' },
    ],
    totalBalance: 120.50,
    expenses: [
      {
        id: '1',
        description: 'Hotel Booking',
        amount: 300,
        paidBy: { id: '1', name: 'John Doe' },
        date: '2024-01-28',
        splits: [
          { userId: '1', amount: 100 },
          { userId: '2', amount: 100 },
          { userId: '3', amount: 100 },
        ],
      },
      {
        id: '2',
        description: 'Dinner',
        amount: 90,
        paidBy: { id: '2', name: 'Jane Smith' },
        date: '2024-01-27',
        splits: [
          { userId: '1', amount: 30 },
          { userId: '2', amount: 30 },
          { userId: '3', amount: 30 },
        ],
      },
    ],
  },
  '2': {
    id: '2',
    name: 'Roommates',
    members: [
      { id: '1', name: 'John Doe' },
      { id: '4', name: 'Sarah Wilson' },
    ],
    totalBalance: -45.75,
    expenses: [
      {
        id: '3',
        description: 'Groceries',
        amount: 89.50,
        paidBy: { id: '4', name: 'Sarah Wilson' },
        date: '2024-01-26',
        splits: [
          { userId: '1', amount: 44.75 },
          { userId: '4', amount: 44.75 },
        ],
      },
    ],
  },
  '3': {
    id: '3',
    name: 'Office Lunch',
    members: [
      { id: '1', name: 'John Doe' },
      { id: '5', name: 'Tom Brown' },
      { id: '6', name: 'Lisa Anderson' },
      { id: '7', name: 'Chris Martin' },
    ],
    totalBalance: 85.25,
    expenses: [
      {
        id: '4',
        description: 'Team Lunch',
        amount: 200,
        paidBy: { id: '1', name: 'John Doe' },
        date: '2024-01-29',
        splits: [
          { userId: '1', amount: 50 },
          { userId: '5', amount: 50 },
          { userId: '6', amount: 50 },
          { userId: '7', amount: 50 },
        ],
      },
      {
        id: '5',
        description: 'Coffee Run',
        amount: 35,
        paidBy: { id: '6', name: 'Lisa Anderson' },
        date: '2024-01-28',
        splits: [
          { userId: '1', amount: 8.75 },
          { userId: '5', amount: 8.75 },
          { userId: '6', amount: 8.75 },
          { userId: '7', amount: 8.75 },
        ],
      },
    ],
  },
};

export default function GroupDetailsScreen() {
  const { id } = useLocalSearchParams();
  const group = groups[id as keyof typeof groups];

  if (!group) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Group not found</Text>
      </View>
    );
  }

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Card variant="elevated" style={styles.summaryCard}>
        <Text style={styles.sectionTitle}>Group Balance</Text>
        <Text
          style={[
            styles.balance,
            group.totalBalance >= 0
              ? styles.positiveBalance
              : styles.negativeBalance,
          ]}
        >
          {group.totalBalance >= 0 ? 'You are owed ' : 'You owe '}
          {formatAmount(Math.abs(group.totalBalance))}
        </Text>
      </Card>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Members ({group.members.length})</Text>
        {group.members.map((member) => (
          <View key={member.id} style={styles.memberItem}>
            <View style={styles.memberAvatar}>
              <Text style={styles.avatarText}>
                {member.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.memberName}>{member.name}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Recent Expenses ({group.expenses.length})
          </Text>
          <Pressable
            onPress={() => {
              router.push(`/groups/${id}/add-expense`);
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}
          >
            <FontAwesome name="plus" size={20} color={COLORS.primary} />
          </Pressable>
        </View>
        {group.expenses.map((expense) => (
          <Card key={expense.id} variant="outline" style={styles.expenseCard}>
            <View style={styles.expenseHeader}>
              <Text style={styles.expenseDescription}>
                {expense.description}
              </Text>
              <Text style={styles.expenseAmount}>
                {formatAmount(expense.amount)}
              </Text>
            </View>
            <Text style={styles.expenseDetails}>
              Paid by {expense.paidBy.name} • {formatDate(expense.date)}
            </Text>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  errorText: {
    fontSize: SIZES.h3,
    color: COLORS.error,
    textAlign: 'center',
    marginTop: SIZES.xl,
    fontFamily: FONTS.medium,
  },
  summaryCard: {
    margin: SIZES.md,
  },
  section: {
    padding: SIZES.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  sectionTitle: {
    fontSize: SIZES.h3,
    color: COLORS.textPrimary,
    fontFamily: FONTS.medium,
    marginBottom: SIZES.sm,
  },
  balance: {
    fontSize: SIZES.h2,
    fontFamily: FONTS.semiBold,
    marginTop: SIZES.xs,
  },
  positiveBalance: {
    color: COLORS.success,
  },
  negativeBalance: {
    color: COLORS.error,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.sm,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.sm,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: SIZES.body1,
    fontFamily: FONTS.medium,
  },
  memberName: {
    fontSize: SIZES.body1,
    color: COLORS.textPrimary,
    fontFamily: FONTS.regular,
  },
  expenseCard: {
    marginBottom: SIZES.sm,
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.xs,
  },
  expenseDescription: {
    fontSize: SIZES.body1,
    color: COLORS.textPrimary,
    fontFamily: FONTS.medium,
  },
  expenseAmount: {
    fontSize: SIZES.body1,
    color: COLORS.textPrimary,
    fontFamily: FONTS.semiBold,
  },
  expenseDetails: {
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
  },
});
