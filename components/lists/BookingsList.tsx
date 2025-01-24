import React from "react";
import { FlatList } from "react-native";

import BookedCard from "../cards/BookedCard";
import EmptyDisplay from "../EmptyDisplay";
import { useFetchBookedRooms } from "@/hooks/queries/bookedRooms/useFetchBookedRooms";
import { useUpdateBookedRoomStatus } from "@/hooks/queries/bookedRooms/useUpdateBookedRooms";
import { useDeleteBookedRooms } from "@/hooks/queries/bookedRooms/useDeleteBookedRooms";
import useSubscriptionBookedRoom from "@/hooks/queries/bookedRooms/useSubscription";

type Props = {
  isHorizontal: boolean;
  bookedRooms: any;
};

const BookingsList = ({ isHorizontal, bookedRooms }: Props) => {
  useSubscriptionBookedRoom();

  React.useEffect(() => {
    const interval = setInterval(() => {
      useUpdateBookedRoomStatus();
      console.log("UPDATED BOOKED ROOMS");
    }, 60000);
    return () => clearInterval(interval);
  }, [bookedRooms]);

  useDeleteBookedRooms();

  return (
    <>
      {bookedRooms && bookedRooms.length > 0 ? (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          horizontal={isHorizontal}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
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
