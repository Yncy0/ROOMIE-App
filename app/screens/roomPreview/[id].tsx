import React from "react";
import {
  ImageBackground,
  ScrollView,
  View,
  Button,
  Text,
  BackHandler,
  StyleSheet,
  FlatList,
} from "react-native";
import {
  GestureHandlerRootView,
  Pressable,
} from "react-native-gesture-handler";
import { router, Stack, useLocalSearchParams } from "expo-router";
import dayjs from "dayjs";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { primaryColor } from "@/constants/Colors";
import BookingBottomSheet from "@/components/BookingBottomSheet";
import BackButton from "@/components/buttons/BackButton";
import ScheduleText from "@/components/ScheduleText";
import EmptyDisplay from "@/components/EmptyDisplay";
import { useFetchScheduleWithRoom } from "@/hooks/queries/schedule/useFetchSchedule";
import { useFetchBookedRoomsWithRooms } from "@/hooks/queries/bookedRooms/useFetchBookedRooms";
import useSubscriptionSchedule from "@/hooks/queries/schedule/useSubscription";
import useSubscriptionBookedRoom from "@/hooks/queries/bookedRooms/useSubscription";
import useThemeColor from "@/hooks/useThemeColor";
import { formatCompleteDate } from "@/utils/timeUtils";
import { pressBack } from "@/utils/pressBack";
import { useFetchRoomsWithId } from "@/hooks/queries/useFetchRooms";
import { useUpdateRoomStatus } from "@/hooks/queries/useUpdateRooms";
import IconButton from "@/components/buttons/IconButton";
import { subscriptionRooms } from "@/hooks/queries/useSubscriptionRooms";
import FABReport from "@/components/buttons/FABReport";
import BookedCard from "@/components/cards/BookedCard";
import BookingSkeletonLoader from "@/components/loader/BookingSkeletonLoader";

export default function RoomPreview() {
  const { id, image, customRoute } = useLocalSearchParams<{
    id: any;
    image: any;
    customRoute: any;
  }>();
  const day = dayjs().format("dddd");

  const { themeBackgroundStyle, themeTextStyle, themeHandler } =
    useThemeColor();

  const { data: schedule, isLoading: isScheduleLoading } =
    useFetchScheduleWithRoom(day, id);
  const { data: bookedRooms, isLoading: bookedRoomsLoading } =
    useFetchBookedRoomsWithRooms(id);
  const { data } = useFetchRoomsWithId(id);

  const bottomSheetMoadlRef = React.useRef<BottomSheetModal>(null);

  subscriptionRooms();
  useSubscriptionBookedRoom();
  useSubscriptionSchedule();

  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetMoadlRef.current?.present();
  }, []);

  // const handleStatusPress = () => {
  //   useUpdateRoomStatus(id, "AVAILABLE");
  // };

  const renderBackdrop = React.useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
      />
    ),
    []
  );

  pressBack(customRoute);

  return (
    <GestureHandlerRootView style={[styles.container, themeBackgroundStyle]}>
      <BottomSheetModalProvider>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Stack.Screen options={{ headerShown: false }} />
          <ImageBackground
            source={{
              uri: image,
            }}
            style={styles.imageBackground}
          >
            <View style={styles.opaque}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <Text style={styles.header1}>{data?.room_name}</Text>
                  <Text style={styles.header2}>{data?.room_type}</Text>
                </View>
              </View>
              <View style={{ gap: 5 }}>
                <Pressable
                  style={styles.pressable}
                  onPress={handlePresentModalPress}
                >
                  <Text style={styles.text1}>Book Now</Text>
                </Pressable>
                <Pressable style={styles.pressable} onPress={() => {}}>
                  <Text style={styles.text1}>Status Test</Text>
                </Pressable>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.container1}>
            <View style={styles.container2}>
              <Text style={[styles.header3, themeTextStyle]}>
                Today's Booking
              </Text>
              {bookedRooms && bookedRooms.length > 0 ? (
                <FlatList
                  horizontal
                  keyExtractor={(item) => item.id.toString()}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.list}
                  data={bookedRooms}
                  renderItem={({ item }) =>
                    bookedRoomsLoading ? (
                      <BookingSkeletonLoader />
                    ) : (
                      <BookedCard items={item} />
                    )
                  }
                />
              ) : (
                <EmptyDisplay />
              )}
            </View>
            <View style={styles.container3}>
              <Text style={[styles.text2, themeTextStyle]}>
                Today's Schedule
              </Text>
              <Text style={[styles.text2, themeTextStyle]}>
                {formatCompleteDate()}
              </Text>
            </View>
            {schedule && schedule.length > 0 ? (
              schedule.map((item) => (
                <ScheduleText key={item.id} items={item} />
              ))
            ) : (
              <EmptyDisplay />
            )}
          </View>
          <FABReport />
        </ScrollView>
        <BottomSheetModal
          ref={bottomSheetMoadlRef}
          handleStyle={themeBackgroundStyle}
          handleIndicatorStyle={{
            backgroundColor: themeHandler.backgroundColor,
          }}
          backdropComponent={renderBackdrop}
        >
          <BookingBottomSheet
            roomId={id}
            roomName={data?.room_name as string}
            roomCategory={data?.room_type as string}
            roomImage={image}
          />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    height: 300,
    justifyContent: "flex-end",
  },
  opaque: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
  },
  header1: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  header2: {
    color: "white",
    fontSize: 14,
  },
  header3: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 15,
  },
  text1: {
    color: "white",
  },
  text2: {
    paddingHorizontal: 15,
  },
  pressable: {
    backgroundColor: primaryColor,
    borderRadius: 10,
    minWidth: 180,
    padding: 10,
    alignItems: "center",
  },
  container1: {
    paddingTop: 20,
    gap: 20,
  },
  container2: {
    gap: 5,
    flexDirection: "column",
  },
  container3: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  list: {
    gap: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
