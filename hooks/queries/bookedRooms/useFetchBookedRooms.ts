import React from "react";
import { Tables } from "@/database.types";
import { supabase } from "@/utils/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type BookedRooms = Tables<"booked_rooms">;
type SetBookedRooms = React.Dispatch<React.SetStateAction<BookedRooms[]>>;

export function useFetchBookedRooms() {
    const bookedRoomsQuery = useQuery<BookedRooms[]>({
        queryKey: ["booked_rooms"],
        queryFn: async () => {
            const { data: bookedRooms, error } = await supabase
                .from("booked_rooms")
                .select(`*, rooms(*)`);

            if (error) throw error;

            return bookedRooms;
        },
    });

    return bookedRoomsQuery;
}

export function useFetchBookedRoomsWithRooms(id: string) {
    const bookedRoomsQuery = useQuery<BookedRooms[]>({
        queryKey: ["booked_rooms", id],
        queryFn: async () => {
            const { data: bookedRooms, error } = await supabase
                .from("booked_rooms")
                .select(`*, rooms(*)`)
                .eq("room_id", id);

            if (error) throw error;

            return bookedRooms;
        },
    });

    return bookedRoomsQuery;
}

export const useBookedRoomSubscription = () => {
    const queryClient = useQueryClient();

    React.useEffect(() => {
        const channels = supabase.channel("custom-insert-channel")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "booked_rooms",
                },
                (payload) => {
                    console.log("Change received!", payload);
                    queryClient.invalidateQueries({
                        queryKey: ["booked_rooms"],
                    });
                },
            )
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "booked_rooms",
                },
                (payload) => {
                    console.log("Booking updated!", payload);
                    queryClient.invalidateQueries({
                        queryKey: ["booked_rooms"],
                    });
                },
            )
            .on(
                "postgres_changes",
                {
                    event: "DELETE",
                    schema: "public",
                    table: "booked_rooms",
                },
                (payload) => {
                    console.log("Booking deleted!", payload);
                    queryClient.invalidateQueries({
                        queryKey: ["booked_rooms"],
                    });
                },
            ).subscribe();

        return () => {
            channels.unsubscribe();
        };
    }, []);
};
