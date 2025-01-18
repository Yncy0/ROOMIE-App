import React from "react";
import { FlatList } from "react-native";

import BookedCard from "../cards/BookedCard";
import EmptyDisplay from "../EmptyDisplay";
import {
  useBookedRoomsSubscription,
  useFetchBookedRooms,
} from "@/hooks/queries/bookedRooms/useFetchBookedRooms";
import { Tables } from "@/database.types";

type BookedRooms = Tables<"booked_rooms">;

const BookingsList = () => {
  const { data: initBookedRooms, isLoading, error } = useFetchBookedRooms();
  const [bookedRooms, setBookedRooms] = React.useState<BookedRooms[]>([]);

  React.useEffect(() => {
    if (initBookedRooms) {
      setBookedRooms(initBookedRooms);
    }
  }, [initBookedRooms]);
  useBookedRoomsSubscription(setBookedRooms);

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
