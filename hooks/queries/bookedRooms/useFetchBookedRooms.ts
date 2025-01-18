import React from "react";
import { Tables } from "@/database.types";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

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

export const useBookedRoomsSubscription = (setBookedRooms: SetBookedRooms) => {
    React.useEffect(() => {
        const channels = supabase.channel("custom-insert-channel")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "booked_rooms" },
                (payload) => {
                    console.log("Change received!", payload);
                    setBookedRooms((prevRooms: any) => {
                        return [...prevRooms, payload.new];
                    });
                },
            ).on("postgres_changes", {
                event: "UPDATE",
                schema: "public",
                table: "booked_rooms",
            }, (payload) => {
                console.log("Booking updated!", payload);
                setBookedRooms((prevRooms: any) =>
                    prevRooms.map((room: any) =>
                        room.id === payload.new.id ? payload.new : room
                    )
                );
            }).on("postgres_changes", {
                event: "DELETE",
                schema: "public",
                table: "booked_rooms",
            }, (payload) => {
                console.log("Booking deleted!", payload);
                setBookedRooms((prevRooms) =>
                    prevRooms.filter((room) => room.id !== payload.old.id)
                );
            }).subscribe();

        return () => {
            channels.unsubscribe();
        };
    }, [setBookedRooms]);
};
