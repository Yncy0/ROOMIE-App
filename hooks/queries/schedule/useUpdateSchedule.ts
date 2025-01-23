import { supabase } from "@/utils/supabase";
import moment from "moment";

const timeNow = moment().format("HH:mm:ss");
const today = moment().format("dddd");

export const useUpdateScheduleDone = async () => {
    const { data, error } = await supabase
        .from("schedule")
        .update({ status: "done" })
        .eq("days", today)
        .lte("time_out", timeNow);

    if (error) throw error;

    return data;
};

export const useUpdateScheduleOngoing = async () => {
    const { data, error } = await supabase
        .from("schedule")
        .update({ status: "ongoing" })
        .eq("days", today)
        .lte("time_out", timeNow)
        .gte("time_in", timeNow);

    if (error) throw error;

    return data;
};
