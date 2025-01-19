import { supabase } from "@/utils/supabase";

const useCheckForOverlap = async (
    roomId: string,
    date: string,
    timeIn: string,
    timeOut: string,
) => {
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
        .eq("room_id", roomId).eq("date", date)
        .or(`start_time.lte.${timeOut},end_time.gte.${timeIn}`);

    if (bookedRoomsError || scheduleError) {
        throw new Error(bookedRoomsError?.message || scheduleError?.message);
    }

    return {
        bookedRooms: bookedRooms.length === 0,
        schedule: schedule.length === 0,
    };
};

export default useCheckForOverlap;
