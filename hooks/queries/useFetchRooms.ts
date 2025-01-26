import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";

export default function useFetchRooms() {
  const roomsQuery = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const { data: rooms, error } = await supabase
        .from("rooms")
        .select(`*, building(id, building_name)`)
        .order("room_name", { ascending: true });

      if (error) {
        console.error(error);
        throw error;
      }

      if (rooms) console.log(rooms);

      return rooms;
    },
  });

  return roomsQuery;
}
