import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import ActivityItem from '@/components/activity/ActivityItem';
import { useApp } from '@/context/AppContext';
import styles from '@/styles/screens/activity.styles';
import { ActivityItem as ActivityItemType, Filter, FilterType } from '@/types/screens/activity.types';

export default function Activity() {
  const { expenses } = useApp();
  const [refreshing, setRefreshing] = React.useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Mock data - replace with actual data from your context
  const activities: ActivityItemType[] = [
    {
      id: '1',
      type: 'expense',
      title: 'Dinner at Restaurant',
      amount: -45.50,
      date: new Date('2024-01-28'),
      category: 'food',
      groupName: 'Weekend Trip',
      participants: ['John', 'Alice', 'Bob'],
    },
    {
      id: '2',
      type: 'settlement',
      title: 'Settled with John',
      amount: 100.00,
      date: new Date('2024-01-27'),
      participants: ['John'],
    },
    {
      id: '3',
      type: 'group',
      title: 'Created new group',
      amount: 0,
      date: new Date('2024-01-26'),
      groupName: 'House Expenses',
      participants: ['You', 'Mike', 'Sarah', 'Emma'],
    },
  ];

  const filters: Filter[] = [
    { type: 'all', label: 'All', icon: 'list' },
    { type: 'expenses', label: 'Expenses', icon: 'money' },
    { type: 'settlements', label: 'Settlements', icon: 'exchange' },
    { type: 'groups', label: 'Groups', icon: 'users' },
  ];

  const filteredActivities = useMemo(() => {
    if (activeFilter === 'all') return activities;
    return activities.filter(activity => activity.type === activeFilter);
  }, [activities, activeFilter]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Implement your refresh logic here
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScrollContent}
        >
          {filters.map(filter => (
            <TouchableOpacity
              key={filter.type}
              style={[
                styles.filterButton,
                activeFilter === filter.type && styles.filterButtonActive,
              ]}
              onPress={() => setActiveFilter(filter.type)}
            >
              <FontAwesome
                name={filter.icon}
                size={16}
                color={
                  activeFilter === filter.type
                    ? COLORS.white
                    : COLORS.textSecondary
                }
                style={styles.filterIcon}
              />
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter.type && styles.filterTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Activity List */}
      <ScrollView
        style={styles.activitiesList}
        contentContainerStyle={styles.activitiesContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredActivities.length === 0 ? (
          <View style={styles.emptyState}>
            <FontAwesome
              name="inbox"
              size={48}
              color={COLORS.textSecondary}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyText}>No activities found</Text>
            <Text style={styles.emptySubtext}>
              Activities will appear here as you create expenses and settlements
            </Text>
          </View>
        ) : (
          filteredActivities.map((activity) => (
            <ActivityItem
              key={activity.id}
              type={activity.type}
              title={activity.title}
              amount={activity.amount}
              date={activity.date}
              category={activity.category}
              groupName={activity.groupName}
              participants={activity.participants}
              onPress={() => {
                // Handle activity press
                console.log('Activity pressed:', activity.id);
              }}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}
