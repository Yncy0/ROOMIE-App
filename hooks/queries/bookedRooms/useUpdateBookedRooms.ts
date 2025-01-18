import { supabase } from "@/utils/supabase";
import moment from "moment";
import React from "react";

export const useUpdateBookedRoomStatus = async () => {
    const timeNow = moment().format("LT");

    const { data, error } = await supabase
        .from("booked_rooms")
        .update({ status: "done" })
        .lte("time_out", timeNow)
        .select();

    if (error) throw error;

    return data;
};

export const useUpdateBookedRoomStatusR = () => {
    const timeNow = moment().format("LT");

    React.useEffect(() => {
        const queryUpdate = async () => {
            const { data, error } = await supabase
                .from("booked_rooms")
                .update({ status: "done" })
                .lte("time_out", timeNow)
                .select();

            if (error) throw error;

            return data;
        };

        queryUpdate();

        const channels = supabase.channel("custom-update-channel")
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "booked_rooms",
                    filter: `time_out=lte.${timeNow}`,
                },
                (payload) => {
                    console.log("Change received!", payload);
                    queryUpdate();
                },
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channels);
        };
    }, []);
};
