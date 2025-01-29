import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { ExpenseCategory, ExpenseShare, User } from '@/types';

const categories: ExpenseCategory[] = [
  'general',
  'food',
  'transportation',
  'shopping',
  'entertainment',
  'utilities',
  'rent',
  'others',
];

export default function AddExpenseScreen() {
  const { user } = useAuth();
  const { groups, createExpense } = useApp();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory>('general');
  const [notes, setNotes] = useState('');
  const [splitType, setSplitType] = useState<'equal' | 'exact' | 'percentage'>('equal');
  const [shares, setShares] = useState<ExpenseShare[]>([]);

  const handleSubmit = async () => {
    if (!user || !selectedGroup || !title || !amount) return;

    try {
      const numericAmount = parseFloat(amount);
      if (isNaN(numericAmount)) return;

      const group = groups.find(g => g.id === selectedGroup);
      if (!group) return;

      // Create equal shares for all group members
      const equalShare = numericAmount / group.members.length;
      const newShares: ExpenseShare[] = group.members.map(member => ({
        userId: member.id,
        amount: equalShare,
        paid: member.id === user.id,
      }));

      await createExpense(
        selectedGroup,
        title,
        numericAmount,
        user,
        newShares,
        selectedCategory,
        notes
      );

      router.back();
    } catch (error) {
      console.error('Error creating expense:', error);
      // TODO: Show error message
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView}>
        {/* Amount Input */}
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <Input
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            keyboardType="decimal-pad"
            style={styles.amountInput}
            inputStyle={styles.amountInputText}
          />
        </View>

        {/* Basic Info */}
        <Card variant="elevated" style={styles.card}>
          <Input
            label="Title"
            value={title}
            onChangeText={setTitle}
            placeholder="Enter expense title"
          />

          {/* Group Selection */}
          <Text style={styles.label}>Group</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.groupList}>
            {groups.map(group => (
              <TouchableOpacity
                key={group.id}
                style={[
                  styles.groupItem,
                  selectedGroup === group.id && styles.groupItemSelected,
                ]}
                onPress={() => setSelectedGroup(group.id)}
              >
                <Text
                  style={[
                    styles.groupItemText,
                    selectedGroup === group.id && styles.groupItemTextSelected,
                  ]}
                >
                  {group.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Category Selection */}
          <Text style={styles.label}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryItem,
                  selectedCategory === category && styles.categoryItemSelected,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <FontAwesome
                  name={getCategoryIcon(category)}
                  size={20}
                  color={selectedCategory === category ? COLORS.white : COLORS.textPrimary}
                />
                <Text
                  style={[
                    styles.categoryItemText,
                    selectedCategory === category && styles.categoryItemTextSelected,
                  ]}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Notes */}
          <Input
            label="Notes (Optional)"
            value={notes}
            onChangeText={setNotes}
            placeholder="Add notes"
            multiline
          />
        </Card>

        {/* Split Options */}
        <Card variant="elevated" style={styles.card}>
          <Text style={styles.cardTitle}>Split Options</Text>
          <View style={styles.splitOptions}>
            <TouchableOpacity
              style={[styles.splitOption, splitType === 'equal' && styles.splitOptionSelected]}
              onPress={() => setSplitType('equal')}
            >
              <Text
                style={[
                  styles.splitOptionText,
                  splitType === 'equal' && styles.splitOptionTextSelected,
                ]}
              >
                Equal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.splitOption, splitType === 'exact' && styles.splitOptionSelected]}
              onPress={() => setSplitType('exact')}
            >
              <Text
                style={[
                  styles.splitOptionText,
                  splitType === 'exact' && styles.splitOptionTextSelected,
                ]}
              >
                Exact
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.splitOption, splitType === 'percentage' && styles.splitOptionSelected]}
              onPress={() => setSplitType('percentage')}
            >
              <Text
                style={[
                  styles.splitOptionText,
                  splitType === 'percentage' && styles.splitOptionTextSelected,
                ]}
              >
                Percentage
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <Button
          title="Add Expense"
          onPress={handleSubmit}
          disabled={!title || !amount || !selectedGroup}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

function getCategoryIcon(category: ExpenseCategory): keyof typeof FontAwesome.glyphMap {
  switch (category) {
    case 'food':
      return 'cutlery';
    case 'transportation':
      return 'car';
    case 'shopping':
      return 'shopping-cart';
    case 'entertainment':
      return 'film';
    case 'utilities':
      return 'bolt';
    case 'rent':
      return 'home';
    case 'others':
      return 'ellipsis-h';
    default:
      return 'credit-card';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  scrollView: {
    flex: 1,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SIZES.md,
    paddingVertical: SIZES.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  currencySymbol: {
    fontSize: SIZES.h3,
    color: COLORS.textPrimary,
    fontFamily: FONTS.medium,
    marginRight: SIZES.xs,
    marginLeft: SIZES.sm,
  },
  amountInput: {
    flex: 1,
    height: SIZES.h3 * 1.5,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
  },
  amountInputText: {
    fontSize: SIZES.h3,
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
  },
  card: {
    margin: SIZES.md,
    padding: SIZES.lg,
  },
  label: {
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
    fontFamily: FONTS.medium,
    marginTop: SIZES.md,
    marginBottom: SIZES.xs,
  },
  groupList: {
    flexGrow: 0,
    marginBottom: SIZES.md,
  },
  groupItem: {
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.backgroundLight,
    marginRight: SIZES.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  groupItemSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  groupItemText: {
    fontSize: SIZES.body2,
    color: COLORS.textPrimary,
    fontFamily: FONTS.medium,
  },
  groupItemTextSelected: {
    color: COLORS.white,
  },
  categoryList: {
    flexGrow: 0,
    marginBottom: SIZES.md,
    paddingRight: SIZES.md,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.backgroundLight,
    marginRight: SIZES.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    minWidth: 100,
    justifyContent: 'center',
  },
  categoryItemSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryItemText: {
    fontSize: SIZES.body3,
    color: COLORS.textPrimary,
    fontFamily: FONTS.medium,
    marginLeft: SIZES.xs,
  },
  categoryItemTextSelected: {
    color: COLORS.white,
  },
  cardTitle: {
    fontSize: SIZES.h3,
    color: COLORS.textPrimary,
    fontFamily: FONTS.semiBold,
    marginBottom: SIZES.md,
  },
  splitOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.sm,
    paddingHorizontal: SIZES.xs,
  },
  splitOption: {
    flex: 1,
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.sm,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.backgroundLight,
    marginHorizontal: SIZES.xs,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    minWidth: 100,
  },
  splitOptionSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  splitOptionText: {
    fontSize: SIZES.body3,
    color: COLORS.textPrimary,
    fontFamily: FONTS.medium,
  },
  splitOptionTextSelected: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
  },
  footer: {
    padding: SIZES.lg,
    paddingBottom: Platform.OS === 'ios' ? SIZES.xxl : SIZES.lg,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});
