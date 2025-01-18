import React from "react";
import { FlatList } from "react-native";

import BookedCard from "../cards/BookedCard";
import EmptyDisplay from "../EmptyDisplay";
import {
  useDeleteBookedRooms,
  useDeleteBookedRoomsR,
} from "@/hooks/queries/bookedRooms/useDeleteBookedRooms";
import {
  useFetchBookedRooms,
  useFetchBookedRoomsR,
} from "@/hooks/queries/bookedRooms/useFetchBookedRooms";
import {
  useUpdateBookedRoomStatus,
  useUpdateBookedRoomStatusR,
} from "@/hooks/queries/bookedRooms/useUpdateBookedRooms";
import moment from "moment";

const BookingsList = () => {
  const { bookedRooms, loading, error } = useFetchBookedRoomsR();

  useUpdateBookedRoomStatusR();
  useDeleteBookedRoomsR();

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
