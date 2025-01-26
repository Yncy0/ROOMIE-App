import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/utils/supabase";

const useFetchCourse = () => {
    const courseQuery = useQuery({
        queryKey: ["course"],
        queryFn: async () => {
            const { data: course, error } = await supabase
                .from("course")
                .select("*");

            if (error) {
                console.error(error);
                throw error;
            }

            if (course) console.log(course);

            return course;
        },
    });

    return courseQuery;
};

export default useFetchCourse;
