import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CircleCheck as CheckCircle, Calendar, MapPin, CreditCard, Chrome as Home } from 'lucide-react-native';
import { router } from 'expo-router';

export default function ConfirmationScreen() {
  const orderDetails = {
    id: 'WA004',
    amount: 214,
    items: 8,
    service: 'Wash & Fold',
    pickupDate: '2024-01-16',
    pickupTime: '9:00 AM - 12:00 PM',
    deliveryDate: '2024-01-17',
    deliveryTime: '3:00 PM - 6:00 PM',
    address: 'A-123, Sector 15, Noida, UP 201301',
    paymentMethod: 'UPI',
  };

  const handleTrackOrder = () => {
    router.push(`/tracking/order-detail?id=${orderDetails.id}`);
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Success Header */}
        <View style={styles.successHeader}>
          <View style={styles.successIcon}>
            <CheckCircle size={48} color="#10B981" />
          </View>
          <Text style={styles.successTitle}>Order Confirmed!</Text>
          <Text style={styles.successSubtitle}>
            Your laundry order has been placed successfully
          </Text>
          <View style={styles.orderIdContainer}>
            <Text style={styles.orderIdLabel}>Order ID</Text>
            <Text style={styles.orderIdValue}>#{orderDetails.id}</Text>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Order Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service</Text>
            <Text style={styles.summaryValue}>{orderDetails.service}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Items</Text>
            <Text style={styles.summaryValue}>{orderDetails.items} pieces</Text>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{orderDetails.amount}</Text>
          </View>
        </View>

        {/* Schedule Details */}
        <View style={styles.detailCard}>
          <View style={styles.cardHeader}>
            <Calendar size={20} color="#4A90E2" />
            <Text style={styles.cardTitle}>Schedule</Text>
          </View>
          
          <View style={styles.scheduleContainer}>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleLabel}>Pickup</Text>
              <Text style={styles.scheduleDate}>
                {new Date(orderDetails.pickupDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </Text>
              <Text style={styles.scheduleTime}>{orderDetails.pickupTime}</Text>
            </View>
            
            <View style={styles.scheduleDivider} />
            
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleLabel}>Delivery</Text>
              <Text style={styles.scheduleDate}>
                {new Date(orderDetails.deliveryDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </Text>
              <Text style={styles.scheduleTime}>{orderDetails.deliveryTime}</Text>
            </View>
          </View>
        </View>

        {/* Address Details */}
        <View style={styles.detailCard}>
          <View style={styles.cardHeader}>
            <MapPin size={20} color="#10B981" />
            <Text style={styles.cardTitle}>Delivery Address</Text>
          </View>
          <Text style={styles.addressText}>{orderDetails.address}</Text>
        </View>

        {/* Payment Details */}
        <View style={styles.detailCard}>
          <View style={styles.cardHeader}>
            <CreditCard size={20} color="#F59E0B" />
            <Text style={styles.cardTitle}>Payment Method</Text>
          </View>
          <Text style={styles.paymentText}>{orderDetails.paymentMethod}</Text>
          <View style={styles.paymentStatus}>
            <CheckCircle size={16} color="#10B981" />
            <Text style={styles.paymentStatusText}>Payment Successful</Text>
          </View>
        </View>

        {/* What's Next */}
        <View style={styles.nextStepsCard}>
          <Text style={styles.cardTitle}>What's Next?</Text>
          <View style={styles.stepsList}>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>
                Our team will arrive at your location during the pickup time slot
              </Text>
            </View>
            
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>
                Your clothes will be professionally cleaned and processed
              </Text>
            </View>
            
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>
                Clean clothes will be delivered back to you on time
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.trackButton} onPress={handleTrackOrder}>
          <Text style={styles.trackButtonText}>Track Order</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
          <Home size={20} color="#4A90E2" />
          <Text style={styles.homeButtonText}>Go to Home</Text>
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
  content: {
    flex: 1,
    padding: 20,
  },
  successHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    marginBottom: 24,
  },
  successIcon: {
    marginBottom: 16,
  },
  successTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#111827',
    marginBottom: 8,
  },
  successSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  orderIdContainer: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  orderIdLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#059669',
    marginBottom: 2,
  },
  orderIdValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#059669',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
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
  cardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#111827',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
    marginTop: 8,
    marginBottom: 0,
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
  detailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  scheduleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleItem: {
    flex: 1,
    alignItems: 'center',
  },
  scheduleLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  scheduleDate: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
    marginBottom: 2,
  },
  scheduleTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#4A90E2',
  },
  scheduleDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  addressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  paymentText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#111827',
    marginBottom: 8,
  },
  paymentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentStatusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#10B981',
    marginLeft: 6,
  },
  nextStepsCard: {
    backgroundColor: '#F8FAFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  stepsList: {
    gap: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  stepText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    flex: 1,
    lineHeight: 20,
  },
  bottomContainer: {
    padding: 20,
    gap: 12,
  },
  trackButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  trackButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  homeButton: {
    backgroundColor: '#F8FAFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  homeButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#4A90E2',
    marginLeft: 8,
  },
});