import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function useFetchBookedRooms() {
    const [id, setId] = React.useState<string | undefined>(undefined);

    const bookedRoomsQuery = useQuery({
        queryKey: ["booked_rooms"],
        queryFn: async () => {
            const { data: booked_rooms, error } = await supabase
                .from("booked_rooms")
                .select(
                    "id",
                ).single();

            if (error) throw error;

            if (booked_rooms) {
                setId(booked_rooms.id as string);
            }

            return { booked_rooms, id };
        },
    });

    return bookedRoomsQuery;
}
