import { supabase } from "@/utils/supabase";

export default async function useInsertBookedRooms(
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
    .insert([
      {
        date: date,
        subject_code: subject_code,
        course_and_section: course_and_section,
        profile_id: profile_id,
        room_id: room_id,
        time_in: time_in,
        time_out: time_out,
        status: status,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return booked_rooms;
}
