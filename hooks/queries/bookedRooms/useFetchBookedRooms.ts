import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Tables } from "@/database.types";
import { supabase } from "@/utils/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { getId } from "@/utils/getId";

type BookedRooms = Tables<"booked_rooms">;

export function useFetchBookedRooms() {
    const bookedRoomsQuery = useQuery<BookedRooms[]>({
        queryKey: ["booked_rooms"],
        queryFn: async () => {
            const { data: bookedRooms, error } = await supabase
                .from("booked_rooms")
                .select(`*, rooms(*)`);

            if (error) {
                console.error(error);
                throw error;
            }

            if (bookedRooms) console.log(bookedRooms);

            return bookedRooms;
        },
    });

    return bookedRoomsQuery;
}

export function useFetchBookedRoomSingle() {
    const bookedRoomsQuery = useQuery({
        queryKey: ["booked_rooms"],
        queryFn: async () => {
            const { data: bookedRooms, error } = await supabase
                .from("booked_rooms")
                .select(`*, rooms(*)`)
                .single();

            if (error) {
                console.error(error);
                throw error;
            }

            if (bookedRooms) console.log(bookedRooms);

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

            if (error) {
                console.error(error);
                throw error;
            }

            if (bookedRooms) console.log(bookedRooms);

            return bookedRooms;
        },
    });

    return bookedRoomsQuery;
}

export function useFetchBookedRoomsWithId(id: string) {
    const bookedRoomsQuery = useQuery({
        queryKey: ["booked_rooms", id],
        queryFn: async () => {
            const { data: bookedRooms, error } = await supabase
                .from("booked_rooms")
                .select(`*, rooms(*)`)
                .eq("id", id)
                .single();

            if (error) {
                console.error(error);
                throw error;
            }

            if (bookedRooms) console.log(bookedRooms);

            return bookedRooms;
        },
    });

    return bookedRoomsQuery;
}

export function useFetchBookedRoomsWithUser(id: string) {
    return useQuery(
        {
            queryKey: ["booked_rooms", id],
            queryFn: async () => {
                const { data, error } = await supabase
                    .from("booked_rooms")
                    .select("*")
                    .eq("profile_id", id);

                if (error) {
                    console.error(error);
                    throw error;
                }
                console.log("Fetched data:", data);

                return data;
            },
        },
    );
}
