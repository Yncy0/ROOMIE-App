import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const getId = async () => {
    //GETTING ID
    const { data: { user } } = await supabase.auth.getUser();
    let userId: string = "";

    if (user) {
        userId = user?.id;
    }

    return userId;
};

export const useFetchNotification = () => {
    return useQuery({
        queryKey: ["notifications"],
        queryFn: async () => {
            const userId = await getId();
            const { data, error } = await supabase
                .from("notifications")
                .select("*")
                .eq("user_id", userId)
                .order("created_at", { ascending: false });

            if (error) throw error;

            return data;
        },
    });
};
