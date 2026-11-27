import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, Plus, Chrome as Home, Building } from 'lucide-react-native';
import { router } from 'expo-router';

const savedAddresses = [
  {
    id: '1',
    type: 'home',
    label: 'Home',
    address: 'A-123, Sector 15, Noida, UP 201301',
    landmark: 'Near Metro Station',
    isDefault: true,
  },
  {
    id: '2',
    type: 'office',
    label: 'Office',
    address: 'Tower B, IT Park, Sector 62, Noida, UP 201309',
    landmark: 'Next to Food Court',
    isDefault: false,
  },
];

export default function AddressScreen() {
  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0].id);
  const [showAddNew, setShowAddNew] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: '',
    address: '',
    landmark: '',
  });

  const handleContinue = () => {
    if (selectedAddress || (showAddNew && newAddress.address)) {
      router.push('/booking/payment');
    }
  };

  const handleAddAddress = () => {
    if (newAddress.address) {
      // Add new address logic here
      setShowAddNew(false);
      setNewAddress({ label: '', address: '', landmark: '' });
    }
  };

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home':
        return <Home size={20} color="#4A90E2" />;
      case 'office':
        return <Building size={20} color="#10B981" />;
      default:
        return <MapPin size={20} color="#6B7280" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Delivery Address</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Saved Addresses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Addresses</Text>
          
          {savedAddresses.map((address) => (
            <TouchableOpacity
              key={address.id}
              style={[
                styles.addressCard,
                selectedAddress === address.id && styles.selectedAddressCard
              ]}
              onPress={() => setSelectedAddress(address.id)}
            >
              <View style={styles.addressHeader}>
                <View style={styles.addressTypeContainer}>
                  {getAddressIcon(address.type)}
                  <Text style={styles.addressLabel}>{address.label}</Text>
                  {address.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultBadgeText}>Default</Text>
                    </View>
                  )}
                </View>
                <View style={[
                  styles.radioButton,
                  selectedAddress === address.id && styles.selectedRadioButton
                ]}>
                  {selectedAddress === address.id && <View style={styles.radioButtonInner} />}
                </View>
              </View>
              
              <Text style={styles.addressText}>{address.address}</Text>
              {address.landmark && (
                <Text style={styles.landmarkText}>Landmark: {address.landmark}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Add New Address */}
        <View style={styles.section}>
          {!showAddNew ? (
            <TouchableOpacity
              style={styles.addAddressButton}
              onPress={() => setShowAddNew(true)}
            >
              <Plus size={20} color="#4A90E2" />
              <Text style={styles.addAddressText}>Add New Address</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.newAddressForm}>
              <Text style={styles.sectionTitle}>Add New Address</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Address Label (e.g., Home, Office)"
                value={newAddress.label}
                onChangeText={(text) => setNewAddress(prev => ({ ...prev, label: text }))}
              />
              
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Complete Address"
                value={newAddress.address}
                onChangeText={(text) => setNewAddress(prev => ({ ...prev, address: text }))}
                multiline
                numberOfLines={3}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Landmark (Optional)"
                value={newAddress.landmark}
                onChangeText={(text) => setNewAddress(prev => ({ ...prev, landmark: text }))}
              />
              
              <View style={styles.formButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowAddNew(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.saveButton, !newAddress.address && styles.disabledButton]}
                  onPress={handleAddAddress}
                  disabled={!newAddress.address}
                >
                  <Text style={[styles.saveButtonText, !newAddress.address && styles.disabledButtonText]}>
                    Save Address
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.continueButton, !selectedAddress && styles.disabledButton]}
          onPress={handleContinue}
          disabled={!selectedAddress}
        >
          <Text style={[styles.continueButtonText, !selectedAddress && styles.disabledButtonText]}>
            Continue to Payment
          </Text>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 16,
  },
  addressCard: {
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
  selectedAddressCard: {
    borderColor: '#4A90E2',
    backgroundColor: '#F8FAFF',
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  addressLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginLeft: 8,
  },
  defaultBadge: {
    backgroundColor: '#EBF5FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  defaultBadgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#4A90E2',
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
  addressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 4,
  },
  landmarkText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  addAddressButton: {
    backgroundColor: '#F8FAFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#4A90E2',
    borderStyle: 'dashed',
  },
  addAddressText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#4A90E2',
    marginLeft: 8,
  },
  newAddressForm: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  formButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  bottomContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  continueButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#F3F4F6',
  },
  continueButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  disabledButtonText: {
    color: '#9CA3AF',
  },
});