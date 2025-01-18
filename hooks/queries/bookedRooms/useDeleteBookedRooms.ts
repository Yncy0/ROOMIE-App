import { supabase } from "@/utils/supabase";

export const useDeleteBookedRooms = async () => {
    const { error } = await supabase
        .from("booked_rooms")
        .delete()
        .eq("status", "done");

    if (error) throw error;
};
