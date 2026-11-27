import { Tabs } from 'expo-router';
import { Chrome, Home as HomeFilled, Package, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: '#9CA3AF',

        // ✅ OPTION 1: Floating footer (moved up)
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
          paddingTop: 8,
          paddingBottom: 8,
          height: 70,
          position: 'absolute', // make it float
          bottom: 15,           // move footer up (15px above bottom)
          left: 15,
          right: 15,
          borderRadius: 20,     // rounded corners
          elevation: 5,         // Android shadow
          shadowColor: '#000',  // iOS shadow
          shadowOpacity: 0.08,
          shadowRadius: 6,
        },

        // ✅ OPTION 2: Move icons only (uncomment to use)
        // tabBarIconStyle: {
        //   marginTop: -4, // move icons upward inside footer
        // },

        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color, focused }) =>
            focused ? (
              <HomeFilled size={size} color={color} />
            ) : (
              <HomeFilled size={size} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ size, color }) => <Package size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
