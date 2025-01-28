import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/types';

interface Settlement {
  user: User;
  amount: number;
}

export default function SettleUpScreen() {
  const { user } = useAuth();
  const { expenses, settlements, createSettlement } = useApp();
  const [youOwe, setYouOwe] = useState<Settlement[]>([]);
  const [youAreOwed, setYouAreOwed] = useState<Settlement[]>([]);

  useEffect(() => {
    // Calculate settlements
    calculateSettlements();
  }, [expenses, settlements]);

  const calculateSettlements = () => {
    // TODO: Implement actual settlement calculation logic
    // This is just mock data for demonstration
    setYouOwe([
      { user: { id: '2', name: 'Jane Smith', email: 'jane@example.com' }, amount: 50.00 },
      { user: { id: '3', name: 'Mike Johnson', email: 'mike@example.com' }, amount: 25.75 },
    ]);

    setYouAreOwed([
      { user: { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com' }, amount: 35.50 },
      { user: { id: '5', name: 'Tom Brown', email: 'tom@example.com' }, amount: 15.25 },
    ]);
  };

  const handleSettle = async (settlement: Settlement) => {
    if (!user) return;

    try {
      Alert.alert(
        'Confirm Settlement',
        `Are you sure you want to settle ${settlement.amount.toFixed(2)} with ${settlement.user.name}?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Settle',
            onPress: async () => {
              await createSettlement(
                user,
                settlement.user,
                settlement.amount
              );
              router.back();
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error settling up:', error);
      // TODO: Show error message
    }
  };

  const SettlementItem = ({ settlement, type }: { settlement: Settlement; type: 'owe' | 'owed' }) => (
    <Card variant="outline" style={styles.settlementCard}>
      <View style={styles.settlementContent}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {settlement.user.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.userText}>
            <Text style={styles.userName}>{settlement.user.name}</Text>
            <Text style={styles.settlementText}>
              {type === 'owe' ? 'you owe' : 'owes you'}
            </Text>
          </View>
        </View>
        <View style={styles.amountContainer}>
          <Text
            style={[
              styles.amount,
              { color: type === 'owe' ? COLORS.error : COLORS.success },
            ]}
          >
            ${settlement.amount.toFixed(2)}
          </Text>
          <Button
            title="Settle Up"
            onPress={() => handleSettle(settlement)}
            variant="outline"
            size="small"
            style={styles.settleButton}
          />
        </View>
      </View>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      {/* You Owe Section */}
      {youOwe.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>You Owe</Text>
          {youOwe.map(settlement => (
            <SettlementItem
              key={settlement.user.id}
              settlement={settlement}
              type="owe"
            />
          ))}
        </View>
      )}

      {/* You Are Owed Section */}
      {youAreOwed.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>You Are Owed</Text>
          {youAreOwed.map(settlement => (
            <SettlementItem
              key={settlement.user.id}
              settlement={settlement}
              type="owed"
            />
          ))}
        </View>
      )}

      {/* Empty State */}
      {youOwe.length === 0 && youAreOwed.length === 0 && (
        <View style={styles.emptyContainer}>
          <FontAwesome name="check-circle" size={64} color={COLORS.success} />
          <Text style={styles.emptyTitle}>All Settled Up!</Text>
          <Text style={styles.emptyText}>
            You don't have any pending settlements
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  section: {
    padding: SIZES.md,
  },
  sectionTitle: {
    fontSize: SIZES.h4,
    color: COLORS.textPrimary,
    fontFamily: FONTS.medium,
    marginBottom: SIZES.sm,
  },
  settlementCard: {
    marginBottom: SIZES.sm,
  },
  settlementContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: COLORS.white,
    fontSize: SIZES.body1,
    fontFamily: FONTS.bold,
  },
  userText: {
    marginLeft: SIZES.sm,
  },
  userName: {
    fontSize: SIZES.body2,
    color: COLORS.textPrimary,
    fontFamily: FONTS.medium,
  },
  settlementText: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: SIZES.h4,
    fontFamily: FONTS.bold,
    marginBottom: SIZES.xs,
  },
  settleButton: {
    minWidth: 100,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.xl,
    marginTop: SIZES.xl * 2,
  },
  emptyTitle: {
    fontSize: SIZES.h3,
    color: COLORS.textPrimary,
    fontFamily: FONTS.medium,
    marginTop: SIZES.lg,
    marginBottom: SIZES.sm,
  },
  emptyText: {
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
});
