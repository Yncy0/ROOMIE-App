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
