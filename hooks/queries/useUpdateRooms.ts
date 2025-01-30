import { supabase } from "@/utils/supabase";

export const useUpdateRoomStatusVacant = async (id: any) => {
    const { data, error } = await supabase
        .from("rooms")
        .update({ status: "VACANT" })
        .eq("id", id)
        .select();

    if (error) throw error;

    console.log(data);

    return data;
};

export const useUpdateRoomStatusOccupied = async (id: any) => {
    const { data, error } = await supabase
        .from("rooms")
        .update({ status: "OCCUPIED" })
        .eq("id", id)
        .select();

    if (error) throw error;

    console.log("Room status updated to OCCUPIED:", data);

    return data;
};
