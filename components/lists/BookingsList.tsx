import React from "react";
import { FlatList } from "react-native";

import BookedCard from "../cards/BookedCard";
import EmptyDisplay from "../EmptyDisplay";
import { useDeleteBookedRooms } from "@/hooks/queries/bookedRooms/useDeleteBookedRooms";
import { useFetchBookedRooms } from "@/hooks/queries/bookedRooms/useFetchBookedRooms";
import { useUpdateBookedRoomStatus } from "@/hooks/queries/bookedRooms/useUpdateBookedRooms";
import moment from "moment";

const BookingsList = () => {
  const { data: bookedRooms } = useFetchBookedRooms();
  const timeNow = moment().format("LT");

  bookedRooms?.map(async (i) => {
    console.log(i.time_out);
    console.log(i.status);

    if (i.time_out && i.time_out <= timeNow) {
      useUpdateBookedRoomStatus();
      console.log("happening");
    }
  });

  useUpdateBookedRoomStatus();
  useDeleteBookedRooms();

  //   React.useEffect(() => {
  //     const updateBookedRooms = async () => {
  //       await useUpdateBookedRoomStatus();
  //     };
  //     updateBookedRooms();
  //   }, []);

  //   React.useEffect(() => {
  //     const deleteBookedRooms = async () => {
  //       await useDeleteBookedRooms();
  //     };
  //     deleteBookedRooms();
  //   }, []);

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
