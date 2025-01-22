import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Input, XStack, Button } from "tamagui";

import { supabase } from "@/utils/supabase";
import PressableText from "@/components/buttons/PressableText";
import useFetchProfiles from "@/hooks/queries/profiles/useFetchProfiles";
import Avatar from "@/components/Avatar";
import { useUpdateProfiles } from "@/hooks/queries/profiles/useUpdateProfile";
import ProfileInput from "@/components/inputs/ProfileInput";

export default function Profile() {
  const { username, setUsername, avatarUrl, setAvatarUrl } = useFetchProfiles();
  const updateProfiles = useUpdateProfiles();

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
            <Avatar
              size={100}
              url={avatarUrl}
              onUpload={(url: string) => {
                setAvatarUrl(url);
                updateProfiles(username, avatarUrl);
              }}
            />
            <XStack>
              <Input
                value={username || ""}
                onChangeText={(text) => setUsername(text)}
              />
              <Button
                icon={<Ionicons name={"pencil"} />}
                onPress={() => updateProfiles(username, avatarUrl)}
              />
            </XStack>
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
