import { Tables } from "@/database.types";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

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
