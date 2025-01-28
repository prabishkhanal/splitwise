import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import { formatDistanceToNow } from 'date-fns';
import { ActivityItemProps } from './types';
import { styles } from './styles';

const getCategoryIcon = (category: string = 'other'): string => {
  switch (category.toLowerCase()) {
    case 'food':
      return 'cutlery';
    case 'transport':
      return 'car';
    case 'shopping':
      return 'shopping-cart';
    case 'entertainment':
      return 'film';
    case 'utilities':
      return 'bolt';
    case 'rent':
      return 'home';
    case 'settlement':
      return 'exchange';
    case 'group':
      return 'users';
    default:
      return 'credit-card';
  }
};

const getActivityColor = (type: string, amount: number): string => {
  if (type === 'settlement') return COLORS.info;
  if (type === 'group') return COLORS.secondary;
  return amount >= 0 ? COLORS.success : COLORS.error;
};

export default function ActivityItem({
  type,
  title,
  amount,
  date,
  category,
  groupName,
  participants = [],
  onPress,
}: ActivityItemProps) {
  const icon = getCategoryIcon(type === 'expense' ? category : type);
  const color = getActivityColor(type, amount);
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.card]}>
        <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
          <FontAwesome name={icon} size={20} color={color} />
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text style={[styles.amount, { color }]}>
              {amount >= 0 ? '+' : '-'}${Math.abs(amount).toFixed(2)}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            {groupName && (
              <>
                <FontAwesome name="users" size={12} color={COLORS.textSecondary} />
                <Text style={styles.infoText}>{groupName}</Text>
                <Text style={styles.separator}>•</Text>
              </>
            )}
            <FontAwesome name="clock-o" size={12} color={COLORS.textSecondary} />
            <Text style={styles.infoText}>{timeAgo}</Text>
          </View>

          {participants.length > 0 && (
            <View style={styles.participantsContainer}>
              <Text style={styles.participant}>
                with {participants.slice(0, 2).join(', ')}
                {participants.length > 2 && ` and ${participants.length - 2} others`}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
