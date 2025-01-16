import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../utils/supabase";
import moment from "moment";
import { Tables } from "@/database.types";

type Schedule = Tables<"schedule">;

const getId = async () => {
    //GETTING ID
    const { data: { user } } = await supabase.auth.getUser();
    let userId: string = "";

    if (user) {
        userId = user?.id;
    }

    return userId;
};

export function useFetchSchedule() {
    return useQuery<Schedule[]>({
        queryKey: ["schedule"],
        queryFn: async () => {
            const userId = await getId();
            const { data: schedule, error } = await supabase
                .from("schedule")
                .select(
                    `*,
                    course(*),
                    subject(*)
                    `,
                )
                .eq("profile_id", userId);

            if (error) throw error;

            return schedule;
        },
    });
}

export function useFetchScheduleWithDay(day: string) {
    return useQuery<Schedule[]>({
        queryKey: ["schedule", day],
        queryFn: async () => {
            const userId = await getId();
            const { data: scheduleWithDay, error } = await supabase
                .from("schedule")
                .select(
                    `*,
                    course(*),
                    subject(*)
                    `,
                )
                .eq("profile_id", userId)
                .eq("days", moment(day).format("dddd"));

            if (error) throw error;
            return scheduleWithDay;
        },
    });
}
