import { StyleSheet } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.md,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.md,
  },
  contentContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SIZES.xs,
  },
  title: {
    fontSize: SIZES.body1,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: SIZES.sm,
  },
  amount: {
    fontSize: SIZES.body1,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.xs,
  },
  infoText: {
    fontSize: SIZES.body3,
    color: COLORS.textSecondary,
    marginLeft: SIZES.xs,
  },
  participantsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  participant: {
    fontSize: SIZES.body3,
    color: COLORS.textSecondary,
  },
  separator: {
    fontSize: SIZES.body3,
    color: COLORS.textSecondary,
    marginHorizontal: SIZES.xs,
  },
});
