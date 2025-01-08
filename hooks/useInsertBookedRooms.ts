import React from "react";
import { Tables } from "@/database.types";
import { supabase } from "@/utils/supabase";

type Props = {
    profile_id: any,
    room_id: any,
    date: any,
    subject_name: string,
    course_and_section: string,
    time_in: any,
    time_out: any,
}

export default function useInsertBookedRooms() {
  React.useEffect(() => {
    const insertData = async () => {
        const { data, error } = await supabase
        .from('booked_rooms')
        .insert([])
        .select()
    }
    insertData()
  }, []);
}