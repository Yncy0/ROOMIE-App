import { supabase } from "@/utils/supabase";
import React from "react";

export const useDeleteBookedRooms = async () => {
    const { error, status } = await supabase
        .from("booked_rooms")
        .delete()
        .eq("status", "DONE");

    if (error) {
        console.error(error);
        throw error;
    }

    if (status) {
        console.log(status);
    }
};
