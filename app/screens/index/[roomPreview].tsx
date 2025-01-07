import React from "react";
import { ImageBackground, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router, Stack, useLocalSearchParams } from "expo-router";
import moment from "moment";
import { View, Text, Button } from "tamagui";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import BookingBottomSheet from "@/components/BookingBottomSheet";
import BackButton from "@/components/BackButton";

export default function RoomPreview() {
  const { roomName, roomCategory, roomImage, customRoute } =
    useLocalSearchParams<{
      roomName: string;
      roomCategory: string;
      roomImage: string;
      customRoute: any;
    }>();

  const bottomSheetMoadlRef = React.useRef<BottomSheetModal>(null);

  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetMoadlRef.current?.present();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <BottomSheetModalProvider>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground
            source={{ uri: roomImage }}
            style={{
              height: 275,
              padding: 20,
              justifyContent: "space-between",
            }}
          >
            <BackButton
              onPress={() => router.replace({ pathname: customRoute })}
            />
            <View fd={"row"} jc={"space-between"} ai={"center"}>
              <View>
                <Text col={"$white1"} fos={20} fow={"bold"}>
                  {roomName}
                </Text>
                <Text col={"$white1"} fos={14}>
                  {roomCategory}
                </Text>
              </View>
              <Button
                bg={"$blue10"}
                color={"$white1"}
                onPress={handlePresentModalPress}
                br={"$radius.2"}
                miw={183}
              >
                Book Now
              </Button>
            </View>
          </ImageBackground>
          <View p={20} gap={20}>
            <Text>DESCRIPTION</Text>
            <Text
              style={{
                borderBottomColor: "#2B32B2",
                borderBottomWidth: 1,
                paddingBottom: 10,
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              soluta aliquid consequuntur dolorum modi nesciunt dignissimos quas
              mollitia aspernatur aut. Possimus veniam repudiandae
              exercitationem ipsa reprehenderit sequi architecto molestiae
              repellat!
            </Text>
            <Text>Today's Booking</Text>
            <View fd={"row"} ai={"center"} jc={"space-between"}>
              <Text>Today</Text>
              <Text>{moment().format("dddd, DD, MMM YYYY")}</Text>
            </View>
          </View>
        </ScrollView>
        {/*BOTTOM SHEET MODAL*/}
        <BottomSheetModal ref={bottomSheetMoadlRef}>
          <BookingBottomSheet />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
