import PressableText from "@/components/PressableText";
import { useAuth } from "@/context/AuthProvider";
import { supabase } from "@/utils/supabase";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const [profilePic, hasProfilePic] = React.useState<boolean>(false);

  const { session } = useAuth();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {!profilePic && (
            <View 
              style={{
                flex: 1, 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: 7,
                width: '100%',
                paddingBottom: 50
              }}>
              <Ionicons name={'person-circle-sharp'} size={80}/>
              <Text>Hello User!</Text>
            </View>
          )}
          <PressableText text="User Information"/>
          <PressableText text="Privacy and Security"/>
          <PressableText text="Settings"/>
          <PressableText text="Logout" onPress={() => supabase.auth.signOut()}/>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
