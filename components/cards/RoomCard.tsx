import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { ImageBackground } from "expo-image";

type Props = {
  items: any;
  width?: number;
  height?: number;
  onPress?: () => void;
};

export default function RoomCard({ items, onPress, width, height }: Props) {
  return (
    <Pressable onPress={onPress}>
      <ImageBackground
        source={
          items.room_image
            ? { uri: items.room_image }
            : require("@/assets/images/image-placeholder.png")
        }
        style={[styles.imageBackground, { width: width, height: height }]}
        imageStyle={{ borderRadius: 10 }}
      >
        <Text style={styles.header1}>{items.room_name}</Text>
        <Text style={styles.header2}>{items.room_type}</Text>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    justifyContent: "flex-end",
    padding: 10,
    elevation: 10,
  },
  header1: {
    color: "#fff",
    bottom: 0,
    left: 0,
    fontSize: 24,
    fontWeight: "700",
  },
  header2: {
    color: "#fff",
    bottom: 0,
    left: 0,
    fontSize: 16,
  },
});
