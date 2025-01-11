import { supabase } from "@/utils/supabase";
import 'react-native-get-random-values'
import {v4 as uuidv4} from 'uuid';
import moment from "moment";


export default async function useInsertBookedRooms(
  profile_id: any,
    room_id: any,
    date: string,
    subject_name: string,
    course_and_section: string,
    time_in: string,
    time_out: string,
) {

  const genUuid = uuidv4();
  const timeStamp = moment().format();

  const { data, error } = await supabase
        .from('booked_rooms')
        .insert([
          {
            id: genUuid, 
            created_at: timeStamp, 
            date: date, 
            subject_name: subject_name, 
            course_and_section: course_and_section,
            time_in: time_in,
            time_out: time_out,
            profile_id: profile_id,
            room_id: room_id
          },
        ])
        .select()

        if (error) throw error;

        return data;
}