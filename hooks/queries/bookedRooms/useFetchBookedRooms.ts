import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Tables } from "@/database.types";
import { supabase } from "@/utils/supabase";
import { useAuth } from "@/providers/AuthProvider";

type BookedRooms = Tables<"booked_rooms">;

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

export function useFetchBookedRoomSingle() {
    const bookedRoomsQuery = useQuery({
        queryKey: ["booked_rooms"],
        queryFn: async () => {
            const { data: bookedRooms, error } = await supabase
                .from("booked_rooms")
                .select(`*, rooms(*)`)
                .single();

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

export function useFetchBookedRoomsWithUser() {
    const { session } = useAuth();

    return useQuery(
        {
            queryKey: ["booked_rooms"],
            queryFn: async () => {
                if (!session?.user) throw new Error("No user in this session!");
                const { data, error } = await supabase
                    .from("booked_rooms")
                    .select("*")
                    .eq("profile_id", session?.user.id);

                if (error) throw error;

                return data;
            },
        },
    );
}
