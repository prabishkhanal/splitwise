import { StyleSheet } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '@/constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  filtersContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.sm,
    ...SHADOWS.small,
  },
  filtersScrollContent: {
    paddingHorizontal: SIZES.md,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.buttonRadius,
    marginRight: SIZES.sm,
    backgroundColor: COLORS.backgroundLight,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  filterIcon: {
    marginRight: SIZES.xs,
  },
  filterText: {
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  filterTextActive: {
    color: COLORS.white,
  },
  activitiesList: {
    flex: 1,
  },
  activitiesContent: {
    padding: SIZES.md,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.xxl * 2,
  },
  emptyIcon: {
    marginBottom: SIZES.md,
  },
  emptyText: {
    fontSize: SIZES.h3,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SIZES.xs,
  },
  emptySubtext: {
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: SIZES.xl,
  },
});
