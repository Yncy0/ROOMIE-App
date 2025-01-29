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
                    event: "*",
                    schema: "public",
                    table: "notification",
                },
                (payload) => {
                    console.log("Change received!", payload);
                    queryClient.invalidateQueries({
                        queryKey: ["notification"],
                    });
                },
            )
            .subscribe();

        return () => {
            channels.unsubscribe();
        };
    }, []);
};
