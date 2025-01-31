import { supabase } from "@/utils/supabase";

export const useUpdateRoomStatusVacant = async (id: any) => {
    console.log("Updating room status to VACANT for ID:", id);
    const { data, error } = await supabase
        .from("rooms")
        .update({ status: "VACANT" })
        .eq("id", id)
        .select();

    if (error) {
        console.error("Error updating room status to VACANT:", error);
        throw error;
    }

    console.log("Room status updated to VACANT:", data);
    return data;
};

export const useUpdateRoomStatusOccupied = async (id: any) => {
    console.log("Updating room status to OCCUPIED for ID:", id);
    const { data, error } = await supabase
        .from("rooms")
        .update({ status: "OCCUPIED" })
        .eq("id", id)
        .select();

    if (error) {
        console.error("Error updating room status to OCCUPIED:", error);
        throw error;
    }

    console.log("Room status updated to OCCUPIED:", data);
    return data;
};

export const useUpdateRoomStatus = async (id: any, status: string) => {
    const { data, error } = await supabase
        .from("rooms")
        .update({ status: status })
        .eq("id", id)
        .select();

    if (error) {
        console.error(`Error updating room status to ${status}`, error);
        throw error;
    }

    console.log(`Rooms updating room status to ${status}`, data);
    return data;
};
