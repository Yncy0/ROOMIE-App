import React from "react";
import { FlatList } from "react-native";

import BookedCard from "../cards/BookedCard";
import EmptyDisplay from "../EmptyDisplay";
import {
  setBookedRoomsStatus,
  useDeleteBookedRooms,
} from "@/hooks/queries/useDeleteBookedRooms";
import { useFetchBookedRooms } from "@/hooks/queries/useFetchBookedRooms";

const BookingsList = () => {
  const { data: bookedRooms } = useFetchBookedRooms();

  bookedRooms?.map(async (items) => {
    items.status && setBookedRoomsStatus(items.status);

    if (items.status === "done") {
      useDeleteBookedRooms();
    }
  });

  return (
    <>
      {bookedRooms && bookedRooms.length > 0 ? (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 20,
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
          initialNumToRender={7}
          data={bookedRooms}
          renderItem={({ item }) => <BookedCard items={item} key={item.id} />}
        />
      ) : (
        <EmptyDisplay />
      )}
    </>
  );
};

export default BookingsList;
