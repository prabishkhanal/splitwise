import { StyleSheet } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  scrollContent: {
    padding: SIZES.md,
  },
  welcomeCard: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    padding: SIZES.lg,
    marginBottom: SIZES.md,
    ...SHADOWS.medium,
  },
  welcomeText: {
    fontSize: SIZES.h3,
    color: COLORS.white,
    marginBottom: SIZES.xs,
  },
  welcomeName: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  balanceCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.lg,
    marginBottom: SIZES.md,
    ...SHADOWS.small,
  },
  balanceHeader: {
    fontSize: SIZES.h3,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SIZES.md,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.sm,
  },
  balanceLabel: {
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
  },
  balanceAmount: {
    fontSize: SIZES.body1,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SIZES.sm,
  },
  chartCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.lg,
    marginBottom: SIZES.md,
    ...SHADOWS.small,
  },
  chartTitle: {
    fontSize: SIZES.h3,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SIZES.md,
  },
  chartContainer: {
    marginHorizontal: -SIZES.md,
  },
  categoryList: {
    marginTop: SIZES.md,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.sm,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: SIZES.body2,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  categoryAmount: {
    fontSize: SIZES.body3,
    color: COLORS.textSecondary,
  },
  categoryPercentage: {
    fontSize: SIZES.body2,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
});
