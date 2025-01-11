import { supabase } from "@/utils/supabase";
import "react-native-get-random-values";

export default async function useInsertBookedRooms(
  profile_id: any,
  room_id: any,
  date: string,
  subject_name: string,
  course_and_section: string,
  time_in: string,
  time_out: string,
) {
  const { data, error } = await supabase
    .from("booked_rooms")
    .insert([
      {
        date: date,
        subject_name: subject_name,
        course_and_section: course_and_section,
        profile_id: profile_id,
        room_id: room_id,
        time_in: time_in,
        time_out: time_out,
      },
    ])
    .select();

  if (error) throw error;

  return data;
}
