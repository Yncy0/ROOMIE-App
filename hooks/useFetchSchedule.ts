import { useQuery } from "@tanstack/react-query";

import { supabase } from "../utils/supabase";

export default function useFetchSchedule() {
    return useQuery({
        queryKey: ["schedule"],
        queryFn: async () => {
            const { data: { user } } = await supabase.auth.getUser();
            let userId: string = "";

            if (user) {
                userId = user?.id;
            }

            const { data, error } = await supabase
                .from("schedule")
                .select(
                    `*,
                    course(*),
                    subject(*)
                    `,
                )
                .eq("profile_id", userId);

            if (error) throw error;

            return data;
        },
    });
}
