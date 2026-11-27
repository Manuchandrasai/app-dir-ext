import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar, Clock } from 'lucide-react-native';
import { router } from 'expo-router';

const timeSlots = [
  { id: '9-12', label: '9:00 AM - 12:00 PM', available: true },
  { id: '12-3', label: '12:00 PM - 3:00 PM', available: true },
  { id: '3-6', label: '3:00 PM - 6:00 PM', available: false },
  { id: '6-9', label: '6:00 PM - 9:00 PM', available: true },
];

const getNextDays = (count: number) => {
  const days = [];
  const today = new Date();
  
  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      date: date,
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : date.toLocaleDateString('en-US', { weekday: 'short' }),
      fullLabel: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    });
  }
  
  return days;
};

export default function ScheduleScreen() {
  const [selectedPickupDate, setSelectedPickupDate] = useState<string>('');
  const [selectedPickupTime, setSelectedPickupTime] = useState<string>('');
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState<string>('');
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState<string>('');

  const availableDays = getNextDays(7);

  const handleContinue = () => {
    if (selectedPickupDate && selectedPickupTime && selectedDeliveryDate && selectedDeliveryTime) {
      router.push('/booking/address');
    }
  };

  const isFormValid = selectedPickupDate && selectedPickupTime && selectedDeliveryDate && selectedDeliveryTime;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Schedule Pickup</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Pickup Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Calendar size={20} color="#4A90E2" />
            <Text style={styles.sectionTitle}>Pickup Date & Time</Text>
          </View>

          {/* Pickup Date */}
          <Text style={styles.subsectionTitle}>Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
            {availableDays.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateCard,
                  selectedPickupDate === day.date.toISOString() && styles.selectedDateCard
                ]}
                onPress={() => setSelectedPickupDate(day.date.toISOString())}
              >
                <Text style={[
                  styles.dateLabel,
                  selectedPickupDate === day.date.toISOString() && styles.selectedDateLabel
                ]}>
                  {day.label}
                </Text>
                <Text style={[
                  styles.dateValue,
                  selectedPickupDate === day.date.toISOString() && styles.selectedDateValue
                ]}>
                  {day.fullLabel}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Pickup Time */}
          <Text style={styles.subsectionTitle}>Select Time</Text>
          <View style={styles.timeGrid}>
            {timeSlots.map((slot) => (
              <TouchableOpacity
                key={slot.id}
                style={[
                  styles.timeSlot,
                  !slot.available && styles.unavailableTimeSlot,
                  selectedPickupTime === slot.id && styles.selectedTimeSlot
                ]}
                onPress={() => slot.available && setSelectedPickupTime(slot.id)}
                disabled={!slot.available}
              >
                <Clock size={16} color={
                  selectedPickupTime === slot.id ? '#FFFFFF' :
                  !slot.available ? '#9CA3AF' : '#4A90E2'
                } />
                <Text style={[
                  styles.timeSlotText,
                  !slot.available && styles.unavailableTimeSlotText,
                  selectedPickupTime === slot.id && styles.selectedTimeSlotText
                ]}>
                  {slot.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Delivery Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Calendar size={20} color="#10B981" />
            <Text style={styles.sectionTitle}>Delivery Date & Time</Text>
          </View>

          {/* Delivery Date */}
          <Text style={styles.subsectionTitle}>Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
            {availableDays.slice(1).map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateCard,
                  selectedDeliveryDate === day.date.toISOString() && styles.selectedDeliveryCard
                ]}
                onPress={() => setSelectedDeliveryDate(day.date.toISOString())}
              >
                <Text style={[
                  styles.dateLabel,
                  selectedDeliveryDate === day.date.toISOString() && styles.selectedDeliveryLabel
                ]}>
                  {day.label}
                </Text>
                <Text style={[
                  styles.dateValue,
                  selectedDeliveryDate === day.date.toISOString() && styles.selectedDeliveryValue
                ]}>
                  {day.fullLabel}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Delivery Time */}
          <Text style={styles.subsectionTitle}>Select Time</Text>
          <View style={styles.timeGrid}>
            {timeSlots.map((slot) => (
              <TouchableOpacity
                key={slot.id}
                style={[
                  styles.timeSlot,
                  !slot.available && styles.unavailableTimeSlot,
                  selectedDeliveryTime === slot.id && styles.selectedDeliverySlot
                ]}
                onPress={() => slot.available && setSelectedDeliveryTime(slot.id)}
                disabled={!slot.available}
              >
                <Clock size={16} color={
                  selectedDeliveryTime === slot.id ? '#FFFFFF' :
                  !slot.available ? '#9CA3AF' : '#10B981'
                } />
                <Text style={[
                  styles.timeSlotText,
                  !slot.available && styles.unavailableTimeSlotText,
                  selectedDeliveryTime === slot.id && styles.selectedDeliverySlotText
                ]}>
                  {slot.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.continueButton, !isFormValid && styles.disabledButton]}
          onPress={handleContinue}
          disabled={!isFormValid}
        >
          <Text style={[styles.continueButtonText, !isFormValid && styles.disabledButtonText]}>
            Continue
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
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginLeft: 8,
  },
  subsectionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#374151',
    marginBottom: 12,
  },
  dateScroll: {
    marginBottom: 24,
  },
  dateCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    minWidth: 80,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedDateCard: {
    backgroundColor: '#EBF5FF',
    borderColor: '#4A90E2',
  },
  selectedDeliveryCard: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  dateLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  selectedDateLabel: {
    color: '#4A90E2',
  },
  selectedDeliveryLabel: {
    color: '#10B981',
  },
  dateValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#111827',
  },
  selectedDateValue: {
    color: '#4A90E2',
  },
  selectedDeliveryValue: {
    color: '#10B981',
  },
  timeGrid: {
    gap: 12,
  },
  timeSlot: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedTimeSlot: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  selectedDeliverySlot: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  unavailableTimeSlot: {
    backgroundColor: '#F3F4F6',
    opacity: 0.6,
  },
  timeSlotText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
  },
  selectedTimeSlotText: {
    color: '#FFFFFF',
  },
  selectedDeliverySlotText: {
    color: '#FFFFFF',
  },
  unavailableTimeSlotText: {
    color: '#9CA3AF',
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