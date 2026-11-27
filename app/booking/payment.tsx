import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CreditCard, Smartphone, Wallet, Banknote, Shield } from 'lucide-react-native';
import { router } from 'expo-router';

const paymentMethods = [
  {
    id: 'upi',
    title: 'UPI',
    subtitle: 'Pay using UPI apps',
    icon: Smartphone,
    color: '#10B981',
    popular: true,
  },
  {
    id: 'card',
    title: 'Credit/Debit Card',
    subtitle: 'Visa, Mastercard, RuPay',
    icon: CreditCard,
    color: '#4A90E2',
    popular: false,
  },
  {
    id: 'wallet',
    title: 'Wallet',
    subtitle: 'Paytm, PhonePe, Google Pay',
    icon: Wallet,
    color: '#F59E0B',
    popular: false,
  },
  {
    id: 'cod',
    title: 'Cash on Delivery',
    subtitle: 'Pay when order is delivered',
    icon: Banknote,
    color: '#8B5CF6',
    popular: false,
  },
];

export default function PaymentScreen() {
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const orderSummary = {
    items: 8,
    subtotal: 240,
    taxes: 24,
    delivery: 0,
    discount: 50,
    total: 214,
  };

  const handlePayment = () => {
    // Payment processing logic here
    router.push('/booking/confirmation');
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'upi':
        return (
          <View style={styles.paymentForm}>
            <Text style={styles.formTitle}>Enter UPI ID</Text>
            <TextInput
              style={styles.input}
              placeholder="yourname@upi"
              value={upiId}
              onChangeText={setUpiId}
              keyboardType="email-address"
            />
          </View>
        );
      
      case 'card':
        return (
          <View style={styles.paymentForm}>
            <Text style={styles.formTitle}>Card Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Card Number"
              value={cardDetails.number}
              onChangeText={(text) => setCardDetails(prev => ({ ...prev, number: text }))}
              keyboardType="numeric"
              maxLength={19}
            />
            <View style={styles.cardRow}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChangeText={(text) => setCardDetails(prev => ({ ...prev, expiry: text }))}
                keyboardType="numeric"
                maxLength={5}
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="CVV"
                value={cardDetails.cvv}
                onChangeText={(text) => setCardDetails(prev => ({ ...prev, cvv: text }))}
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Cardholder Name"
              value={cardDetails.name}
              onChangeText={(text) => setCardDetails(prev => ({ ...prev, name: text }))}
            />
          </View>
        );
      
      case 'cod':
        return (
          <View style={styles.paymentForm}>
            <View style={styles.codInfo}>
              <Text style={styles.codTitle}>Cash on Delivery</Text>
              <Text style={styles.codSubtitle}>
                Pay ₹{orderSummary.total} in cash when your order is delivered
              </Text>
            </View>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Payment</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Order Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Items ({orderSummary.items})</Text>
            <Text style={styles.summaryValue}>₹{orderSummary.subtotal}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Taxes & Fees</Text>
            <Text style={styles.summaryValue}>₹{orderSummary.taxes}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery</Text>
            <Text style={[styles.summaryValue, styles.freeText]}>
              {orderSummary.delivery === 0 ? 'FREE' : `₹${orderSummary.delivery}`}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, styles.discountText]}>Discount (WASH50)</Text>
            <Text style={[styles.summaryValue, styles.discountText]}>-₹{orderSummary.discount}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₹{orderSummary.total}</Text>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethodCard,
                selectedMethod === method.id && styles.selectedPaymentCard
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              <View style={styles.methodHeader}>
                <View style={styles.methodInfo}>
                  <View style={[styles.methodIcon, { backgroundColor: `${method.color}20` }]}>
                    <method.icon size={20} color={method.color} />
                  </View>
                  <View style={styles.methodDetails}>
                    <View style={styles.methodTitleRow}>
                      <Text style={styles.methodTitle}>{method.title}</Text>
                      {method.popular && (
                        <View style={styles.popularBadge}>
                          <Text style={styles.popularText}>Popular</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
                  </View>
                </View>
                <View style={[
                  styles.radioButton,
                  selectedMethod === method.id && styles.selectedRadioButton
                ]}>
                  {selectedMethod === method.id && <View style={styles.radioButtonInner} />}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment Form */}
        {renderPaymentForm()}

        {/* Security Info */}
        <View style={styles.securityInfo}>
          <Shield size={16} color="#10B981" />
          <Text style={styles.securityText}>
            Your payment information is encrypted and secure
          </Text>
        </View>
      </ScrollView>

      {/* Pay Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Pay ₹{orderSummary.total}</Text>
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
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
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
  freeText: {
    color: '#10B981',
    fontFamily: 'Inter-SemiBold',
  },
  discountText: {
    color: '#10B981',
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 16,
  },
  paymentMethodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedPaymentCard: {
    borderColor: '#4A90E2',
    backgroundColor: '#F8FAFF',
  },
  methodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  methodDetails: {
    flex: 1,
  },
  methodTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  methodTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
  },
  popularBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  popularText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#D97706',
  },
  methodSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadioButton: {
    borderColor: '#4A90E2',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4A90E2',
  },
  paymentForm: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  formTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  codInfo: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  codTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 8,
  },
  codSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  securityText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#059669',
    marginLeft: 6,
  },
  bottomContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  payButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  payButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});