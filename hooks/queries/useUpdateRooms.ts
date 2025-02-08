import { supabase } from "@/utils/supabase";

type RoomStatus = "OCCUPIED" | "AVAILABLE" | "UNDER MAINTENANCE";

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

    return data;
};

export const useUpdateRoomStatusRepair = async (
    roomId: string,
    status: RoomStatus,
) => {
    const { data, error } = await supabase
        .from("rooms")
        .update({ status: status })
        .eq("id", roomId)
        .select();

    if (error) {
        throw error;
    }

    return data;
};
