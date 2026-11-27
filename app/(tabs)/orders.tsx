import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, Package, CircleCheck as CheckCircle, Truck } from 'lucide-react-native';
import { router } from 'expo-router';

const orders = [
  {
    id: 'WA001',
    status: 'in-progress',
    statusText: 'Washing',
    service: 'Wash & Fold',
    items: 8,
    amount: 240,
    date: '2024-01-15',
    estimatedDelivery: '2024-01-16',
  },
  {
    id: 'WA002',
    status: 'delivered',
    statusText: 'Delivered',
    service: 'Dry Cleaning',
    items: 3,
    amount: 450,
    date: '2024-01-12',
    deliveredDate: '2024-01-14',
  },
  {
    id: 'WA003',
    status: 'picked-up',
    statusText: 'Picked Up',
    service: 'Premium Wash',
    items: 5,
    amount: 375,
    date: '2024-01-10',
    estimatedDelivery: '2024-01-12',
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'picked-up':
      return <Package size={20} color="#F59E0B" />;
    case 'in-progress':
      return <Clock size={20} color="#4A90E2" />;
    case 'out-for-delivery':
      return <Truck size={20} color="#8B5CF6" />;
    case 'delivered':
      return <CheckCircle size={20} color="#10B981" />;
    default:
      return <Clock size={20} color="#6B7280" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'picked-up':
      return '#F59E0B';
    case 'in-progress':
      return '#4A90E2';
    case 'out-for-delivery':
      return '#8B5CF6';
    case 'delivered':
      return '#10B981';
    default:
      return '#6B7280';
  }
};

export default function OrdersScreen() {
  const handleOrderPress = (orderId: string) => {
    router.push(`/tracking/order-detail?id=${orderId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {orders.map((order) => (
          <TouchableOpacity
            key={order.id}
            style={styles.orderCard}
            onPress={() => handleOrderPress(order.id)}
            activeOpacity={0.8}
          >
            <View style={styles.orderHeader}>
              <View style={styles.orderIdContainer}>
                <Text style={styles.orderId}>#{order.id}</Text>
                <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(order.status)}20` }]}>
                  {getStatusIcon(order.status)}
                  <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                    {order.statusText}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.orderDetails}>
              <Text style={styles.serviceType}>{order.service}</Text>
              <Text style={styles.itemCount}>{order.items} items</Text>
            </View>

            <View style={styles.orderFooter}>
              <View>
                <Text style={styles.dateLabel}>Order Date</Text>
                <Text style={styles.dateValue}>{new Date(order.date).toLocaleDateString()}</Text>
              </View>
              <View style={styles.amountContainer}>
                <Text style={styles.amount}>₹{order.amount}</Text>
              </View>
            </View>

            {order.estimatedDelivery && order.status !== 'delivered' && (
              <View style={styles.deliveryInfo}>
                <Text style={styles.deliveryLabel}>Estimated Delivery</Text>
                <Text style={styles.deliveryDate}>
                  {new Date(order.estimatedDelivery).toLocaleDateString()}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}

        {orders.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📦</Text>
            <Text style={styles.emptyTitle}>No Orders Yet</Text>
            <Text style={styles.emptySubtitle}>Your order history will appear here</Text>
            <TouchableOpacity style={styles.bookButton} onPress={() => router.push('/')}>
              <Text style={styles.bookButtonText}>Book Your First Order</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#111827',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  orderHeader: {
    marginBottom: 12,
  },
  orderIdContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginLeft: 6,
  },
  orderDetails: {
    marginBottom: 12,
  },
  serviceType: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  itemCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  dateLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  dateValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#374151',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#4A90E2',
  },
  deliveryInfo: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  deliveryDate: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#4A90E2',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  bookButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  bookButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});