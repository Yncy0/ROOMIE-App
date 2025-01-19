import React from "react";
import { FlatList } from "react-native";

import BookedCard from "../cards/BookedCard";
import EmptyDisplay from "../EmptyDisplay";
import {
  useBookedRoomSubscription,
  useFetchBookedRooms,
} from "@/hooks/queries/bookedRooms/useFetchBookedRooms";
import { useUpdateBookedRoomStatus } from "@/hooks/queries/bookedRooms/useUpdateBookedRooms";
import { useDeleteBookedRooms } from "@/hooks/queries/bookedRooms/useDeleteBookedRooms";

const BookingsList = () => {
  const { data: bookedRooms, isLoading, error } = useFetchBookedRooms();

  useBookedRoomSubscription();

  React.useEffect(() => {
    const interval = setInterval(() => {
      useUpdateBookedRoomStatus();
      console.log("UPDATED");
    }, 2000);
    return () => clearInterval(interval);
  }, [bookedRooms]);

  useDeleteBookedRooms();

  return (
    <>
      {bookedRooms && bookedRooms.length > 0 ? (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 20,
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
          initialNumToRender={7}
          data={bookedRooms}
          renderItem={({ item }) => (item ? <BookedCard items={item} /> : null)}
        />
      ) : (
        <EmptyDisplay />
      )}
    </>
  );
};

export default BookingsList;
