import { supabase } from "@/utils/supabase";

export const useUpdateRoomStatus = async (id: any, status: string) => {
    const { data, error } = await supabase
        .from("rooms")
        .update({ status: status })
        .eq("id", id)
        .select();

    if (error) {
        throw error;
    }

    return data;
};
