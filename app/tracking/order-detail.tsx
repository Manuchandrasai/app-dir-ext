import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Package, Clock, Truck, CircleCheck as CheckCircle, Phone, MessageCircle } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';

const orderStatuses = [
  {
    id: 'confirmed',
    title: 'Order Confirmed',
    subtitle: 'Your order has been placed',
    time: '10:30 AM',
    completed: true,
  },
  {
    id: 'picked-up',
    title: 'Picked Up',
    subtitle: 'Items collected from your location',
    time: '2:15 PM',
    completed: true,
  },
  {
    id: 'washing',
    title: 'In Process',
    subtitle: 'Your clothes are being washed',
    time: 'In Progress',
    completed: false,
    current: true,
  },
  {
    id: 'out-for-delivery',
    title: 'Out for Delivery',
    subtitle: 'On the way to your location',
    time: 'Pending',
    completed: false,
  },
  {
    id: 'delivered',
    title: 'Delivered',
    subtitle: 'Order completed successfully',
    time: 'Pending',
    completed: false,
  },
];

const orderDetails = {
  id: 'WA001',
  service: 'Wash & Fold',
  items: [
    { name: 'Shirts', quantity: 3, price: 45 },
    { name: 'Pants', quantity: 2, price: 40 },
    { name: 'T-Shirts', quantity: 3, price: 36 },
  ],
  total: 240,
  pickupDate: '2024-01-15',
  deliveryDate: '2024-01-16',
  address: 'A-123, Sector 15, Noida, UP 201301',
  driverName: 'Rajesh Kumar',
  driverPhone: '+91 98765 43210',
};

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams();

  const getStatusIcon = (status: any) => {
    if (status.completed) {
      return <CheckCircle size={20} color="#10B981" />;
    } else if (status.current) {
      return <Clock size={20} color="#4A90E2" />;
    } else {
      return <View style={styles.pendingIcon} />;
    }
  };

  const handleCallDriver = () => {
    console.log('Call driver:', orderDetails.driverPhone);
  };

  const handleChatSupport = () => {
    console.log('Open chat support');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Order #{orderDetails.id}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current Status */}
        <View style={styles.currentStatusCard}>
          <View style={styles.statusHeader}>
            <Clock size={24} color="#4A90E2" />
            <View style={styles.statusInfo}>
              <Text style={styles.currentStatusTitle}>In Process</Text>
              <Text style={styles.currentStatusSubtitle}>
                Your clothes are being professionally cleaned
              </Text>
            </View>
          </View>
          <Text style={styles.estimatedTime}>
            Estimated delivery: Tomorrow, 3:00 PM - 6:00 PM
          </Text>
        </View>

        {/* Order Timeline */}
        <View style={styles.timelineCard}>
          <Text style={styles.cardTitle}>Order Timeline</Text>
          
          <View style={styles.timeline}>
            {orderStatuses.map((status, index) => (
              <View key={status.id} style={styles.timelineItem}>
                <View style={styles.timelineIconContainer}>
                  {getStatusIcon(status)}
                  {index < orderStatuses.length - 1 && (
                    <View style={[
                      styles.timelineLine,
                      status.completed && styles.completedLine
                    ]} />
                  )}
                </View>
                
                <View style={styles.timelineContent}>
                  <View style={styles.timelineHeader}>
                    <Text style={[
                      styles.timelineTitle,
                      status.current && styles.currentTimelineTitle
                    ]}>
                      {status.title}
                    </Text>
                    <Text style={[
                      styles.timelineTime,
                      status.current && styles.currentTimelineTime
                    ]}>
                      {status.time}
                    </Text>
                  </View>
                  <Text style={styles.timelineSubtitle}>{status.subtitle}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.itemsCard}>
          <Text style={styles.cardTitle}>Order Items</Text>
          
          {orderDetails.items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
            </View>
          ))}
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{orderDetails.total}</Text>
          </View>
        </View>

        {/* Delivery Info */}
        <View style={styles.deliveryCard}>
          <Text style={styles.cardTitle}>Delivery Information</Text>
          
          <View style={styles.deliveryRow}>
            <Text style={styles.deliveryLabel}>Address</Text>
            <Text style={styles.deliveryValue}>{orderDetails.address}</Text>
          </View>
          
          <View style={styles.deliveryRow}>
            <Text style={styles.deliveryLabel}>Pickup Date</Text>
            <Text style={styles.deliveryValue}>
              {new Date(orderDetails.pickupDate).toLocaleDateString()}
            </Text>
          </View>
          
          <View style={styles.deliveryRow}>
            <Text style={styles.deliveryLabel}>Delivery Date</Text>
            <Text style={styles.deliveryValue}>
              {new Date(orderDetails.deliveryDate).toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Driver Info */}
        <View style={styles.driverCard}>
          <Text style={styles.cardTitle}>Delivery Partner</Text>
          
          <View style={styles.driverInfo}>
            <View style={styles.driverAvatar}>
              <Text style={styles.driverInitial}>R</Text>
            </View>
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>{orderDetails.driverName}</Text>
              <Text style={styles.driverRole}>Delivery Partner</Text>
            </View>
            <TouchableOpacity style={styles.callButton} onPress={handleCallDriver}>
              <Phone size={20} color="#4A90E2" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.supportButton} onPress={handleChatSupport}>
          <MessageCircle size={20} color="#6B7280" />
          <Text style={styles.supportButtonText}>Need Help?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
  },
  currentStatusCard: {
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusInfo: {
    marginLeft: 12,
    flex: 1,
  },
  currentStatusTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#4A90E2',
    marginBottom: 2,
  },
  currentStatusSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  estimatedTime: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4A90E2',
    textAlign: 'center',
  },
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 16,
  },
  timeline: {
    paddingLeft: 4,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineIconContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineLine: {
    width: 2,
    height: 32,
    backgroundColor: '#E5E7EB',
    marginTop: 8,
  },
  completedLine: {
    backgroundColor: '#10B981',
  },
  pendingIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
  },
  timelineContent: {
    flex: 1,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  timelineTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#111827',
  },
  currentTimelineTitle: {
    color: '#4A90E2',
    fontFamily: 'Inter-SemiBold',
  },
  timelineTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  currentTimelineTime: {
    color: '#4A90E2',
    fontFamily: 'Inter-Medium',
  },
  timelineSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
  itemsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#111827',
    marginBottom: 2,
  },
  itemQuantity: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  itemPrice: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#4A90E2',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  totalValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#4A90E2',
  },
  deliveryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  deliveryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  deliveryLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    width: 100,
  },
  deliveryValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#111827',
    flex: 1,
    textAlign: 'right',
  },
  driverCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  driverInitial: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 2,
  },
  driverRole: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  bottomContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  supportButton: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  supportButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
});