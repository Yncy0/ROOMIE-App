import { useAuth } from "@/context/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";

export default function TabLayout() {
  const { isAuthenticated } = useAuth();  

  if (!isAuthenticated) return <Redirect href="/(auth)/login"/>

  return (
    <Tabs
      screenOptions={{
      tabBarActiveTintColor: '#2B32B2',
      headerShadowVisible: false,
      headerTintColor: 'black',
      headerShown: true,
      tabBarStyle: {
      backgroundColor: '#fff',
      },
    }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24}/>
          )
        }}
      />
      <Tabs.Screen 
        name="schedule" 
        options={{ 
          title: 'Schedule',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'calendar-sharp' : 'calendar-outline'} color={color} size={24}/>
          )
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          headerTitle: 'Notifications',
          headerTintColor: 'black',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'notifications-sharp' : 'notifications-outline'} color={color} size={24}/>
          )
        }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person-sharp' : 'person-outline'} color={color} size={24}/>
          )
        }}
      />
    </Tabs>
  );
}
