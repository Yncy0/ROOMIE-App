import { supabase } from "@/utils/supabase";
import moment from "moment";

export const useUpdateBookedRoomStatus = async () => {
    const timeNow = moment().format("LT");

    const { data, error } = await supabase
        .from("booked_rooms")
        .update({ status: "done" })
        .lt("time_out", timeNow)
        .select();

    if (error) throw error;

    console.log(timeNow);

    return data;
};
