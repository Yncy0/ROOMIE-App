import { supabase } from "@/utils/supabase";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

export const subscriptionRooms = () => {
    const queryClient = useQueryClient();

    React.useEffect(() => {
        const channels = supabase.channel("custom-all-channel")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "rooms",
                },
                (payload) => {
                    console.log("Change received!", payload);
                    queryClient.invalidateQueries({
                        queryKey: ["rooms"],
                    });
                },
            )
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "rooms",
                },
                (payload) => {
                    console.log("Change received!", payload);
                    queryClient.invalidateQueries({
                        queryKey: ["rooms"],
                    });
                },
            )
            .on(
                "postgres_changes",
                {
                    event: "DELETE",
                    schema: "public",
                    table: "rooms",
                },
                (payload) => {
                    console.log("Change received!", payload);
                    queryClient.invalidateQueries({
                        queryKey: ["rooms"],
                    });
                },
            )
            .subscribe();

        return () => {
            channels.unsubscribe();
        };
    }, []);
};
