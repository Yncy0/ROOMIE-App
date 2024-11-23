import React from "react";
import { Text, View, TextInput } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function Index() {
  const [text, onChangeText] = React.useState<string>('');

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff"
        }}
      >
        <TextInput
          style={{
            height: 40,
            margin: 12,
            width: 190,
            borderWidth: 1,
            padding:10,
          }}
          placeholder="Search"
          value={text}
          onChangeText={onChangeText}
        />
        
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
