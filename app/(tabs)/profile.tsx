import React from "react";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { supabase } from "@/utils/supabase";
import PressableText from "@/components/buttons/PressableText";
import useFetchProfiles from "@/hooks/queries/profiles/useFetchProfiles";
import Avatar from "@/components/Avatar";
import { useUpdateProfiles } from "@/hooks/queries/profiles/useUpdateProfile";
import ProfileInput from "@/components/inputs/ProfileInput";
import useThemeColor from "@/hooks/useThemeColor";

export default function Profile() {
  const { username, setUsername, avatarUrl, setAvatarUrl } = useFetchProfiles();
  const updateProfiles = useUpdateProfiles();
  const { themeContainerStyle, themeTextStyle } = useThemeColor();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[
          {
            flex: 1,
          },
          themeContainerStyle,
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "column",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
              minWidth: "100%",
              paddingBottom: 50,
            }}
          >
            <Avatar
              size={100}
              url={avatarUrl}
              onUpload={(url: string) => {
                setAvatarUrl(url);
                updateProfiles(username, avatarUrl);
              }}
            />
            <ProfileInput
              username={username}
              onChangeText={(text) => setUsername(text)}
              onPress={() => {
                updateProfiles(username, avatarUrl);
                Alert.alert("Profile Edited Successfully!");
              }}
            />
          </View>
          {/* <PressableText text="User Information" />
          <PressableText text="Privacy and Security" />
          <PressableText text="Settings" /> */}
          <PressableText
            text="Logout"
            onPress={() => supabase.auth.signOut()}
          />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
