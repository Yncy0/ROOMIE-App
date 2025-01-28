import { supabase } from "@/utils/supabase";
import dayjs from "dayjs";

const timeNow = dayjs().format("HH:mm:ss");
const today = dayjs().format("dddd");

console.log(today);

export const useUpdateScheduleDone = async () => {
    const { data, error } = await supabase
        .from("schedule")
        .update({ status: "DONE" })
        .eq("days", today)
        .lte("time_out", timeNow);

    if (error) {
        console.error(error);
        throw error;
    }

    return data;
};

export const useUpdateScheduleOngoing = async () => {
    const { data, error } = await supabase
        .from("schedule")
        .update({ status: "ONGOING" })
        .eq("days", today)
        .gte("time_out", timeNow);

    if (error) {
        console.error(error);
        throw error;
    }

    return data;
};
