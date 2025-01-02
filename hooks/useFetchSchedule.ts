import React from "react";
import { supabase } from "../utils/supabase";
import { QueryData } from "@supabase/supabase-js";
import { Tables } from "@/database.types";


type Schedule = Tables<'schedule'>
type ScheduleWithForeign = Schedule & {
    course: Tables<'course'> | null,
    subject: Tables<'subject'> | null,

}


export default function useFetchSchedule() {
    const [data, setData] = React.useState<ScheduleWithForeign[]>([]);
    

    React.useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            let userId = ''
            
            if (user) {
               userId = user?.id;
            }

            let scheduleWithQuery = supabase
                .from('schedule')
                .select(
                    `*, 
                    course(*), 
                    subject(*)
                    `
                )
                //USE THIS FOR TESTING PURPOSES: 'e461e38c-fd34-42ec-8fae-31c741af6707'
                .eq('profile_id', userId);
            
            type ScheduleWithQuery = QueryData<typeof scheduleWithQuery>;
                
            const { data, error } = await scheduleWithQuery;
            if (error) throw error;
            const schedule: ScheduleWithQuery = data;
            
            if (data) {
                setData(schedule);
                console.log(schedule)
            }
        }

        fetchData();
    },[]);

    return { data };
}