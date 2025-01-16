import { useQuery } from "@tanstack/react-query";

import { supabase } from "../utils/supabase";
import moment from "moment";
import { Tables } from "@/database.types";

type Schedule = Tables<"schedule">;

export default function useFetchSchedule() {
    const getId = async () => {
        //GETTING ID
        const { data: { user } } = await supabase.auth.getUser();
        let userId: string = "";

        if (user) {
            userId = user?.id;
        }

        return userId;
    };

    const scheduleWithDateQuery = useQuery<Schedule[]>({
        queryKey: ["schedule"],
        queryFn: async () => {
            const { data: scheduleWithDay, error: scheduleError } =
                await supabase
                    .from("schedule")
                    .select(
                        `*,
                    course(*),
                    subject(*)
                    `,
                    )
                    .eq("profile_id", getId())
                    .eq("days", moment().format("dddd"));

            if (scheduleError) throw scheduleError;

            return scheduleWithDay;
        },
    });

    return { scheduleWithDateQuery };
}
