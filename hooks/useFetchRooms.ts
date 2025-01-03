import React from "react";
import { supabase } from "@/utils/supabase";
import { Tables } from "@/database.types";



type Room = Tables<'rooms'>

export default function useFetchRooms() {
    const [data, setData] = React.useState<Room[]>([]);
    
      React.useEffect(() => {
          const fetchData = async () => {
            let {data: rooms, error} = await supabase
              .from('rooms')
              .select(`*`)
              .order('room_name', {ascending: true});
    
            if (error) {
              console.log('Data are not fetched', error);
            }
    
            if (rooms) {
              setData(rooms);
            }
          }
          fetchData();
      }, []);

      return { data };
}