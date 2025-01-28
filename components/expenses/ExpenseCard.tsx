import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Card from '../common/Card';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

interface ExpenseCardProps {
  title: string;
  amount: number;
  date: Date;
  paidBy: string;
  category: string;
  split: 'equal' | 'exact' | 'percentage';
  onPress?: () => void;
}

const ExpenseCard = ({
  title,
  amount,
  date,
  paidBy,
  category,
  split,
  onPress,
}: ExpenseCardProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  return (
    <Card variant="elevated" onPress={onPress} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.categoryIcon}>
          <FontAwesome name="shopping-cart" size={20} color={COLORS.white} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.date}>{formatDate(date)}</Text>
        </View>
        <Text style={styles.amount}>{formatAmount(amount)}</Text>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.paidBy}>
          Paid by <Text style={styles.highlight}>{paidBy}</Text>
        </Text>
        <View style={styles.splitInfo}>
          <FontAwesome 
            name={split === 'equal' ? 'users' : 'percent'} 
            size={14} 
            color={COLORS.textSecondary} 
          />
          <Text style={styles.splitText}>
            {split === 'equal' ? 'Split equally' : `Split by ${split}`}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    marginLeft: SIZES.sm,
  },
  title: {
    fontSize: SIZES.body1,
    fontFamily: FONTS.medium,
    color: COLORS.textPrimary,
  },
  date: {
    fontSize: SIZES.caption,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  amount: {
    fontSize: SIZES.body1,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
    marginLeft: SIZES.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SIZES.xs,
  },
  paidBy: {
    fontSize: SIZES.caption,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  highlight: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
  },
  splitInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  splitText: {
    fontSize: SIZES.caption,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginLeft: SIZES.xxs,
  },
});

export default ExpenseCard;
