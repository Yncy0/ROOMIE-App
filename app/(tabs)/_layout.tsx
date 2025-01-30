import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";

import HeaderHome from "@/components/HeaderHome";
import { useAuth } from "@/providers/AuthProvider";
import { primaryColor, primaryColor1 } from "@/constants/Colors";
import useThemeColor from "@/hooks/useThemeColor";
import { subscriptionNotification } from "@/hooks/queries/useSubscriptionNotification";

export default function TabLayout() {
  const { isAuthenticated } = useAuth();

  const { themeBackgroundStyle } = useThemeColor();

  if (!isAuthenticated) return <Redirect href="/(auth)/login" />;

  subscriptionNotification();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: primaryColor1,
        headerShadowVisible: false,
        headerShown: true,
        headerStyle: {
          backgroundColor: themeBackgroundStyle.backgroundColor,
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
              name={focused ? "book-sharp" : "book-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rooms"
        options={{
          title: "Rooms",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "layers-sharp" : "layers-outline"}
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
