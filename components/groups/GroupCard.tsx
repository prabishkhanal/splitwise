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
  onPress?: () => void;
}

const GroupCard = ({
  name,
  members,
  totalBalance,
  image,
  onPress,
}: GroupCardProps) => {
  const formatAmount = (amount: number) => {
    const prefix = amount >= 0 ? 'you are owed ' : 'you owe ';
    return prefix + Math.abs(amount).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  return (
    <Card variant="elevated" onPress={onPress} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.groupInfo}>
          {image ? (
            <Image source={{ uri: image }} style={styles.groupImage} />
          ) : (
            <View style={[styles.groupImage, styles.placeholderImage]}>
              <FontAwesome name="users" size={24} color={COLORS.white} />
            </View>
          )}
          <View style={styles.textContainer}>
            <Text style={styles.groupName} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.memberCount}>
              {members.length} {members.length === 1 ? 'member' : 'members'}
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

      <View style={styles.membersContainer}>
        {members.slice(0, 3).map((member, index) => (
          <View key={member.id} style={[styles.memberItem, index > 0 && styles.memberOffset]}>
            {member.avatar ? (
              <Image source={{ uri: member.avatar }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.placeholderAvatar]}>
                <Text style={styles.avatarText}>
                  {member.name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
          </View>
        ))}
        {members.length > 3 && (
          <View style={[styles.memberItem, styles.memberOffset]}>
            <View style={[styles.avatar, styles.moreAvatar]}>
              <Text style={styles.moreText}>+{members.length - 3}</Text>
            </View>
          </View>
        )}
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  groupImage: {
    width: 50,
    height: 50,
    borderRadius: SIZES.borderRadius,
  },
  placeholderImage: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: SIZES.sm,
    flex: 1,
  },
  groupName: {
    fontSize: SIZES.body1,
    fontFamily: FONTS.medium,
    color: COLORS.textPrimary,
  },
  memberCount: {
    fontSize: SIZES.caption,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  balance: {
    fontSize: SIZES.body2,
    fontFamily: FONTS.medium,
    marginLeft: SIZES.sm,
  },
  positiveBalance: {
    color: COLORS.success,
  },
  negativeBalance: {
    color: COLORS.error,
  },
  membersContainer: {
    flexDirection: 'row',
    marginTop: SIZES.md,
  },
  memberItem: {
    position: 'relative',
  },
  memberOffset: {
    marginLeft: -SIZES.sm,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  placeholderAvatar: {
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: COLORS.white,
    fontSize: SIZES.caption,
    fontFamily: FONTS.medium,
  },
  moreAvatar: {
    backgroundColor: COLORS.secondaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreText: {
    color: COLORS.secondary,
    fontSize: SIZES.caption,
    fontFamily: FONTS.medium,
  },
});

export default GroupCard;
