import { Tables } from "@/database.types";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

type BookedRooms = Tables<"booked_rooms">;

export default function useFetchBookedRooms() {
    const bookedRoomsQuery = useQuery<BookedRooms[]>({
        queryKey: ["booked_rooms"],
        queryFn: async () => {
            const { data: bookedRooms, error } = await supabase
                .from("booked_rooms")
                .select("*");

            if (error) throw error;

            return bookedRooms;
        },
    });

    return bookedRoomsQuery;
}
