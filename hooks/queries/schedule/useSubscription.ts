import { supabase } from "@/utils/supabase";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

const useSubscriptionSchedule = () => {
    const queryClient = useQueryClient();

    React.useEffect(() => {
        const channels = supabase.channel("custom-all-channel")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "schedule",
                },
                (payload) => {
                    console.log("Change received!", payload);
                    queryClient.invalidateQueries({
                        queryKey: ["schedule"],
                    });
                },
            )
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "schedule",
                },
                (payload) => {
                    console.log("Booking updated!", payload);
                    queryClient.invalidateQueries({
                        queryKey: ["schedule"],
                    });
                },
            )
            .on(
                "postgres_changes",
                {
                    event: "DELETE",
                    schema: "public",
                    table: "schedule",
                },
                (payload) => {
                    console.log("Booking deleted!", payload);
                    queryClient.invalidateQueries({
                        queryKey: ["schedule"],
                    });
                },
            ).subscribe();

        return () => {
            channels.unsubscribe();
        };
    }, []);
};

export default useSubscriptionSchedule;
