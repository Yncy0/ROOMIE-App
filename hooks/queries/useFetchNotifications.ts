import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

export const useFetchNotification = () => {
    return useQuery({
        queryKey: ["notifications"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("notifications")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;

            return data;
        },
    });
};
