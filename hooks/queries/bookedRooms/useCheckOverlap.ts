import { supabase } from "@/utils/supabase";
import dayjs from "dayjs";

const useCheckForOverlap = async (
    roomId: string,
    date: string,
    timeIn: string,
    timeOut: string,
) => {
    const today = dayjs().format("dddd");

    const { data: bookedRooms, error: bookedRoomsError } = await supabase
        .from("booked_rooms")
        .select("*")
        .eq(
            "room_id",
            roomId,
        )
        .eq("date", date)
        .filter("time_in", "lte", timeOut)
        .filter("time_out", "gte", timeIn);

    const { data: schedule, error: scheduleError } = await supabase
        .from("schedule")
        .select("*")
        .eq("room_id", roomId)
        .eq("days", today)
        .eq("status", "ONGOING");

    console.log("Schedule Data:", schedule);

    if (bookedRoomsError || scheduleError) {
        console.error(bookedRoomsError);
        console.error(scheduleError);
        throw new Error(bookedRoomsError?.message || scheduleError?.message);
    }

    // const isBooked = bookedRooms.some((room) => room.status === "ONGOING");
    // const isScheduled = schedule.some((sched) => sched.status === "ONGOING");

    return {
        bookedRooms: bookedRooms.length === 0,
        schedule: schedule.length == 0,
    };
};

export default useCheckForOverlap;
