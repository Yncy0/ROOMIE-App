import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../../utils/supabase";
import dayjs from "dayjs";
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

            if (error) {
                console.error(error);
                throw error;
            }

            if (schedule) console.log(schedule);

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
                .eq("days", dayjs(day).format("dddd"));

            if (error) {
                console.error(error);
                throw error;
            }

            if (scheduleWithDay) console.log(scheduleWithDay);

            return scheduleWithDay;
        },
    });
}

export function useFetchScheduleWithRoom(day: string, room_id: string) {
    return useQuery<Schedule[]>({
        queryKey: ["schedule", day, room_id],
        queryFn: async () => {
            const { data: scheduleWithRoom, error } = await supabase
                .from("schedule")
                .select(
                    `*,
                    course(*),
                    subject(*)
                    `,
                )
                .eq("days", day)
                .eq("room_id", room_id)
                .order("time_in", { ascending: true });

            if (error) {
                console.error(error);
                throw error;
            }

            if (scheduleWithRoom) console.log(scheduleWithRoom);

            return scheduleWithRoom;
        },
        enabled: !!day && !!room_id,
    });
}
