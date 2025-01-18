import React from "react";
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

export function useFetchBookedRoomsR() {
    const [bookedRooms, setBookedRooms] = React.useState<BookedRooms[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        // Fetch initial data
        const fetchBookedRooms = async () => {
            try {
                const { data, error } = await supabase
                    .from("booked_rooms")
                    .select(`*, rooms(*)`);

                if (error) throw error;

                setBookedRooms(data || []);
                setLoading(false);
            } catch (err) {
                setError("Error fetching booked rooms");
                setLoading(false);
            }
        };

        fetchBookedRooms();

        // Set up the real-time subscription
        const channel = supabase.channel("custom-all-channel")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "booked_rooms" },
                (payload) => {
                    console.log("Change received!", payload);
                },
            )
            .subscribe();

        // Cleanup subscription on component unmount
        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return { bookedRooms, loading, error };
}
