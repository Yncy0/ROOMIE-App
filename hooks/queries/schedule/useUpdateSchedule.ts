import { supabase } from "@/utils/supabase";
import { getNextWeekdayDate } from "@/utils/weekdayUtils";
import dayjs from "dayjs";

const timeNow = dayjs().format("HH:mm:ssZ");
const today = dayjs().format("dddd");

export const useUpdateScheduleDone = async () => {
    const { data, error } = await supabase
        .from("schedule")
        .update({ status: "DONE" })
        .eq("days", today)
        .eq("status", "ON GOING")
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
        .update({ status: "ON GOING" })
        .eq("days", today)
        .gte("time_out", timeNow)
        .lte("time_in", timeNow);

    if (error) {
        console.error(error);
        throw error;
    }

    return data;
};

export const useUpdateSchedulePendingClass = async () => {
    const { data, error } = await supabase
        .from("schedule")
        .update({ status: "PENDING CLASS" })
        .eq("days", today)
        .gte("time_out", timeNow);

    if (error) {
        console.error(error);
        throw error;
    }

    return data;
};

export const updateScheduleDate = async (
    scheduleId: string,
    weekday: string,
) => {
    try {
        // Calculate the next date for the assigned weekday
        const nextDate = getNextWeekdayDate(weekday);

        // Update the schedule in Supabase
        const { data, error } = await supabase
            .from("schedule")
            .update({ date: nextDate })
            .eq("id", scheduleId)
            .select();

        if (error) {
            console.error(
                `Error updating schedule date for ID ${scheduleId}:`,
                error,
            );
            throw error;
        }

        console.log(`Schedule date updated to ${nextDate}:`, data);
        return data;
    } catch (error) {
        console.error("Error in updateScheduleDate:", error);
        throw error;
    }
};
