import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "@tamagui/core";

import { supabase } from "@/utils/supabase";
import PressableText from "@/components/buttons/PressableText";
import useFetchProfiles from "@/hooks/queries/useFetchProfiles";

export default function Profile() {
  const [profilePic, hasProfilePic] = React.useState<boolean>(false);

  const { username } = useFetchProfiles();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View f={1} ai={"center"} jc={"center"} gap={7} miw={"100%"} pb={50}>
            <Ionicons name={"person-circle-sharp"} size={80} />
            <Text>{username}</Text>
          </View>
          <PressableText text="User Information" />
          <PressableText text="Privacy and Security" />
          <PressableText text="Settings" />
          <PressableText
            text="Logout"
            onPress={() => supabase.auth.signOut()}
          />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
