import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Card from '../common/Card';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

interface Member {
  id: string;
  name: string;
  avatar?: string;
}

interface GroupCardProps {
  name: string;
  members: Member[];
  totalBalance: number;
  image?: string;
  isSelected?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
}

const GroupCard = ({
  name,
  members,
  totalBalance,
  image,
  isSelected,
  onPress,
  onLongPress,
}: GroupCardProps) => {
  const formatAmount = (amount: number) => {
    const isPositive = amount >= 0;
    return `${isPositive ? 'you are owed ' : 'you owe '}${Math.abs(amount).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    })}`;
  };

  const renderMemberAvatars = () => {
    return members.map((_, index) => (
      <View
        key={index}
        style={[
          styles.memberAvatar,
          { marginLeft: index > 0 ? -8 : 0 },
        ]}
      >
        <Text style={styles.memberInitial}>
          {String.fromCodePoint(0x1F464)}
        </Text>
      </View>
    ));
  };

  return (
    <Card
      variant="elevated"
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.container, isSelected && styles.selectedContainer]}
    >
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <View style={styles.groupIcon}>
            <FontAwesome name="users" size={20} color={COLORS.white} />
          </View>
          <View style={styles.groupInfo}>
            <Text style={styles.groupName} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.memberCount}>
              {members.length} member{members.length !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>
        <Text
          style={[
            styles.balance,
            totalBalance >= 0 ? styles.positiveBalance : styles.negativeBalance,
          ]}
        >
          {formatAmount(totalBalance)}
        </Text>
      </View>
      {!isSelected && (
        <View style={styles.memberAvatars}>
          {renderMemberAvatars()}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SIZES.sm,
    marginVertical: SIZES.xs,
    padding: SIZES.sm,
  },
  selectedContainer: {
    backgroundColor: COLORS.backgroundLight,
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupInfo: {
    marginLeft: SIZES.sm,
    flex: 1,
  },
  groupName: {
    fontSize: SIZES.body1,
    fontFamily: FONTS.medium,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  memberCount: {
    fontSize: SIZES.body2,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  balance: {
    fontSize: SIZES.body2,
    fontFamily: FONTS.medium,
    textAlign: 'right',
  },
  positiveBalance: {
    color: COLORS.success,
  },
  negativeBalance: {
    color: COLORS.error,
  },
  memberAvatars: {
    flexDirection: 'row',
    marginTop: SIZES.sm,
    paddingLeft: 48,
  },
  memberAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  memberInitial: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});

export default GroupCard;
