import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import BookedCard from "../cards/BookedCard";
import EmptyDisplay from "../EmptyDisplay";
import { useFetchBookedRooms } from "@/hooks/queries/bookedRooms/useFetchBookedRooms";
import { useUpdateBookedRoomStatus } from "@/hooks/queries/bookedRooms/useUpdateBookedRooms";
import { useDeleteBookedRooms } from "@/hooks/queries/bookedRooms/useDeleteBookedRooms";
import useSubscriptionBookedRoom from "@/hooks/queries/bookedRooms/useSubscription";
import BookingSkeletonLoader from "../loader/BookingSkeletonLoader";

type Props = {
  isHorizontal: boolean;
  isLoading: boolean;
  bookedRooms: any;
};

const BookingsList = ({ isHorizontal, bookedRooms, isLoading }: Props) => {
  useSubscriptionBookedRoom();

  useDeleteBookedRooms();

  return (
    <>
      {bookedRooms && bookedRooms.length > 0 ? (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
          data={bookedRooms}
          renderItem={({ item }) =>
            isLoading ? <BookingSkeletonLoader /> : <BookedCard items={item} />
          }
        />
      ) : (
        <EmptyDisplay />
      )}
    </>
  );
};

export default BookingsList;

const styles = StyleSheet.create({
  list: {
    gap: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
