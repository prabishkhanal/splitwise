import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Pressable } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import GroupCard from '@/components/groups/GroupCard';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

// Temporary mock data
const initialGroups = [
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
  const [groups, setGroups] = useState(initialGroups);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const toggleGroupSelection = (groupId: string) => {
    if (selectedGroups.includes(groupId)) {
      setSelectedGroups(selectedGroups.filter(id => id !== groupId));
      if (selectedGroups.length === 1) {
        setIsSelectionMode(false);
      }
    } else {
      setSelectedGroups([...selectedGroups, groupId]);
    }
  };

  const deleteSelectedGroups = () => {
    // This is where you would make an API call to delete the groups
    setGroups(groups.filter(group => !selectedGroups.includes(group.id)));
    setSelectedGroups([]);
    setIsSelectionMode(false);
  };

  const exitSelectionMode = () => {
    setSelectedGroups([]);
    setIsSelectionMode(false);
  };

  return (
    <View style={styles.container}>
      {isSelectionMode && (
        <View style={styles.selectionHeader}>
          <View style={styles.selectionInfo}>
            <Pressable onPress={exitSelectionMode} style={styles.closeButton}>
              <FontAwesome name="times" size={24} color={COLORS.textPrimary} />
            </Pressable>
            <Text style={styles.selectionText}>
              {selectedGroups.length} selected
            </Text>
          </View>
          <Pressable
            onPress={deleteSelectedGroups}
            style={[
              styles.deleteButton,
              selectedGroups.length === 0 && styles.deleteButtonDisabled,
            ]}
            disabled={selectedGroups.length === 0}
          >
            <FontAwesome name="trash" size={20} color={COLORS.white} />
          </Pressable>
        </View>
      )}
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {groups.length > 0 ? (
            <>
              {!isSelectionMode && (
                <Text style={styles.helpText}>
                  Long press on a group to select multiple groups
                </Text>
              )}
              {groups.map((group) => (
                <GroupCard
                  key={group.id}
                  name={group.name}
                  members={group.members}
                  totalBalance={group.totalBalance}
                  isSelected={selectedGroups.includes(group.id)}
                  onPress={() => {
                    if (isSelectionMode) {
                      toggleGroupSelection(group.id);
                    } else {
                      router.push(`/groups/${group.id}`);
                    }
                  }}
                  onLongPress={() => {
                    if (!isSelectionMode) {
                      setIsSelectionMode(true);
                      toggleGroupSelection(group.id);
                    }
                  }}
                />
              ))}
            </>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SIZES.md,
  },
  selectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.md,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  selectionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    marginRight: SIZES.md,
    padding: SIZES.xs,
  },
  selectionText: {
    fontSize: SIZES.body1,
    fontFamily: FONTS.medium,
    color: COLORS.textPrimary,
  },
  deleteButton: {
    backgroundColor: COLORS.error,
    padding: SIZES.sm,
    borderRadius: SIZES.radius,
  },
  deleteButtonDisabled: {
    opacity: 0.5,
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
  helpText: {
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    textAlign: 'center',
    marginBottom: SIZES.md,
  },
});
