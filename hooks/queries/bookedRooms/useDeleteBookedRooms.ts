import { supabase } from "@/utils/supabase";
import React from "react";

export const useDeleteBookedRooms = async () => {
    const { error } = await supabase
        .from("booked_rooms")
        .delete()
        .eq("status", "done");

    if (error) throw error;
};
