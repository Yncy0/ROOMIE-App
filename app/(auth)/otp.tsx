import { View, Text, Alert } from "react-native";
import React from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import useThemeColor from "@/hooks/useThemeColor";
import { Button, Input } from "@rneui/themed";
import { supabase } from "@/utils/supabase";

//FIXME: Change to OTP email
const otp = () => {
  const { email, phone, password } = useLocalSearchParams<{
    email: string;
    phone: string;
    password: string;
  }>();

  const [loading, setLoading] = React.useState(false);
  const [otp, setOtp] = React.useState("");

  const { themeBackgroundStyle, themeTextStyle, themeInputStyle } =
    useThemeColor();

  async function sendOtp() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithOtp({
      phone,
    });

    if (error) throw error;
    console.log("im pressing");

    console.log(data);
    setLoading(false);
  }

  async function verifyOtp() {
    setLoading(true);
    const { data, error: otp } = await supabase.auth.verifyOtp({
      phone,
      token: password,
      type: "sms",
    });

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      phone: phone,
    });

    if (error) throw error;
    if (otp) throw otp;

    console.log(data);
    setLoading(false);
  }

  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        },
        themeBackgroundStyle,
      ]}
    >
      <Stack.Screen name="Verify OTP" options={{ headerShown: false }} />
      <Text>OTP</Text>

      <Input
        label="Mobile Number"
        leftIcon={{
          type: "font-awesome",
          name: "phone",
          size: 14,
          color: "#636c72",
        }}
        labelStyle={{ fontSize: 14 }}
        onChangeText={(text) => setOtp(text)}
        value={otp}
        placeholder="+639123456789"
        autoCapitalize={"none"}
        errorStyle={{ color: "red" }}
        errorMessage={"Please fill up the otp"}
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
        title="Send OTP"
        disabled={loading}
        onPress={() => sendOtp()}
        containerStyle={{
          width: "90%",
          borderRadius: 10,
          marginHorizontal: 10,
          marginBottom: 20,
          marginTop: 50,
        }}
      />

      <Button
        title="Verify OTP"
        disabled={loading}
        onPress={() => verifyOtp()}
        containerStyle={{
          width: "90%",
          borderRadius: 10,
          marginHorizontal: 10,
          marginBottom: 20,
          marginTop: 50,
        }}
      />
    </View>
  );
};

export default otp;
