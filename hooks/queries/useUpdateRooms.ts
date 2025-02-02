import { supabase } from "@/utils/supabase";

type RoomStatus = "OCCUPIED" | "AVAILABLE" | "IN REPAIR";

export const useUpdateRoomStatus = async (
    roomId: string[],
    status: RoomStatus,
) => {
    const { data, error } = await supabase
        .from("rooms")
        .update({ status: status })
        .in("id", roomId)
        .select();

    if (error) {
        throw error;
    }

    console.log("IS UPDATING");

    return data;
};
