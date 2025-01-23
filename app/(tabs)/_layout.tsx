import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";

import HeaderHome from "@/components/HeaderHome";
import { useAuth } from "@/providers/AuthProvider";
import { primaryColor, primaryColor1 } from "@/constants/Colors";
import useColorTheme from "@/hooks/useColorTheme";

export default function TabLayout() {
  const { isAuthenticated } = useAuth();

  const { themeContainerStyle, themeTextStyle } = useColorTheme();

  if (!isAuthenticated) return <Redirect href="/(auth)/login" />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: primaryColor1,
        headerShadowVisible: false,
        headerTintColor: "black",
        headerShown: true,
        tabBarStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: () => <HeaderHome />,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: "Schedule",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "calendar-sharp" : "calendar-outline"}
              color={color}
              size={24}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            console.log("Schedule tab pressed", e);
          },
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: "Booking",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "add-sharp" : "add-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "notifications-sharp" : "notifications-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person-sharp" : "person-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
