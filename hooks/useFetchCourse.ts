import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/utils/supabase";

const useFetchCourse = () => {
    return useQuery({
        queryKey: ["course"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("course")
                .select("*");

            if (error) throw error;

            return data;
        },
    });
};

export default useFetchCourse;
