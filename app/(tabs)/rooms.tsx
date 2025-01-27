import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import useFetchRooms from "@/hooks/queries/useFetchRooms";
import RoomCard from "@/components/cards/RoomCard";
import useThemeColor from "@/hooks/useThemeColor";
import { router } from "expo-router";
import RoomSkeletonLoader from "@/components/loader/RoomsSkeletonLoader";
import * as SplashScreen from "expo-splash-screen";
import FilterRoomButton from "@/components/buttons/FilterRoomButton";
import IconButton from "@/components/buttons/IconButton";

const screenWidth = Dimensions.get("screen").width;

const Rooms = () => {
  const { data, isLoading, error } = useFetchRooms();
  const { themeTextStyle, themeBackgroundStyle } = useThemeColor();

  const [filterType, setFilterType] = React.useState<any | null>(null);

  React.useEffect(() => {
    if (error) {
      console.error("Error fetching rooms:", error);
      SplashScreen.hideAsync();
      return;
    }

    if (!isLoading) {
      console.log("rooms.tsx loaded");
      SplashScreen.hideAsync();
      console.log("Hide SplashScreen rooms.tsx");
    } else {
      console.log("rooms.tsx is still loading");
    }
  }, [isLoading, error]);

  console.log(filterType);

  if (filterType === "ascend") {
    data?.sort((a, b) => {
      if (!a.room_name) return 1;
      if (!b.room_name) return -1;
      return a.room_name.localeCompare(b.room_name);
    });
  } else if (filterType === "descend") {
    data?.sort((a, b) => {
      if (!a.room_name) return 1;
      if (!b.room_name) return -1;
      return b.room_name.localeCompare(a.room_name);
    });
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, themeBackgroundStyle]}>
        <View style={styles.headerWrapper}>
          <Text style={themeTextStyle}>Available Rooms</Text>
          <FilterRoomButton
            filterType={filterType}
            setFilterType={setFilterType}
          />
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            isLoading ? (
              <RoomSkeletonLoader />
            ) : (
              <RoomCard
                key={item.id}
                items={item}
                width={screenWidth / 2 - 20}
                height={200}
                onPress={() =>
                  router.replace({
                    pathname: "/screens/roomPreview/[id]",
                    params: {
                      id: item.id,
                      roomName: item.room_name,
                      roomCategory: item.room_type,
                      roomImage: item.room_image,
                      customRoute: "/(tabs)/rooms",
                    },
                  })
                }
              />
            )
          }
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-around" }}
          contentContainerStyle={{ gap: 20, padding: 5 }}
          showsVerticalScrollIndicator={false}
          initialNumToRender={15}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Rooms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
