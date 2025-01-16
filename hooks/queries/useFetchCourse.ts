import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/utils/supabase";

const useFetchCourse = () => {
    const courseQuery = useQuery({
        queryKey: ["course"],
        queryFn: async () => {
            const { data: course, error } = await supabase
                .from("course")
                .select("*");

            if (error) throw error;

            return course;
        },
    });

    return courseQuery;
};

export default useFetchCourse;
