import React from "react";
import { supabase } from "../utils/supabase";
import { useAuth } from "../context/AuthProvider";
import { QueryData } from "@supabase/supabase-js";
import { Tables } from "@/database.types";


type Schedule = Tables<'schedule'>


export default function useFetchSchedule() {
    const [data, setData] = React.useState<Schedule[]>([]);

    // const { session } = useAuth(); 

    React.useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            let scheduleWithQuery = supabase
                .from('schedule')
                .select(`*, course(*)`)
                .eq('profile_id', user?.id);
            
            // type ScheduleWithQuery = QueryData<typeof scheduleWithQuery>;
                
            const { data, error } = await scheduleWithQuery;
            if (error) console.log('Data are not fetched', error);
            // const schedule: ScheduleWithQuery = data;
        
            if (data) {
                setData(data);
            }
        }

        fetchData();
    },[]);

    return {data}
}