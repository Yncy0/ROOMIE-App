import { supabase } from "@/utils/supabase";
import React from "react";

export const useDeleteBookedRooms = async () => {
    const { error } = await supabase
        .from("booked_rooms")
        .delete()
        .eq("status", "done");

    if (error) throw error;
};

export const useDeleteBookedRoomsR = () => {
    React.useEffect(() => {
        const queryDelete = async () => {
            const { error } = await supabase
                .from("booked_rooms")
                .delete()
                .eq("status", "done");

            if (error) throw error;
        };

        queryDelete();

        const channels = supabase.channel("custom-delete-channel")
            .on(
                "postgres_changes",
                {
                    event: "DELETE",
                    schema: "public",
                    table: "booked_rooms",
                    filter: "status=eq.'done'",
                },
                (payload) => {
                    console.log("Change received!", payload);
                    queryDelete();
                },
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channels);
        };
    }, []);
};
