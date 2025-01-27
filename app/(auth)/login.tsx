import React, { useState } from "react";
import { Alert, StyleSheet, View, AppState, Image } from "react-native";
import { supabase } from "@/utils/supabase";
import { Button, Input } from "@rneui/themed";
import { Stack } from "expo-router";
import useThemeColor from "@/hooks/useThemeColor";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { themeBackgroundStyle, themeInputStyle, themeTextStyle } =
    useThemeColor();

  async function signInWithEmail() {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error("Sign-in error:", error.message); // Log to console for better debugging
        Alert.alert(error.message);
      }
    } catch (e) {
      console.error("Unexpected error:", e);
      Alert.alert("Unexpected error occurred");
    }
    setLoading(false);
  }

  // async function signUpWithEmail() {
  //   setLoading(true);
  //   const {
  //     data: { session },
  //     error,
  //   } = await supabase.auth.signUp({
  //     email: email,
  //     password: password,
  //   });

  //   if (error) Alert.alert(error.message);
  //   if (!session)
  //     Alert.alert("Please check your inbox for email verification!");
  //   setLoading(false);
  // }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeBackgroundStyle.backgroundColor,
        paddingTop: 50,
        gap: 75,
        justifyContent: "center",
      }}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={{
          paddingHorizontal: 10,
        }}
      >
        <Image
          source={require("@/assets/images/roomie-icon.png")}
          style={{
            width: 200,
            height: 200,
            alignSelf: "center",
            marginBottom: 20,
          }}
        />
        <Input
          label="Email"
          leftIcon={{
            type: "font-awesome",
            name: "envelope",
            size: 16,
            color: "#636c72",
          }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
          inputStyle={{ fontSize: 16, color: themeTextStyle.color }}
          inputContainerStyle={{
            borderBottomWidth: 0,
            backgroundColor: themeInputStyle.backgroundColor,
            paddingHorizontal: 15,
            borderRadius: 50,
            gap: 10,
          }}
        />
        <Input
          label="Password"
          leftIcon={{
            type: "font-awesome",
            name: "lock",
            color: "#636c72",
          }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
          inputStyle={{ fontSize: 16, color: themeTextStyle.color }}
          inputContainerStyle={{
            borderBottomWidth: 0,
            backgroundColor: themeInputStyle.backgroundColor,
            paddingHorizontal: 15,
            borderRadius: 50,
            gap: 10,
          }}
        />
      </View>
      <Button
        title="Sign in"
        disabled={loading}
        onPress={() => signInWithEmail()}
        containerStyle={{ borderRadius: 50, marginHorizontal: 20 }}
      />
      {/* <Button
        title="Sign up"
        disabled={loading}
        onPress={() => signUpWithEmail()}
        containerStyle={{ borderRadius: 50 }}
      /> */}
    </View>
  );
}
