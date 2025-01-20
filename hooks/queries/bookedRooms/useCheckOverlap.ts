import { supabase } from "@/utils/supabase";
import moment from "moment";

const useCheckForOverlap = async (
    roomId: string,
    date: string,
    timeIn: string,
    timeOut: string,
) => {
    const today = moment().format("dddd");

    const { data: bookedRooms, error: bookedRoomsError } = await supabase
        .from("booked_rooms")
        .select("*")
        .eq(
            "room_id",
            roomId,
        )
        .eq("date", date)
        .or(`time_in.lte.${timeOut},time_out.gte.${timeIn}`);

    const { data: schedule, error: scheduleError } = await supabase
        .from("schedule")
        .select("*")
        .eq("room_id", roomId)
        .eq("days", today)
        .eq("status", "ongoing");

    console.log("Schedule Data:", schedule);
    console.log("Today", today);

    if (bookedRoomsError || scheduleError) {
        throw new Error(bookedRoomsError?.message || scheduleError?.message);
    }

    return {
        bookedRooms: bookedRooms.length === 0,
        schedule: schedule.length === 0,
    };
};

export default useCheckForOverlap;
