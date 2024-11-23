import { Tabs } from "expo-router";


export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }}/>
      <Tabs.Screen name="schedule" options={{ title: 'Schedule' }}/>
      <Tabs.Screen name="profile" options={{ title: 'Profile' }}/>
    </Tabs>
  );
}
