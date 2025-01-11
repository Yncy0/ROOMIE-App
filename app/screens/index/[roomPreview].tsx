import React from "react";
import { ImageBackground, Modal, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  router,
  Stack,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import moment from "moment";
import { View, Text, Button, XStack, YStack } from "tamagui";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import BackButton from "@/components/buttons/BackButton";
import { BookingBottomSheet } from "@/components/BookingBottomSheet";

export default function RoomPreview() {
  const { roomId, roomName, roomCategory, roomImage, customRoute } =
    useGlobalSearchParams<{
      roomId: any;
      roomName: string;
      roomCategory: string;
      roomImage: string;
      customRoute: any;
    }>();
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Stack.Screen options={{ headerShown: false }} />
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
            <XStack justifyContent={"space-between"} alignItems={"center"}>
              <YStack>
                <Text col={"$white1"} fos={20} fow={"bold"}>
                  {roomName}
                </Text>
                <Text col={"$white1"} fos={14}>
                  {roomCategory}
                </Text>
              </YStack>
              <Button
                bg={"$blue10"}
                color={"$white1"}
                onPress={handlePresentModalPress}
                br={"$radius.2"}
                miw={183}
              >
                Book Now
              </Button>
            </XStack>
          </ImageBackground>
          <View p={20} gap={20}>
            <Text>DESCRIPTION</Text>
            <Text bbc={"$gray1"} bbw={1} pb={10}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              soluta aliquid consequuntur dolorum modi nesciunt dignissimos quas
              mollitia aspernatur aut. Possimus veniam repudiandae
              exercitationem ipsa reprehenderit sequi architecto molestiae
              repellat!
            </Text>
            <Text>Today's Booking</Text>
            <XStack justifyContent={"space-between"} alignItems={"center"}>
              <Text>Today</Text>
              <Text>{moment().format("dddd, DD, MMM YYYY")}</Text>
            </XStack>
          </View>
        </ScrollView>
        <BottomSheetModal ref={bottomSheetModalRef}>
          <BookingBottomSheet roomId={roomId} />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
