import { supabase } from "@/utils/supabase";
import React from "react";

let _status: string = "On going";

export const useDeleteBookedRooms = async () => {
    //TODO: convert later to TanStack Query

    const { error } = await supabase
        .from("booked_rooms")
        .delete()
        .eq("status", _status);

    console.log(_status);

    if (error) throw error;
};

export const setBookedRoomsStatus = (status: string) => {
    return _status = status;
};
