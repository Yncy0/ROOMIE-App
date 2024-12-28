import React from "react";
import { supabase } from "@/utils/supabase";


type Room = {
    id: any,
    room_name: string,
    room_type: string,
    room_image: string
  }

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
              setData(rooms as Room[]);
            }
          }
          fetchData();
      }, []);

      return { data };
}