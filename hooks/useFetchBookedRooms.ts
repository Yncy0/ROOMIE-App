import { supabase } from "@/utils/supabase";
import React from "react";



export default function useFetchBookedRooms() {
    const [bookedRooms, setBookedRooms] = React.useState();

    React.useEffect(() => {
        const fetchData = async () => {
            
        }
        fetchData();
    }, []);

    return bookedRooms;
}