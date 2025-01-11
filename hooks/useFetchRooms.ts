import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";

export default function useFetchRooms() {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select(`*, building(id, building_name)`)
        .order("room_name", { ascending: true });

      if (error) throw error;

      return data;
    },
  });
}
