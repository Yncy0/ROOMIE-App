import React from "react";
import { FlatList } from "react-native";

import { Tables } from "@/database.types";
import BookedCard from "../cards/BookedCard";
import EmptyDisplay from "../EmptyDisplay";
import {
  useBookedRoomsSubscription,
  useFetchBookedRooms,
} from "@/hooks/queries/bookedRooms/useFetchBookedRooms";
import { useUpdateBookedRoomStatus } from "@/hooks/queries/bookedRooms/useUpdateBookedRooms";
import { useDeleteBookedRooms } from "@/hooks/queries/bookedRooms/useDeleteBookedRooms";

type BookedRooms = Tables<"booked_rooms">;

const BookingsList = () => {
  const { data: initBookedRooms, isLoading, error } = useFetchBookedRooms();
  const [bookedRooms, setBookedRooms] = React.useState<BookedRooms[]>([]);

  // FIXME: seperate file
  React.useEffect(() => {
    if (initBookedRooms) {
      console.log("Fetched booked rooms:", initBookedRooms);
      setBookedRooms(initBookedRooms);
    }
  }, [initBookedRooms]);

  useBookedRoomsSubscription(setBookedRooms);

  // FIXME: seperate file
  const updateRoomStatus = async () => {
    try {
      const data = await useUpdateBookedRoomStatus();
      if (data) {
        console.log("Updated room status:", data);
        setBookedRooms((prevRooms) =>
          prevRooms.map(
            (room) =>
              data.find((updatedRoom) => updatedRoom.id === room.id) || room
          )
        );
        // console.log("Status updated successfully: ", data);
      }
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  // FIXME: seperate file
  React.useEffect(() => {
    const interval = setInterval(() => {
      updateRoomStatus();
      console.log("UPDATED");
    }, 2000);
    return () => clearInterval(interval);
  }, [bookedRooms]);

  // FIXME: seperate file
  React.useEffect(() => {
    const deleteDoneRooms = async () => {
      const doneRooms = bookedRooms.filter((room) => room.status === "done");
      try {
        if (doneRooms.length > 0) {
          await useDeleteBookedRooms();
          setBookedRooms((prevRooms) =>
            prevRooms.filter((room) => room.status !== "done")
          );
        }
      } catch (e) {
        console.error("Error deleting done rooms: ", e);
      }
    };
    deleteDoneRooms();
  }, [bookedRooms]);

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
