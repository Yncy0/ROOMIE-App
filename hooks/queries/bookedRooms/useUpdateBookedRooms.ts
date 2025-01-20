import { supabase } from "@/utils/supabase";
import moment from "moment";

export const useUpdateBookedRoomStatus = async () => {
    const timeNow = moment().format("YYYY-MM-DD HH:mm:ssZ");

    const { data, error } = await supabase
        .from("booked_rooms")
        .update({ status: "done" })
        .lte("time_out", timeNow)
        .select();

    if (error) throw error;

    return data;
};
