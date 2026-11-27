import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus, Minus } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';

const clothingItems = [
  { id: 'shirt', name: 'Shirts', price: 15, icon: '👔' },
  { id: 'pants', name: 'Pants/Trousers', price: 20, icon: '👖' },
  { id: 'tshirt', name: 'T-Shirts', price: 12, icon: '👕' },
  { id: 'jeans', name: 'Jeans', price: 25, icon: '👖' },
  { id: 'dress', name: 'Dresses', price: 30, icon: '👗' },
  { id: 'bedsheet', name: 'Bed Sheets', price: 40, icon: '🛏️' },
  { id: 'towel', name: 'Towels', price: 18, icon: '🏖️' },
  { id: 'blanket', name: 'Blankets', price: 60, icon: '🛌' },
];

export default function ClothesSelectionScreen() {
  const { service } = useLocalSearchParams();
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});

  const updateQuantity = (itemId: string, change: number) => {
    setSelectedItems(prev => {
      const currentQty = prev[itemId] || 0;
      const newQty = Math.max(0, currentQty + change);
      if (newQty === 0) {
        const { [itemId]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newQty };
    });
  };

  const getTotalItems = () => {
    return Object.values(selectedItems).reduce((sum, qty) => sum + qty, 0);
  };

  const getTotalAmount = () => {
    return Object.entries(selectedItems).reduce((sum, [itemId, qty]) => {
      const item = clothingItems.find(i => i.id === itemId);
      return sum + (item ? item.price * qty : 0);
    }, 0);
  };

  const handleContinue = () => {
    if (getTotalItems() > 0) {
      router.push('/booking/schedule');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Select Items</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Service Info */}
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceTitle}>
          {service === 'wash-fold' ? 'Wash & Fold' : 
           service === 'dry-cleaning' ? 'Dry Cleaning' :
           service === 'ironing' ? 'Ironing' : 'Premium Wash'}
        </Text>
        <Text style={styles.serviceSubtitle}>Select clothes and quantities</Text>
      </View>

      {/* Items List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {clothingItems.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemIcon}>{item.icon}</Text>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>₹{item.price}/piece</Text>
              </View>
            </View>
            
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={[styles.quantityButton, { opacity: selectedItems[item.id] ? 1 : 0.5 }]}
                onPress={() => updateQuantity(item.id, -1)}
                disabled={!selectedItems[item.id]}
              >
                <Minus size={16} color="#4A90E2" />
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>
                {selectedItems[item.id] || 0}
              </Text>
              
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(item.id, 1)}
              >
                <Plus size={16} color="#4A90E2" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Summary */}
      {getTotalItems() > 0 && (
        <View style={styles.bottomContainer}>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Items:</Text>
              <Text style={styles.summaryValue}>{getTotalItems()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Amount:</Text>
              <Text style={styles.summaryAmount}>₹{getTotalAmount()}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
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
  serviceInfo: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 10,
  },
  serviceTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#111827',
    marginBottom: 4,
  },
  serviceSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  itemPrice: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4A90E2',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  quantityText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginHorizontal: 16,
    minWidth: 24,
    textAlign: 'center',
  },
  bottomContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  summaryContainer: {
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#374151',
  },
  summaryValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
  },
  summaryAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#4A90E2',
  },
  continueButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});