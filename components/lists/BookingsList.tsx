import React from "react";
import { FlatList } from "react-native";

import { Tables } from "@/database.types";
import BookedCard from "../cards/BookedCard";
import EmptyDisplay from "../EmptyDisplay";
import {
  useBookedRoomsSubscription,
  useFetchBookedRooms,
} from "@/hooks/queries/bookedRooms/useFetchBookedRooms";
import { useDeleteBookedRooms } from "@/hooks/queries/bookedRooms/useDeleteBookedRooms";

type BookedRooms = Tables<"booked_rooms">;

const BookingsList = () => {
  const { data: initBookedRooms, isLoading, error } = useFetchBookedRooms();
  const [bookedRooms, setBookedRooms] = React.useState<BookedRooms[]>([]);

  //FIXME: Seperate file
  React.useEffect(() => {
    if (initBookedRooms) {
      setBookedRooms(initBookedRooms);
    }
  }, [initBookedRooms]);

  useBookedRoomsSubscription(setBookedRooms);

  //FIXME: Seperate file
  React.useEffect(() => {
    const deleteDoneRooms = async () => {
      const doneRooms = bookedRooms.filter((room) => room.status === "done");
      if (doneRooms.length > 0) {
        await useDeleteBookedRooms();
        setBookedRooms((prevRooms) =>
          prevRooms.filter((room) => room.status !== "done")
        );
      }
    };
    deleteDoneRooms();
  }, [bookedRooms]);

  return (
    <>
      {bookedRooms && bookedRooms.length > 0 ? (
        <FlatList
          key={bookedRooms.length}
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
