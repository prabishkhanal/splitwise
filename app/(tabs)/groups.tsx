import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import GroupCard from '@/components/groups/GroupCard';

// Temporary mock data
const groups = [
  {
    id: '1',
    name: 'Weekend Trip',
    members: [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' },
      { id: '3', name: 'Mike Johnson' },
    ],
    totalBalance: 120.50,
  },
  {
    id: '2',
    name: 'Roommates',
    members: [
      { id: '1', name: 'John Doe' },
      { id: '4', name: 'Sarah Wilson' },
    ],
    totalBalance: -45.75,
  },
  {
    id: '3',
    name: 'Office Lunch',
    members: [
      { id: '1', name: 'John Doe' },
      { id: '5', name: 'Tom Brown' },
      { id: '6', name: 'Lisa Anderson' },
      { id: '7', name: 'Chris Martin' },
    ],
    totalBalance: 85.25,
  },
];

export default function GroupsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {groups.length > 0 ? (
          groups.map((group) => (
            <GroupCard
              key={group.id}
              name={group.name}
              members={group.members}
              totalBalance={group.totalBalance}
              onPress={() => {
                // Navigate to group details
                // router.push(`/groups/${group.id}`);
              }}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No Groups Yet</Text>
            <Text style={styles.emptyText}>
              Create a group to start splitting expenses with friends
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
