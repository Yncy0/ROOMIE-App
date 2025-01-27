import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

export const useFetchSubjects = () => {
    return useQuery({
        queryKey: ["subject"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("subject")
                .select("subject_code");

            if (error) {
                console.error(error);
                throw error;
            }

            return data;
        },
    });
};
