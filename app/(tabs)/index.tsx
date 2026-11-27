import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  FlatList,
  SafeAreaView,
} from 'react-native';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import {
  MapPin,
  ChevronDown,
  Shirt,
  Sparkles,
  BusFront as Iron,
  Star,
} from 'lucide-react-native';

const serviceCategories = [
  {
    id: 'wash-fold',
    title: 'Wash & Fold',
    subtitle: 'Regular washing',
    price: 'From ₹15/piece',
    icon: Shirt,
    gradient: ['#4A90E2', '#357ABD'],
  },
  {
    id: 'dry-cleaning',
    title: 'Dry Cleaning',
    subtitle: 'Professional care',
    price: 'From ₹50/piece',
    icon: Sparkles,
    gradient: ['#10B981', '#059669'],
  },
  {
    id: 'ironing',
    title: 'Ironing',
    subtitle: 'Crisp & neat',
    price: 'From ₹8/piece',
    icon: Iron,
    gradient: ['#F59E0B', '#D97706'],
  },
  {
    id: 'premium',
    title: 'Premium Wash',
    subtitle: 'Delicate fabrics',
    price: 'From ₹25/piece',
    icon: Star,
    gradient: ['#8B5CF6', '#7C3AED'],
  },
];

const quickActions = [
  { id: 'track', emoji: '📋', text: 'Track Order' },
  { id: 'repeat', emoji: '🔄', text: 'Repeat Order' },
  { id: 'support', emoji: '💬', text: 'Support' },
  { id: 'rate', emoji: '⭐', text: 'Rate Us' },
  { id: 'settings', emoji: '⚙️', text: 'Settings' },
  { id: 'offers', emoji: '🎁', text: 'Offers' },
];

// Mock saved addresses
const savedAddresses = [
  {
    id: '1',
    label: 'Home',
    address: 'Room No-402, Sri Medha Boys Pg Hostel, Dannaiah Street, Near Ramalayam Temple',
    phone: '+91-7995668139',
    distance: '0 m',
  },
  {
    id: '2',
    label: 'Home',
    address: 'Stanza hostel (Sai chalapathi hostel), Seshamsetti Rd, Vaddeswaram',
    phone: '+91-7995668139',
    distance: '6.7 km',
  },
  {
    id: '3',
    label: 'Home',
    address: 'K-43, Vivekananda Boys Hostel, Vaddeswaram Bridge, Vaddeswaram',
    phone: '+91-7995668139',
    distance: '6.9 km',
  },
];

export default function HomeScreen() {
  const [liveLocation, setLiveLocation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLiveLocation('Permission denied');
        setLoading(false);
        return;
      }

      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10 },
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          let reverse = await Location.reverseGeocodeAsync({ latitude, longitude });
          if (reverse.length > 0) {
            const addr = reverse[0];
            setLiveLocation(
              `${addr.name || ''} ${addr.street || ''}, ${addr.city || ''}`.trim()
            );
          } else {
            setLiveLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          }
          setLoading(false);
        }
      );
    })();
  }, []);

  if (showLocationPicker) {
    const filteredAddresses = savedAddresses.filter((addr) =>
      addr.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <SafeAreaView style={pickerStyles.container}>
        <TouchableOpacity
          style={pickerStyles.closeButton}
          onPress={() => setShowLocationPicker(false)}
        >
          <ChevronDown size={24} color="#2C63D6" />
          <Text style={pickerStyles.closeText}>Close</Text>
        </TouchableOpacity>

        <Text style={pickerStyles.title}>Select a location</Text>

        <View style={pickerStyles.searchBox}>
          <TextInput
            placeholder="Search for area, street name..."
            placeholderTextColor="#9CA3AF"
            style={pickerStyles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity style={pickerStyles.quickOption}>
          <Text style={pickerStyles.quickOptionTextPrimary}>📍 Use current location</Text>
          <Text style={pickerStyles.quickOptionSubText}>Nagar, Benz Circle, Vijayawada</Text>
        </TouchableOpacity>

        <TouchableOpacity style={pickerStyles.quickOption}>
          <Text style={pickerStyles.quickOptionTextSecondary}>➕ Add Address</Text>
        </TouchableOpacity>

        <TouchableOpacity style={pickerStyles.quickOption}>
          <Text style={pickerStyles.quickOptionTextSecondary}>
            🏷️ Import addresses from Blinkit
          </Text>
        </TouchableOpacity>

        <Text style={pickerStyles.savedLabel}>SAVED ADDRESSES</Text>

        <FlatList
          data={filteredAddresses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={pickerStyles.addressCard}>
              <View style={pickerStyles.addressHeader}>
                <Text style={pickerStyles.addressLabel}>{item.label}</Text>
                <View style={pickerStyles.distanceBadge}>
                  <Text style={pickerStyles.distanceText}>{item.distance}</Text>
                </View>
              </View>
              <Text style={pickerStyles.addressText} numberOfLines={2}>
                {item.address}
              </Text>
              <Text style={pickerStyles.phoneText}>Phone: {item.phone}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={{ color: '#9CA3AF', marginTop: 20, textAlign: 'center' }}>
              No addresses found.
            </Text>
          }
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.locationContainer}
            activeOpacity={0.7}
            onPress={() => setShowLocationPicker(true)}
          >
            <MapPin size={20} color="#4A90E2" />
            {loading ? (
              <ActivityIndicator
                size="small"
                color="#4A90E2"
                style={{ marginLeft: 8 }}
              />
            ) : (
              <Text style={styles.locationText} numberOfLines={1}>
                {liveLocation || 'Location not available'}
              </Text>
            )}
            <ChevronDown size={20} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.greeting}>Hello, John! 👋</Text>
        </View>

        {/* Promo Banner */}
        <LinearGradient
          colors={['#4A90E2', '#357ABD']}
          style={styles.promoBanner}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>First Order 50% OFF!</Text>
            <Text style={styles.promoSubtitle}>Use code: WASH50</Text>
            <TouchableOpacity style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.promoIcon}>
            <Text style={styles.promoEmoji}>🧺</Text>
          </View>
        </LinearGradient>

        {/* Services */}
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          <View style={styles.servicesGrid}>
            {serviceCategories.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCard}
                onPress={() => router.push(`/booking/clothes-selection?service=${service.id}`)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={service.gradient}
                  style={styles.serviceIconContainer}
                >
                  <service.icon size={24} color="#FFFFFF" />
                </LinearGradient>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceSubtitle}>{service.subtitle}</Text>
                <Text style={styles.servicePrice}>{service.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionCard}
              >
                <Text style={styles.quickActionEmoji}>{action.emoji}</Text>
                <Text style={styles.quickActionText}>{action.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const pickerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  closeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  closeText: {
    color: '#2C63D6',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  title: {
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 14,
    color: '#111827',
  },
  searchBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
  },
  searchInput: {
    fontSize: 16,
    color: '#1E40AF',
  },
  quickOption: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    marginBottom: 12,
  },
  quickOptionTextPrimary: {
    color: '#2563EB',
    fontWeight: '700',
    fontSize: 16,
  },
  quickOptionTextSecondary: {
    color: '#2563EB',
    fontWeight: '600',
    fontSize: 16,
  },
  quickOptionSubText: {
    color: '#2563EB',
    fontSize: 13,
    marginTop: 4,
  },
  savedLabel: {
    fontWeight: '600',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    marginTop: 24,
    letterSpacing: 1.25,
  },
  addressCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  addressLabel: {
    fontWeight: '700',
    fontSize: 16,
    color: '#111827',
  },
  distanceBadge: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  distanceText: {
    fontWeight: '700',
    fontSize: 12,
    color: '#2563EB',
  },
  addressText: {
    fontSize: 14,
    color: '#374151',
  },
  phoneText: {
    marginTop: 6,
    fontSize: 13,
    color: '#6B7280',
  },
});


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { padding: 20, paddingBottom: 10 },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
    marginRight: 4,
    flex: 1,
  },
  greeting: { fontSize: 24, color: '#111827', fontWeight: '700' },
  promoBanner: {
    margin: 20,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoContent: { flex: 1 },
  promoTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 4,
  },
  promoSubtitle: { fontSize: 14, color: '#E5F3FF', marginBottom: 12 },
  promoButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  promoButtonText: { fontSize: 14, color: '#4A90E2', fontWeight: '600' },
  promoIcon: { marginLeft: 16 },
  promoEmoji: { fontSize: 40 },
  servicesSection: { padding: 20 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
  },
  serviceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  serviceTitle: { fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 4 },
  serviceSubtitle: { fontSize: 12, color: '#6B7280', marginBottom: 8 },
  servicePrice: { fontSize: 14, fontWeight: '600', color: '#4A90E2' },
  quickActionsSection: { padding: 20, paddingTop: 0 },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  quickActionEmoji: { fontSize: 24, marginBottom: 8 },
  quickActionText: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    fontWeight: '500',
  },
});
