import { View, Alert, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import * as SplashScreen from "expo-splash-screen";

import { supabase } from "@/utils/supabase";

type Props = {
  size: number;
  url: string | null;
  onUpload: (filePath: string) => void;
};

const Avatar = ({ size, url, onUpload }: Props) => {
  const [uploading, setUploading] = React.useState(false);
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);
  const avatarSize = { height: size, width: size };

  React.useEffect(() => {
    if (url) {
      downloadImage(url)
        .then(() => {
          console.log("Image downloaded successfully");
          SplashScreen.hideAsync();
          console.log("Successfully loaded");
        })
        .catch((error) => {
          console.error("Error downloading image:", error);
        });
    }
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);

      if (error) throw error;

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result as string);
      };
    } catch (e) {
      if (e instanceof Error) {
        console.log("Error downloading image: ", e.message);
      }
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: false,
        allowsEditing: true,
        quality: 1,
        exif: false,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log("User Cancel image picker");
        return;
      }

      const image = result.assets[0];
      console.log("Got image");

      if (!image.uri) {
        throw new Error("No image uri!");
      }

      const arrayBuffer = await fetch(image.uri).then((res) =>
        res.arrayBuffer()
      );

      const fileExt = image.uri?.split(".").pop()?.toLowerCase() ?? "jpeg";
      const path = `${Date.now()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, arrayBuffer, {
          contentType: image.mimeType ?? "image/jpeg",
        });

      if (uploadError) throw uploadAvatar;

      onUpload(data.path);
    } catch (e) {
      if (e instanceof Error) {
        Alert.alert(e.message);
      } else {
        throw e;
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <Pressable onPress={uploadAvatar} disabled={uploading}>
      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          style={[avatarSize, styles.avatar, styles.image]}
        />
      ) : (
        <View style={[avatarSize, styles.avatar, styles.noImage]} />
      )}
      <View></View>
    </Pressable>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 50,
    overflow: "hidden",
    maxWidth: "100%",
  },
  image: {
    objectFit: "cover",
    paddingTop: 0,
  },
  noImage: {
    backgroundColor: "#333",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(200, 200, 200)",
    borderRadius: 50,
  },
});
