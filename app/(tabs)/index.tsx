import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { COLORS } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import styles from '@/styles/screens/dashboard.styles';
import { DashboardStats, ChartData, CategoryExpense } from '@/types/screens/dashboard.types';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: COLORS.white,
  backgroundGradientTo: COLORS.white,
  color: (opacity = 1) => COLORS.primary,
  strokeWidth: 2,
  decimalPlaces: 0,
};

export default function Index() {
  const { user } = useAuth();
  const { expenses } = useApp();
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalBalance: 0,
    youOwe: 0,
    youAreOwed: 0,
  });
  const [loading, setLoading] = useState(true);

  // Mock data for charts
  const monthlyData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [500, 750, 600, 850, 700, 950],
      },
    ],
  };

  const categoryData: CategoryExpense[] = [
    { category: 'Food', amount: 350, percentage: 35 },
    { category: 'Transport', amount: 200, percentage: 20 },
    { category: 'Shopping', amount: 150, percentage: 15 },
    { category: 'Entertainment', amount: 150, percentage: 15 },
    { category: 'Others', amount: 150, percentage: 15 },
  ];

  const getCategoryIcon = (category: string): string => {
    switch (category.toLowerCase()) {
      case 'food':
        return 'cutlery';
      case 'transport':
        return 'car';
      case 'shopping':
        return 'shopping-cart';
      case 'entertainment':
        return 'film';
      default:
        return 'circle';
    }
  };

  const getCategoryColor = (index: number): string => {
    const colors = [COLORS.primary, COLORS.success, COLORS.warning, COLORS.error, COLORS.info];
    return colors[index % colors.length];
  };

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setTimeout(() => {
      // Calculate stats from expenses
      // This is mock data for now
      setStats({
        totalBalance: 250.75,
        youOwe: 100.25,
        youAreOwed: 351.00,
      });
      setLoading(false);
    }, 1000);
  }, [expenses]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Welcome Section */}
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.welcomeName}>{user?.name || 'User'}</Text>
      </View>

      {/* Balance Summary */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceHeader}>Balance Summary</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={[styles.balanceAmount, { color: COLORS.primary }]}>
            ${stats.totalBalance.toFixed(2)}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.balanceRow}>
          <Text style={styles.balanceLabel}>You owe</Text>
          <Text style={[styles.balanceAmount, { color: COLORS.error }]}>
            ${stats.youOwe.toFixed(2)}
          </Text>
        </View>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceLabel}>You are owed</Text>
          <Text style={[styles.balanceAmount, { color: COLORS.success }]}>
            ${stats.youAreOwed.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Monthly Expenses Chart */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Monthly Expenses</Text>
        <View style={styles.chartContainer}>
          <LineChart
            data={monthlyData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </View>

      {/* Expense Categories */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Expense Categories</Text>
        <View style={styles.chartContainer}>
          <PieChart
            data={categoryData.map((category, index) => ({
              name: category.category,
              amount: category.amount,
              color: getCategoryColor(index),
              legendFontColor: COLORS.textPrimary,
              legendFontSize: 12,
            }))}
            width={screenWidth - 32}
            height={200}
            chartConfig={chartConfig}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="0"
          />
        </View>
        <View style={styles.categoryList}>
          {categoryData.map((category, index) => (
            <View key={category.category} style={styles.categoryItem}>
              <View
                style={[
                  styles.categoryIcon,
                  { backgroundColor: `${getCategoryColor(index)}20` },
                ]}
              >
                <FontAwesome
                  name={getCategoryIcon(category.category)}
                  size={16}
                  color={getCategoryColor(index)}
                />
              </View>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{category.category}</Text>
                <Text style={styles.categoryAmount}>
                  ${category.amount.toFixed(2)}
                </Text>
              </View>
              <Text style={styles.categoryPercentage}>
                {category.percentage}%
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
