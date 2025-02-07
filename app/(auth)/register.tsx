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
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function checkPassword(str: string) {
    let re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
    return re.test(str);
  }

  function checkEmail(str: string) {
    let re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(str);
  }

  const handleEmail = (text: string) => {
    setEmail(text);
    if (checkEmail(text)) {
      setErrorEmail("");
    } else {
      setErrorEmail("Not an email format, should be @example.com");
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (checkPassword(text)) {
      setErrorMessage("");
    } else {
      setErrorMessage(
        "Password should contain: a-Z, 0-9, and at least a special character"
      );
    }
  };

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
      phone: phone,
    });

    // if (error) Alert.alert(error.message);
    // if (!session)
    //   Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeBackgroundStyle.backgroundColor,
        paddingTop: 150,
        gap: 75,
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
          onChangeText={handleEmail}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
          errorStyle={{ color: "red" }}
          errorMessage={errorEmail}
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
          label="Mobile Number"
          leftIcon={{
            type: "font-awesome",
            name: "phone",
            size: 14,
            color: "#636c72",
          }}
          labelStyle={{ fontSize: 14 }}
          onChangeText={(text) => setPhone(text)}
          value={phone}
          placeholder="+639123456789"
          autoCapitalize={"none"}
          errorStyle={{ color: "red" }}
          errorMessage={""}
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
          onChangeText={handlePasswordChange}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
          errorStyle={{ color: "red" }}
          errorMessage={errorMessage}
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
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
          containerStyle={{
            width: "90%",
            borderRadius: 10,
            marginHorizontal: 10,
            marginBottom: 20,
            marginTop: 50,
          }}
        />
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
