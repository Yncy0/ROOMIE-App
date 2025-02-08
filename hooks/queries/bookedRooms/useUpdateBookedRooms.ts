import { supabase } from "@/utils/supabase";
import dayjs from "dayjs";

//TODO: add an update of INCOMING to ON GOING based on the time

export async function useUpdateBookedRooms(
    booking_id: any, // Add the booking ID parameter to identify which booking to edit
    profile_id: any,
    room_id: any,
    date: string,
    subject_code: string,
    course_and_section: string,
    time_in: string,
    time_out: string,
    status: string,
) {
    const { data: booked_rooms, error } = await supabase
        .from("booked_rooms")
        .update({
            date: date,
            subject_code: subject_code,
            course_and_section: course_and_section,
            profile_id: profile_id,
            room_id: room_id,
            time_in: time_in,
            time_out: time_out,
            status: status,
        })
        .eq("id", booking_id) // Ensure you specify the booking ID to update the correct record
        .select()
        .single();

    if (error) {
        console.error(error);
        throw error;
    }

    return booked_rooms;
}

export const useUpdateBookedRoomStatus = async () => {
    const timeNow = dayjs().format("YYYY-MM-DD HH:mm:ssZ");
    const today = dayjs().format("DD MMMM YYYY");

    const { data, error } = await supabase
        .from("booked_rooms")
        .update({ status: "DONE" })
        .eq("status", "ON GOING")
        .eq("date", today)
        .lte("time_out", timeNow)
        .select();

    if (error) throw error;

    return data;
};

export const useUpdateBookedRoomPending = async (booking_id: any) => {
    const { data, error } = await supabase
        .from("booked_rooms")
        .update({ status: "PENDING" })
        .eq("id", booking_id)
        .select();

    if (error) throw error;

    return data;
};

export const useUpdateBookedRoomCancelReq = async (booking_id: any) => {
    const { data, error } = await supabase
        .from("booked_rooms")
        .update({ status: "PENDING CANCELLATION" })
        .eq("id", booking_id)
        .select();

    if (error) throw error;

    return data;
};
