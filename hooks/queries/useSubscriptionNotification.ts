import { supabase } from "@/utils/supabase";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

export const subscriptionNotification = () => {
    const queryClient = useQueryClient();

    React.useEffect(() => {
        const channels = supabase.channel("custom-all-channel")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "notifications",
                },
                (payload) => {
                    console.log("Change received!", payload);
                    queryClient.invalidateQueries({
                        queryKey: ["notifications"],
                    });
                },
            )
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "notifications",
                },
                (payload) => {
                    console.log("Change received!", payload);
                    queryClient.invalidateQueries({
                        queryKey: ["notifications"],
                    });
                },
            )
            .on(
                "postgres_changes",
                {
                    event: "DELETE",
                    schema: "public",
                    table: "notifications",
                },
                (payload) => {
                    console.log("Change received!", payload);
                    queryClient.invalidateQueries({
                        queryKey: ["notifications"],
                    });
                },
            )
            .subscribe();

        return () => {
            channels.unsubscribe();
        };
    }, []);
};
