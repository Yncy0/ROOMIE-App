import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

export const useFetchNotification = () => {
    return useQuery({
        queryKey: ["notifications"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("notifications")
                .select("*");

            if (error) throw error;

            return data;
        },
    });
};
