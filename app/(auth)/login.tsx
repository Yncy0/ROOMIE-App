import React, { useState } from "react";
import { Alert, StyleSheet, View, AppState, Image, Text } from "react-native";
import { supabase } from "@/utils/supabase";
import { Button, Input } from "@rneui/themed";
import { router, Stack } from "expo-router";
import useThemeColor from "@/hooks/useThemeColor";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to reckeive
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeBackgroundStyle.backgroundColor,
        paddingTop: 50,
        alignItems: "center",
      }}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={{
          paddingHorizontal: 10,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Image
          source={require("@/assets/images/roomie-icon.png")}
          style={{
            width: 150,
            height: 150,
            alignSelf: "center",
            marginBottom: 20,
          }}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold", paddingBottom: 25 }}>
          Login
        </Text>
        <Input
          label="Email"
          leftIcon={{
            type: "font-awesome",
            name: "envelope",
            size: 14,
            color: "#636c72",
          }}
          labelStyle={{ fontSize: 14 }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
          inputStyle={{ fontSize: 14, color: themeTextStyle.color }}
          inputContainerStyle={{
            width: "100%",
            borderBottomWidth: 0,
            backgroundColor: themeInputStyle.backgroundColor,
            paddingHorizontal: 15,
            borderRadius: 10,
            gap: 10,
          }}
        />
        <Input
          label="Password"
          leftIcon={{
            type: "font-awesome",
            name: "lock",
            color: "#636c72",
            size: 20,
          }}
          labelStyle={{ fontSize: 14 }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
          inputStyle={{ fontSize: 14, color: themeTextStyle.color }}
          inputContainerStyle={{
            width: "100%",
            borderBottomWidth: 0,
            backgroundColor: themeInputStyle.backgroundColor,
            paddingHorizontal: 15,
            borderRadius: 10,
            gap: 10,
          }}
        />
        <Button
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
          containerStyle={{
            width: "90%",
            borderRadius: 10,
            marginHorizontal: 10,
            marginBottom: 20,
          }}
        />
        <Button
          title="Register"
          disabled={loading}
          onPress={() => router.replace("/(auth)/register")}
          color={"black"}
          containerStyle={{
            width: "90%",
            borderRadius: 10,
            marginHorizontal: 10,
            marginBottom: 50,
          }}
        />
      </View>
    </View>
  );
}
