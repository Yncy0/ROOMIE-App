import React from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";

import { supabase } from "@/utils/supabase";
import PressableText from "@/components/buttons/PressableText";
import useFetchProfiles from "@/hooks/queries/profiles/useFetchProfiles";
import Avatar from "@/components/Avatar";
import { useUpdateProfiles } from "@/hooks/queries/profiles/useUpdateProfile";
import ProfileInput from "@/components/inputs/ProfileInput";
import useThemeColor from "@/hooks/useThemeColor";
import ProfileSkeletonLoader from "@/components/loader/ProfileSkeletonLoader";

export default function Profile() {
  const { username, setUsername, avatarUrl, setAvatarUrl, loading } =
    useFetchProfiles();
  const updateProfiles = useUpdateProfiles();
  const { themeContainerStyle, themeBackgroundStyle } = useThemeColor();

  React.useEffect(() => {
    if (!loading) {
      console.log("profile.tsx loaded!", loading);

      SplashScreen.hideAsync();
      console.log("hide SplashScreen profile.tsx");
    } else {
      console.log("profile.tsx still loading");
    }
  }, [loading]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, themeBackgroundStyle]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.containerColumn}>
            {loading ? (
              <ProfileSkeletonLoader />
            ) : (
              <>
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
              </>
            )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerColumn: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
    minWidth: "100%",
    paddingBottom: 50,
  },
});
