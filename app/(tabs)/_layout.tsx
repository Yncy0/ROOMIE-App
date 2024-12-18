import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2B32B2',
        
        // headerStyle: {
        //   backgroundColor: '#25292e',
        // },
        headerShadowVisible: false,
        headerTintColor: 'black',
        headerShown: true,
        tabBarStyle: {
        backgroundColor: '#fff',
        },
      }}
      backBehavior="history"
    >
      <Tabs.Screen 
        name="home" 
        options={{ 
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24}/>
          )
        }}
        initialParams={{ screen: 'index' }}
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
