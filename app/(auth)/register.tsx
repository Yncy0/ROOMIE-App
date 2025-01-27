import React, { useState } from "react";
import { Alert, StyleSheet, View, AppState, Image, Text } from "react-native";
import { supabase } from "@/utils/supabase";
import { Button, Input } from "@rneui/themed";
import { router, Stack } from "expo-router";
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

//TODO: NIST STANDARDS ON INPUT
//TODO: Put asterisk indication on required fields

export default function Auth() {
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { themeBackgroundStyle, themeInputStyle, themeTextStyle } =
    useThemeColor();

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      phone: number,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeBackgroundStyle.backgroundColor,
        paddingTop: 50,
        gap: 75,
        justifyContent: "center",
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
        {/* <Image
          source={require("@/assets/images/roomie-icon.png")}
          style={{
            width: 200,
            height: 200,
            alignSelf: "center",
            marginBottom: 20,
          }}
        /> */}
        <Text style={{ fontSize: 24, fontWeight: "bold", paddingBottom: 25 }}>
          Register
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
            marginBottom: 50,
          }}
        />
        <Button
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
          containerStyle={{
            width: "90%",
            borderRadius: 10,
            marginHorizontal: 10,
            marginBottom: 20,
          }}
        />
        <Text style={{ paddingBottom: 40 }}>Do you have an account?</Text>
        <Button
          title="Login"
          disabled={loading}
          onPress={() => router.replace("/(auth)/login")}
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
