import BackButton from "@/components/BackButton";
import OvalButton from "@/components/OvalButton";
import { router, Stack, useLocalSearchParams } from "expo-router";
import moment from "moment";
import React from "react";
import { Text, View, ImageBackground, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import BookingBottomSheet from "@/components/BookingBottomSheet";

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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "900" }}
                >
                  {roomName}
                </Text>
                <Text style={{ color: "white", fontSize: 14 }}>
                  {roomCategory}
                </Text>
              </View>
              <OvalButton
                text="Book Now"
                color="#2B32B2"
                height={40}
                width={183}
                onPress={handlePresentModalPress}
              />
            </View>
          </ImageBackground>
          <View style={{ padding: 20, gap: 20 }}>
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
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
