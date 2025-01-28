import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import ExpenseCard from '@/components/expenses/ExpenseCard';

// Temporary mock data
const activities = [
  {
    id: '1',
    title: 'Grocery Shopping',
    amount: 85.50,
    date: new Date('2025-01-28'),
    paidBy: 'John Doe',
    category: 'food',
    split: 'equal' as const,
  },
  {
    id: '2',
    title: 'Movie Night',
    amount: 45.00,
    date: new Date('2025-01-27'),
    paidBy: 'Jane Smith',
    category: 'entertainment',
    split: 'equal' as const,
  },
  {
    id: '3',
    title: 'Uber Ride',
    amount: 25.75,
    date: new Date('2025-01-27'),
    paidBy: 'Mike Johnson',
    category: 'transportation',
    split: 'percentage' as const,
  },
];

export default function ActivityScreen() {
  const groupActivitiesByDate = () => {
    const grouped = activities.reduce((acc, activity) => {
      const date = activity.date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      
      if (!acc[date]) {
        acc[date] = [];
      }
      
      acc[date].push(activity);
      return acc;
    }, {} as Record<string, typeof activities>);

    return Object.entries(grouped);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {activities.length > 0 ? (
          groupActivitiesByDate().map(([date, dateActivities]) => (
            <View key={date} style={styles.dateGroup}>
              <Text style={styles.dateHeader}>{date}</Text>
              {dateActivities.map((activity) => (
                <ExpenseCard
                  key={activity.id}
                  title={activity.title}
                  amount={activity.amount}
                  date={activity.date}
                  paidBy={activity.paidBy}
                  category={activity.category}
                  split={activity.split}
                  onPress={() => {
                    // Navigate to expense details
                    // router.push(`/expenses/${activity.id}`);
                  }}
                />
              ))}
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No Activity Yet</Text>
            <Text style={styles.emptyText}>
              Recent expenses and settlements will appear here
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  content: {
    padding: SIZES.md,
  },
  dateGroup: {
    marginBottom: SIZES.lg,
  },
  dateHeader: {
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
    fontFamily: FONTS.medium,
    marginBottom: SIZES.sm,
    marginLeft: SIZES.xs,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.xl,
  },
  emptyTitle: {
    fontSize: SIZES.h3,
    color: COLORS.textPrimary,
    fontFamily: FONTS.medium,
    marginBottom: SIZES.sm,
  },
  emptyText: {
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
});
